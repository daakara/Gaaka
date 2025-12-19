# Create URL Cluster Lookup Table
# Run this in your notebook BEFORE running the aggregation pipeline

from pyspark.sql import SparkSession
from pyspark.sql.functions import col, when, lit, regexp_extract, lower, trim, collect_set, concat_ws

print("🔧 Creating url_cluster_lookup table...")

# Get or create spark session
try:
    spark
except NameError:
    spark = SparkSession.builder.getOrCreate()

# Extract unique URLs from the base table with basic categorization
url_cluster_df = spark.sql("""
    SELECT DISTINCT
        url,
        -- Basic URL clustering logic (you can enhance this)
        CASE
            WHEN url LIKE '%/tracking%' THEN 'Tracking'
            WHEN url LIKE '%/express%' THEN 'Express Services'
            WHEN url LIKE '%/supply-chain%' THEN 'Supply Chain'
            WHEN url LIKE '%/logistics%' THEN 'Logistics'
            WHEN url LIKE '%/careers%' THEN 'Careers'
            WHEN url LIKE '%/about%' THEN 'About DHL'
            WHEN url LIKE '%/discover%' THEN 'Discover'
            WHEN url LIKE '%/contact%' THEN 'Contact'
            ELSE 'Other'
        END AS url_cluster,

        -- Sub-cluster categorization (you can enhance this)
        CASE
            WHEN url LIKE '%/tracking%' THEN 'Shipment Tracking'
            WHEN url LIKE '%/express/shipping%' THEN 'Shipping Services'
            WHEN url LIKE '%/express/quote%' THEN 'Quote & Pricing'
            WHEN url LIKE '%/supply-chain/warehousing%' THEN 'Warehousing'
            WHEN url LIKE '%/careers/jobs%' THEN 'Job Listings'
            ELSE 'General'
        END AS url_sub_cluster,

        -- Extract country-language from URL pattern (xx-xx)
        REGEXP_EXTRACT(url, 'dhl\\.com/([a-z]{2}-[a-z]{2})/', 1) AS country_language,

        -- Target keywords (basic examples - you should customize this)
        CASE
            WHEN url LIKE '%/tracking%' THEN 'tracking,track shipment,track package,where is my package'
            WHEN url LIKE '%/express/shipping%' THEN 'shipping,international shipping,send package'
            WHEN url LIKE '%/careers%' THEN 'careers,jobs,employment,hiring'
            WHEN url LIKE '%/contact%' THEN 'contact,customer service,phone number,support'
            ELSE NULL
        END AS target_keywords

    FROM DCIS_Staging_Lakehouse.searchdata_url_impression
    WHERE url IS NOT NULL
        AND url LIKE '%dhl.com%'
""")

# Expand target keywords into separate rows
from pyspark.sql.functions import explode, split

url_cluster_expanded = url_cluster_df.withColumn(
    "target_keyword",
    explode(split(col("target_keywords"), ","))
).select(
    "url",
    "url_cluster",
    "url_sub_cluster",
    "country_language",
    trim(lower(col("target_keyword"))).alias("target_keyword")
)

# Handle URLs without target keywords
url_cluster_no_keywords = url_cluster_df.filter(
    col("target_keywords").isNull()
).select(
    "url",
    "url_cluster",
    "url_sub_cluster",
    "country_language",
    lit(None).cast("string").alias("target_keyword")
)

# Union both datasets
url_cluster_final = url_cluster_expanded.union(url_cluster_no_keywords)

# Write to Delta table
print("✍️ Writing url_cluster_lookup table...")
url_cluster_final.write \
    .format("delta") \
    .mode("overwrite") \
    .option("overwriteSchema", "true") \
    .saveAsTable("DCIS_Staging_Lakehouse.url_cluster_lookup")

# Verify table creation
row_count = spark.sql("SELECT COUNT(*) FROM DCIS_Staging_Lakehouse.url_cluster_lookup").collect()[0][0]
unique_urls = spark.sql("SELECT COUNT(DISTINCT url) FROM DCIS_Staging_Lakehouse.url_cluster_lookup").collect()[0][0]

print(f"""
✅ url_cluster_lookup table created successfully!

📊 Table Statistics:
   - Total rows: {row_count:,}
   - Unique URLs: {unique_urls:,}
   - Location: DCIS_Staging_Lakehouse.url_cluster_lookup

📋 Sample data:
""")

spark.sql("""
    SELECT
        url_cluster,
        url_sub_cluster,
        COUNT(DISTINCT url) as url_count,
        COUNT(DISTINCT target_keyword) as keyword_count
    FROM DCIS_Staging_Lakehouse.url_cluster_lookup
    GROUP BY url_cluster, url_sub_cluster
    ORDER BY url_count DESC
    LIMIT 10
""").show(truncate=False)

print("\n✅ You can now run the aggregation pipeline!")
print("\n📝 NOTE: This is a basic categorization. You can enhance it by:")
print("   1. Adding more specific URL patterns")
print("   2. Importing actual target keyword lists")
print("   3. Refining cluster/sub-cluster logic")
print("   4. Adding business-specific categorization rules")
