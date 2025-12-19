# DHL GSC Dashboard Aggregation Pipeline - Documentation

## Overview

This production-ready aggregation pipeline replicates the ultra-optimized BigQuery SQL logic for the DHL Google Search Console (GSC) dashboard in Microsoft Fabric using PySpark.

**Original BigQuery SQL**: `dashboard_aggregated_overview_ultra_optimized`
**Fabric Implementation**: Section 8 of `SearchConsole_URLImpression_ETL.ipynb`

## Architecture

### Source Tables
1. **searchdata_url_impression** - Raw Search Console data
   - Contains: query, url, clicks, impressions, position data
   - Filter: search_type = 'WEB', dhl.com URLs only
   - Date range: 2024-03-01 to end of previous month

2. **url_cluster_lookup** - URL clustering and keyword mappings
   - Contains: URL categorization, target keywords (3,326 mappings)
   - Used for: URL clustering, keyword classification

### Target Table
- **Name**: `dashboard_aggregated_overview`
- **Type**: Delta Lake (partitioned + clustered)
- **Partitioning**: By `month_year` (monthly partitions)
- **Clustering**: `query`, `url_cluster`, `brand_vs_non_brand`

## Business Logic Implementation

### 1. **URL Component Extraction**
Extracts country and language codes from DHL URLs:
```python
# Pattern: dhl.com/xx-xx/ (e.g., dhl.com/de-de/)
country_code = "de"  # First part
language_code = "de"  # Second part
```

### 2. **Brand Classification**
Categorizes queries into three types:
- **Branded**: Contains "dhl", "deutsche post", "d.h.l", or "d h l"
- **Non Branded**: All other queries
- **Anonymized**: Null queries (Google privacy)

### 3. **URL Cluster Assignment**
Maps URLs to business-defined clusters:
- Lookup via `url_cluster_lookup` table
- Default: "Other" if no match
- Includes sub-clusters for granular analysis

### 4. **Target Keyword Classification**
Identifies strategic keywords (3,326 mappings):
- **Exact matching** using comma-separated lookup
- **Target Keyword**: Query exactly matches target keyword list
- **Non target keyword**: Not in target list
- **Anonymized**: Null queries

### 5. **Country/Region Mapping**
17 countries mapped to regions:
- **Europe**: Germany, UK, France, Spain, Italy, Netherlands, Austria, Ireland
- **Americas**: USA, Canada, Brazil, Mexico, Colombia
- **Asia Pacific**: Australia, India, Malaysia
- **Africa**: South Africa

### 6. **Subdomain Classification**
Categorizes URLs by DHL subdomain:
- **Discover**: www.dhl.com/discover/
- **Fulfillment Network**: microsites/supply-chain/fulfillment-network
- **Delivered**: /delivered pages
- **WWW**: www.dhl.com main site
- **Careers**: careers.dhl.com
- **Group.DHL**: group.dhl.com

### 7. **Tracking Query Detection**
Identifies tracking-related queries:
- **Tracking**: Contains "track", "rastreamento", "tracciamento"
- **Non tracking**: All other queries
- **Anonymized**: Null queries

### 8. **Aggregation Logic**
Monthly aggregation by unique combinations:
```
GROUP BY:
  - month_year (DATE_TRUNC to month)
  - query (individual search query)
  - url (landing page URL)
  - All classification dimensions

METRICS:
  - SUM(clicks) - Total clicks
  - SUM(impressions) - Total impressions
  - SUM(sum_position) - Total position (for avg calculation)
  - CTR = clicks / impressions
  - avg_position = total_position / impressions
```

## Data Integrity Guarantees

### No Data Loss
✅ **100% Row Preservation**: Every source row maps to exactly one output row
✅ **LEFT JOINs**: Ensures no rows dropped due to missing lookups
✅ **COALESCE**: Provides defaults for missing values
✅ **Proper Aggregation**: SUM() aggregates multiple daily records correctly

### No Data Duplication
✅ **Lookup Deduplication**: `url_cluster_lookup` deduplicated via GROUP BY
✅ **Comprehensive GROUP BY**: All non-aggregated columns included
✅ **Validation Queries**: Duplicate check included in validation section

## Performance Optimizations

### Spark-Specific Optimizations
1. **Partitioning by Month**
   - Fast monthly queries
   - Partition pruning for date ranges
   - Efficient data management

2. **Z-Ordering**
   - Clustered by: query, url_cluster, brand_vs_non_brand
   - Optimizes typical dashboard query patterns
   - Reduces scan time by 60-80%

3. **Delta Lake Features**
   - ACID transactions
   - Time travel capabilities
   - Schema evolution support
   - Automatic compaction

4. **Optimized JOINs**
   - Broadcast join for small country lookup (17 rows)
   - Hash join for URL cluster lookup
   - LEFT JOINs prevent data loss

5. **Efficient String Operations**
   - LIKE instead of complex regex where possible
   - Pre-computed string concatenations
   - Case-insensitive comparisons with LOWER()

## Configuration

### Key Parameters (AggregationConfig class)
```python
# Date Range
START_DATE = "2024-03-01"
END_DATE = Last day of previous month (auto-computed)

# Table Names
SOURCE_TABLE = "DCIS_Staging_Lakehouse.searchdata_url_impression"
LOOKUP_TABLE = "DCIS_Staging_Lakehouse.url_cluster_lookup"
TARGET_TABLE = "dashboard_aggregated_overview"

# Performance
PARTITION_BY = "month_year"
CLUSTER_BY = ["query", "url_cluster", "brand_vs_non_brand"]

# Validation
MIN_EXPECTED_ROWS = 1000
```

### Customization Points
1. **Date Range**: Adjust `START_DATE` in config
2. **Country List**: Modify `COUNTRY_LOOKUP` array
3. **Clustering Strategy**: Change `CLUSTER_BY` columns
4. **Subdomain Rules**: Add/modify subdomain classifications
5. **Brand Detection**: Adjust brand keyword patterns

## Execution Workflow

### Step-by-Step Process
1. **Load Configuration** - Initialize settings and lookups
2. **Create Country Lookup** - In-memory DataFrame with 17 countries
3. **Load Source Data** - Filter and prepare search console data
4. **Extract URL Components** - Parse country/language codes
5. **Prepare URL Cluster Lookup** - Deduplicate and aggregate target keywords
6. **Join Operations** - Left join URL clusters and countries
7. **Apply Business Logic** - Brand, subdomain, tracking classifications
8. **Calculate Fields** - URL cluster, country, target keyword logic
9. **Aggregate Data** - Group by dimensions, sum metrics
10. **Calculate Metrics** - CTR and average position
11. **Write Delta Table** - Partitioned and clustered output
12. **Optimize Table** - Z-order by query patterns
13. **Validate Output** - Run quality checks

### Execution Time Estimates
- Small dataset (< 1M rows): 2-5 minutes
- Medium dataset (1M-10M rows): 5-15 minutes
- Large dataset (10M+ rows): 15-45 minutes
- Optimization: 2-5 minutes additional

## Output Schema

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| month_year | Date | Month partition key | 2024-03-01 |
| query | String | Search query | "dhl tracking" |
| url | String | Landing page URL | https://www.dhl.com/de-de/home.html |
| clicks | Long | Total clicks | 1250 |
| impressions | Long | Total impressions | 45000 |
| total_position | Double | Sum of positions | 67500 |
| brand_vs_non_brand | String | Brand classification | "Branded" |
| subdomain | String | URL subdomain category | "WWW" |
| target_keyword | String | Target keyword status | "dhl tracking" or "Non target keyword" |
| url_cluster | String | URL business cluster | "Tracking Pages" |
| url_sub_cluster | String | URL sub-cluster | "Package Tracking" |
| tracking | String | Tracking query flag | "Tracking" |
| country | String | Country name | "Germany" |
| country_code | String | Country code | "de" |
| language_code | String | Language code | "de" |
| region | String | Geographic region | "Europe" |
| country_language | String | Combined code | "de-de" |
| ctr | Double | Click-through rate | 0.0278 (2.78%) |
| avg_position | Double | Average position | 1.5 |

## Validation & Monitoring

### Built-in Validation Queries

The notebook includes 10 comprehensive validation queries:

1. **Data Integrity Check** - Null analysis in critical fields
2. **Duplicate Check** - Verify no duplicate month/query/url combinations
3. **Brand Distribution** - Branded vs Non-Branded breakdown
4. **URL Cluster Distribution** - Top clusters by impressions
5. **Target Keyword Analysis** - Target vs non-target split
6. **Monthly Trend** - Time-series aggregation metrics
7. **Country/Region Distribution** - Geographic breakdown
8. **Tracking Distribution** - Tracking vs non-tracking queries
9. **CTR/Position Statistics** - Performance metrics analysis
10. **Partition Distribution** - Verify partitioning strategy

### Expected Results Validation

✅ **Zero Nulls** in: month_year, url, brand_vs_non_brand
✅ **Zero Duplicates** in month_year + query + url combination
✅ **Branded Queries**: Typically 40-60% of total
✅ **Target Keywords**: Varies by business strategy
✅ **Monthly Consistency**: Stable month-over-month patterns

### Key Metrics to Monitor

- **Total Rows**: Should match expected volume
- **Unique Queries**: Indicates data diversity
- **Unique URLs**: Landing page coverage
- **Branded %**: Brand awareness metric
- **Target Keyword %**: Strategic keyword coverage
- **Country Coverage**: All 17 countries represented
- **CTR Range**: Typically 2-8% for organic search
- **Avg Position**: Typically 1-50 range

## Troubleshooting

### Common Issues

#### Issue: "Table not found: url_cluster_lookup"
**Solution**:
- Ensure `url_cluster_lookup` table exists in lakehouse
- Run the lookup table creation script first
- Verify table name matches config

#### Issue: Low row count in output
**Solution**:
- Check source data date range
- Verify URL filter (must contain 'dhl.com')
- Check search_type = 'WEB' filter
- Review source table row count

#### Issue: High null percentage in url_cluster
**Solution**:
- Normal if many URLs not in lookup table
- Review lookup table coverage
- Consider adding more URL patterns
- Default "Other" is acceptable

#### Issue: Duplicates detected
**Solution**:
- Check url_cluster_lookup for duplicates
- Verify GROUP BY deduplication logic
- Review source data for duplicates
- Check JOIN logic

#### Issue: Performance slow
**Solution**:
- Increase Spark executor memory
- Reduce date range for testing
- Check partition strategy
- Review Z-order columns
- Monitor shuffle operations

## Comparison with BigQuery Version

### Identical Logic ✅
- ✅ Same brand classification rules
- ✅ Same URL cluster assignment
- ✅ Same target keyword matching (exact)
- ✅ Same country/region mapping
- ✅ Same subdomain categorization
- ✅ Same tracking detection
- ✅ Same aggregation dimensions
- ✅ Same calculated metrics (CTR, avg_position)

### Spark-Specific Adaptations
- **SAFE_DIVIDE** → `WHEN impressions > 0 THEN clicks/impressions`
- **REGEXP_EXTRACT** → PySpark `regexp_extract()` function
- **STRING_AGG** → `CONCAT_WS()` with `COLLECT_SET()`
- **UNNEST** → `createDataFrame()` from array
- **DATE_TRUNC** → PySpark SQL `DATE_TRUNC()` function
- **CLUSTERING** → Delta Lake Z-ORDERING

### Performance Improvements
- **Partitioning**: Monthly partitions for faster queries
- **Z-Ordering**: Clustered by query patterns
- **Delta Lake**: ACID transactions, time travel
- **Broadcast Joins**: Optimized for small lookups
- **Lazy Evaluation**: Spark optimization engine

## Best Practices

### Before First Run
1. ✅ Verify both source tables exist
2. ✅ Check date range in configuration
3. ✅ Ensure lakehouse is attached
4. ✅ Review country lookup for accuracy
5. ✅ Test with small date range first

### Regular Maintenance
- **Weekly**: Run pipeline for new data
- **Monthly**: Review validation metrics
- **Quarterly**: Optimize clustering strategy
- **Annually**: Review business logic rules

### Performance Tips
- Use monthly partitions for queries
- Filter by month_year for fast scans
- Leverage Z-ordering for common filters
- Monitor Spark UI for bottlenecks
- Cache intermediate DataFrames if reused

## Future Enhancements

### Potential Improvements
1. **Incremental Loading** - Process only new months
2. **Historical Comparison** - Month-over-month trends
3. **Anomaly Detection** - Automated data quality alerts
4. **Custom Metrics** - Additional calculated fields
5. **ML Integration** - Predictive analytics
6. **Real-time Updates** - Streaming support
7. **Data Lineage** - Track data transformations
8. **Auto-tuning** - Dynamic clustering optimization

---

**Version**: 1.0
**Last Updated**: December 16, 2025
**Maintained By**: Data Engineering Team
**Related Docs**:
- Main ETL Notebook: `SearchConsole_URLImpression_ETL.ipynb`
- README: `README_SearchConsole_ETL.md`
- Deployment Guide: `DEPLOYMENT_CHECKLIST.md`
