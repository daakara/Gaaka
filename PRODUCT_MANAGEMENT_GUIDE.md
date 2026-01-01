# Product Management Guide for GAAKA

This guide provides best practices and tools for managing your products efficiently in WordPress.

## Table of Contents
1. [WordPress Admin Features](#wordpress-admin-features)
2. [Preview Your Next.js Site from WordPress](#preview-integration)
3. [Bulk Product Management](#bulk-product-management)
4. [Product Organization](#product-organization)
5. [Media Management](#media-management)
6. [Recommended Plugins](#recommended-plugins)

---

## WordPress Admin Features

### WooCommerce Product Dashboard
Access: `https://www.gaaka.com/dev/wp-admin/edit.php?post_type=product`

**Quick Actions:**
- **Add New Product**: Click "Add New" button
- **Bulk Edit**: Select multiple products → Actions → Edit
- **Quick Edit**: Hover over product → Click "Quick Edit"
- **Duplicate**: Use "Duplicate" link to copy existing products
- **Filter**: By category, stock status, or product type

### Product Fields
When adding/editing products:
- **Title**: Product name (e.g., "Handwoven Storage Basket")
- **Description**: Long description with story, materials, dimensions
- **Short Description**: Brief summary for product cards
- **Product Image**: Main featured image (1000x1000px recommended)
- **Gallery**: Additional product photos
- **Price**: Regular price and sale price
- **Inventory**: Stock status and quantity
- **Categories**: Kitchen & Dining, Storage Baskets, etc.
- **Tags**: Handwoven, Natural, Colorful, etc.

---

## Preview Integration

### See Your Next.js Site from WordPress Admin

You can preview how products look on your live site directly from WordPress!

#### Option 1: Quick Preview Link
Add this to your WordPress admin bar:

**File**: `wordpress-config/gaaka-preview-link.php`
```php
<?php
/**
 * Plugin Name: GAAKA Preview Link
 * Description: Adds preview link to Next.js site in WordPress admin bar
 * Version: 1.0.0
 */

function gaaka_add_preview_link($wp_admin_bar) {
    // Only show for products
    if (is_admin() && isset($_GET['post']) && get_post_type($_GET['post']) == 'product') {
        $product_slug = get_post_field('post_name', $_GET['post']);
        
        $wp_admin_bar->add_node(array(
            'id' => 'gaaka-preview',
            'title' => '🔍 Preview on GAAKA.com',
            'href' => 'https://gaaka.vercel.app/products/' . $product_slug,
            'meta' => array('target' => '_blank')
        ));
    }
    
    // Add shop preview
    $wp_admin_bar->add_node(array(
        'id' => 'gaaka-shop',
        'title' => '🛍️ View Shop',
        'href' => 'https://gaaka.vercel.app/collections/all',
        'meta' => array('target' => '_blank')
    ));
}
add_action('admin_bar_menu', 'gaaka_add_preview_link', 100);
```

**Installation:**
1. Create folder: `wp-content/plugins/gaaka-preview-link/`
2. Upload the PHP file
3. Activate in WordPress → Plugins

**Result**: You'll see "🔍 Preview on GAAKA.com" button in admin bar when editing products!

#### Option 2: Next.js Preview Mode (Advanced)
Enables real-time preview of draft products before publishing.

**Setup Required:**
1. Create preview API route in Next.js
2. Add preview button to WordPress admin
3. Set preview secret key

See `wordpress-config/nextjs-preview-setup.md` for detailed instructions.

---

## Bulk Product Management

### CSV Import/Export

WooCommerce has built-in CSV import:

**Export Products:**
1. Go to: WooCommerce → Products
2. Click "Export" at top
3. Select fields to export
4. Download CSV file

**Import Products:**
1. Go to: WooCommerce → Products
2. Click "Import" at top
3. Upload CSV file
4. Map columns to WooCommerce fields
5. Review and import

**Template**: Download `gaaka-product-import-template.csv` from this repository.

### Bulk Edit in WordPress
1. Go to Products list
2. Select multiple products (checkboxes)
3. Actions dropdown → Edit
4. Click "Apply"
5. Change categories, stock status, prices, etc.
6. Click "Update"

### Quick Actions
- **Duplicate Products**: Hover → "Duplicate" (saves time for similar items)
- **Quick Edit**: Change price/stock without opening full editor
- **Bulk Actions**: Trash, restore, or mark as featured

---

## Product Organization

### Categories Strategy
Organize products into logical categories matching your Next.js pages:

**Main Categories:**
- Kitchen & Dining → `/collections/kitchen-dining`
- Storage Baskets → `/collections/storage-baskets`
- Wall Baskets → `/collections/wall-baskets`

**Create Categories:**
1. Products → Categories
2. Add: Name, Slug, Description
3. Upload category image (optional)
4. Save

**Best Practice**: Use ACF to add long descriptions for category pages.

### Tags for Filtering
Use tags for product attributes:
- **Materials**: Woven, Rattan, Seagrass, Cotton
- **Colors**: Natural, Colorful, Neutral, Vibrant
- **Style**: Traditional, Modern, Bohemian
- **Features**: Handmade, Fair Trade, Eco-Friendly

### Featured Products
Mark products as "Featured" to show on homepage:
1. Edit product
2. Product Data → General
3. Check "Featured product"
4. Update

---

## Media Management

### Image Best Practices

**Product Images:**
- **Size**: 1000x1000px or 1200x1200px
- **Format**: JPEG (photos) or PNG (transparent backgrounds)
- **File Size**: < 200KB (use compression tools)
- **Background**: White or lifestyle settings
- **Naming**: `product-name-angle.jpg` (e.g., `basket-storage-front.jpg`)

**Gallery Images:**
- Show different angles
- Include lifestyle/in-use photos
- Detail shots (weave pattern, handles)
- 4-6 images per product

### WordPress Media Library Tips

**Organization:**
1. Create folders using plugin: "FileBird" or "Media Library Folders"
2. Name structure: `/products/baskets/storage/`
3. Add ALT text for SEO (describe image)

**Compression:**
- Install plugin: "ShortPixel" or "Imagify"
- Automatically compresses uploads
- Saves bandwidth and improves speed

**Bulk Upload:**
1. Media → Add New
2. Drag multiple images
3. Wait for upload
4. Add to products

---

## Recommended Plugins

### Essential for Product Management

1. **Advanced Custom Fields (ACF)** - Free
   - Add custom fields to products
   - Use cases: Artisan name, Origin country, Materials detail
   - GraphQL integration available

2. **WooCommerce Product CSV Import Suite** - WooCommerce Official
   - Bulk import/export
   - Update existing products
   - Scheduled imports

3. **FileBird** - Free/Pro
   - Organize media library into folders
   - Drag-and-drop organization
   - Better image management

4. **ShortPixel Image Optimizer** - Free/Pro
   - Automatic image compression
   - WebP conversion
   - Lazy loading

5. **Duplicate Post** - Free
   - Quickly duplicate products
   - Saves time for similar items
   - One-click duplication

6. **Admin Columns** - Free/Pro
   - Customize product list columns
   - Inline editing
   - Better overview

### Advanced Features

7. **WPML** or **Polylang** - Multilingual
   - Translate products to German
   - Separate product descriptions per language
   - Integrate with Next.js i18n

8. **WooCommerce Wholesale Prices** - B2B
   - Add wholesale pricing
   - For artisan partnerships
   - Role-based pricing

9. **Product Variations Swatches** - Visual
   - Show color/pattern swatches
   - Better UX for variable products
   - Image-based selection

---

## Workflow Recommendations

### Adding a New Product (Step-by-Step)

**1. Prepare Assets (Before WordPress)**
- Product photos (compressed, 1000x1000px)
- Product description (copy-paste ready)
- Price, dimensions, materials info
- Category assignment

**2. In WordPress**
1. Products → Add New
2. Title: "Handwoven Storage Basket - Natural"
3. Upload featured image
4. Add gallery images (4-6 photos)
5. Write long description with story
6. Short description (2-3 sentences)
7. Set price ($49.99)
8. Set stock status (In stock)
9. Choose category (Storage Baskets)
10. Add tags (Handwoven, Natural, Storage)
11. **Preview on Next.js** (using preview link)
12. Publish

**3. After Publishing**
- View on live site: `https://gaaka.vercel.app/collections/all`
- Check GraphQL: Products appear within 1 hour (ISR cache)
- Force rebuild if urgent: Trigger Vercel deployment

### Updating Existing Products

**Minor Changes** (price, stock):
- Use Quick Edit from product list
- Changes reflect immediately in GraphQL

**Major Changes** (images, description):
1. Edit product
2. Make changes
3. Preview on Next.js
4. Update
5. Wait for cache refresh (1 hour) or rebuild

**Bulk Price Update:**
1. Export products to CSV
2. Update prices in spreadsheet
3. Import CSV with updated prices
4. WooCommerce merges changes

---

## Viewing Products on Next.js Site

### Live Site URLs

**All Products**: https://gaaka.vercel.app/collections/all
**By Category**:
- https://gaaka.vercel.app/collections/storage-baskets
- https://gaaka.vercel.app/collections/kitchen-dining
- https://gaaka.vercel.app/collections/wall-baskets

**Single Product**: https://gaaka.vercel.app/products/[product-slug]

### Cache Behavior

Next.js uses **ISR (Incremental Static Regeneration)**:
- Product pages regenerate every **1 hour**
- Homepage regenerates every **1 hour**
- Collection pages regenerate every **1 hour**

**What This Means:**
- Product updates appear within 60 minutes
- No manual rebuild needed
- Fast page loads for customers

**Force Update:**
- Push any code change to GitHub
- Vercel automatically rebuilds site
- All product data refreshes immediately

---

## GraphQL Testing

Test your products are syncing correctly:

**Run Test Script:**
```bash
cd /Users/iDavid/Documents/Gaaka
node scripts/test-wordpress.js
```

**Manual GraphQL Query:**
```bash
curl -X POST https://www.gaaka.com/dev/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ products(first: 10) { nodes { name price } } }"
  }'
```

**GraphQL Playground:**
- Install "WPGraphiQL" plugin in WordPress
- Access: `https://www.gaaka.com/dev/wp-admin/admin.php?page=graphiql-ide`
- Test queries interactively

---

## Troubleshooting

### Products Not Showing on Next.js

**Check:**
1. Product is published (not draft)
2. Stock status is "In stock"
3. Price is set
4. GraphQL endpoint working: `node scripts/test-wordpress.js`
5. Wait 1 hour for cache, or trigger deployment

### Images Not Displaying

**Check:**
1. Image is uploaded to WordPress media library
2. Set as "Featured Image"
3. Image URL accessible: Open in new tab
4. Check CORS if loading from different domain

### Preview Link Not Working

**Check:**
1. Plugin activated in WordPress
2. Product has slug assigned
3. Next.js site deployed and accessible
4. URL pattern matches: `/products/[slug]`

---

## Next Steps

1. **Install Preview Plugin**: Add preview link to WordPress admin
2. **Organize Media Library**: Create folders for product images
3. **Set Up Categories**: Match your Next.js collection pages
4. **Add First Products**: Start with 3-5 test products
5. **Test GraphQL**: Verify products appear in queries
6. **Preview on Site**: Check products on live Next.js site

Need help? Check:
- `WOOCOMMERCE_CHECKLIST.md` - Setup guide
- `HYBRID_CONTENT_SETUP.md` - Content strategy
- `wordpress-config/` folder - Plugin files

---

## Quick Reference

| Task | Location |
|------|----------|
| Add Product | WooCommerce → Products → Add New |
| View All Products | WooCommerce → Products |
| Manage Categories | Products → Categories |
| Upload Images | Media → Add New |
| Export Products | Products → Export |
| Import Products | Products → Import |
| Preview Live Site | Admin Bar → View Shop |
| Test GraphQL | Terminal: `node scripts/test-wordpress.js` |

---

**Last Updated**: January 2026
**For**: GAAKA E-commerce Platform
**WordPress Version**: 6.0+
**WooCommerce Version**: 8.0+
