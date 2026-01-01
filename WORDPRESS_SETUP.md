# WordPress Headless CMS Setup Guide

This guide explains how to set up WordPress with WooCommerce as a headless CMS for the GAAKA e-commerce site.

## 📋 Prerequisites

- WordPress 6.0+ installation
- PHP 8.0+
- MySQL 5.7+ or MariaDB 10.3+
- SSL certificate (for production)
- Admin access to WordPress

## 🔌 Required WordPress Plugins

### 1. WPGraphQL (Required)
**Purpose:** Provides GraphQL API for WordPress

```bash
# Install via WordPress admin or WP-CLI
wp plugin install wp-graphql --activate
```

**Settings:**
- Go to GraphQL → Settings
- Enable "Public Introspection" for development
- Set GraphQL endpoint: `/graphql`

### 2. WooCommerce (Recommended)
**Purpose:** Product management with e-commerce features

```bash
wp plugin install woocommerce --activate
```

**Initial Setup:**
- Complete WooCommerce setup wizard
- Set currency to EUR
- Configure German shipping zones
- Skip payment setup (handled by Next.js)

### 3. WPGraphQL for WooCommerce (Required if using WooCommerce)
**Purpose:** Exposes WooCommerce data via GraphQL

```bash
# Install manually from:
# https://github.com/wp-graphql/wp-graphql-woocommerce
```

### 4. Advanced Custom Fields (ACF) PRO
**Purpose:** Add custom fields to products

- Purchase from: https://www.advancedcustomfields.com/pro/
- Install and activate
- Import field groups (see below)

### 5. WPGraphQL for Advanced Custom Fields
**Purpose:** Expose ACF fields via GraphQL

```bash
# Install from:
# https://github.com/wp-graphql/wpgraphql-acf
```

### 6. WPGraphQL CORS (Optional)
**Purpose:** Handle CORS for API requests

```bash
wp plugin install wp-graphql-cors --activate
```

**Settings:**
- Add your Next.js domain to allowed origins
- Enable credentials if needed

## 🏗️ WordPress Configuration

### 1. Permalink Settings
- Go to Settings → Permalinks
- Select "Post name"
- Save changes

### 2. WooCommerce Settings

**General:**
- Store Address: Your business address
- Currency: EUR (€)
- Currency Position: Left with space

**Products:**
- Shop Page: Create and select
- Enable reviews: Yes
- Marketplace suggestions: Disable

**Inventory:**
- Hold stock: 60 minutes
- Notifications: Enable low stock alerts

**Shipping:**
- Create shipping zones for Germany, EU, and worldwide
- Add flat rate or calculated shipping

## 📦 Custom Post Types (Alternative to WooCommerce)

If not using WooCommerce, create custom post types for products:

```php
// Add to theme's functions.php or custom plugin
function gaaka_register_product_post_type() {
    register_post_type('product', [
        'labels' => [
            'name' => 'Products',
            'singular_name' => 'Product'
        ],
        'public' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'product',
        'graphql_plural_name' => 'products',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'has_archive' => true,
        'rewrite' => ['slug' => 'products']
    ]);
}
add_action('init', 'gaaka_register_product_post_type');
```

## 🎨 ACF Field Groups

### Product Fields (for WooCommerce)

Import this JSON configuration in ACF:

```json
{
  "key": "group_product_fields",
  "title": "Product Fields",
  "fields": [
    {
      "key": "field_dimensions",
      "label": "Dimensions",
      "name": "dimensions",
      "type": "group",
      "show_in_graphql": 1,
      "graphql_field_name": "dimensions",
      "sub_fields": [
        {
          "key": "field_height",
          "label": "Height (cm)",
          "name": "height",
          "type": "number"
        },
        {
          "key": "field_width",
          "label": "Width (cm)",
          "name": "width",
          "type": "number"
        },
        {
          "key": "field_depth",
          "label": "Depth (cm)",
          "name": "depth",
          "type": "number"
        }
      ]
    },
    {
      "key": "field_weight",
      "label": "Weight (kg)",
      "name": "weight",
      "type": "number",
      "show_in_graphql": 1
    },
    {
      "key": "field_materials",
      "label": "Materials",
      "name": "materials",
      "type": "text",
      "show_in_graphql": 1
    },
    {
      "key": "field_colors",
      "label": "Available Colors",
      "name": "availableColors",
      "type": "select",
      "multiple": 1,
      "choices": {
        "natural": "Natural",
        "black": "Black",
        "brown": "Brown",
        "multicolor": "Multicolor"
      },
      "show_in_graphql": 1
    },
    {
      "key": "field_best_seller",
      "label": "Best Seller",
      "name": "bestSeller",
      "type": "true_false",
      "show_in_graphql": 1
    },
    {
      "key": "field_limited_edition",
      "label": "Limited Edition",
      "name": "limitedEdition",
      "type": "true_false",
      "show_in_graphql": 1
    },
    {
      "key": "field_care_instructions",
      "label": "Care Instructions",
      "name": "careInstructions",
      "type": "textarea",
      "show_in_graphql": 1
    }
  ],
  "location": [
    [
      {
        "param": "post_type",
        "operator": "==",
        "value": "product"
      }
    ]
  ],
  "show_in_graphql": 1,
  "graphql_field_name": "productFields"
}
```

### Artisan Story Custom Post Type

```php
function gaaka_register_artisan_post_type() {
    register_post_type('artisan', [
        'labels' => [
            'name' => 'Artisan Stories',
            'singular_name' => 'Artisan Story'
        ],
        'public' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'artisan',
        'graphql_plural_name' => 'artisans',
        'supports' => ['title', 'editor', 'thumbnail'],
        'menu_icon' => 'dashicons-groups'
    ]);
}
add_action('init', 'gaaka_register_artisan_post_type');
```

## 🔒 Security & CORS

### 1. Add CORS Headers

Add to `wp-config.php` or use plugin:

```php
// Allow requests from Next.js domain
define('GRAPHQL_CORS_ENABLED', true);
define('GRAPHQL_CORS_ALLOWED_ORIGINS', 'https://gaaka.com,http://localhost:3000');
```

### 2. Authentication (Optional)

For preview mode or private content:

```bash
wp plugin install wp-graphql-jwt-authentication --activate
```

Generate JWT secret:
```php
// Add to wp-config.php
define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
```

## 📊 Sample Product Data

### Create Categories

1. Go to Products → Categories
2. Create:
   - Storage Baskets
   - Kitchen & Dining
   - Wall Baskets

### Add Sample Product

1. Products → Add New
2. **Title:** Woven Storage Basket - Natural
3. **Description:** Handcrafted by Kenyan artisans...
4. **Product Data:**
   - Regular price: 45.00
   - Sale price: 39.00 (optional)
   - Stock: In stock
   - Stock quantity: 10
5. **Categories:** Select "Storage Baskets"
6. **Product Gallery:** Upload images
7. **ACF Fields:**
   - Dimensions: 30 x 30 x 25 cm
   - Weight: 0.5 kg
   - Materials: Natural sisal, leather
   - Best Seller: Yes
8. **Publish**

## 🧪 Testing the GraphQL API

### Test in GraphiQL

1. Go to GraphQL → GraphiQL IDE
2. Run test query:

```graphql
query TestProducts {
  products(first: 5) {
    nodes {
      id
      name
      price
      image {
        sourceUrl
      }
    }
  }
}
```

### Test from Next.js

```bash
# Update .env.local
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🚀 Production Checklist

- [ ] SSL certificate installed
- [ ] WPGraphQL introspection disabled
- [ ] CORS configured for production domain
- [ ] All products have images
- [ ] Categories configured
- [ ] Shipping zones set up
- [ ] Cache plugin installed (WP Rocket or similar)
- [ ] CDN configured for images
- [ ] Database optimized
- [ ] Regular backups configured

## 📚 Useful WP-CLI Commands

```bash
# List all products
wp post list --post_type=product

# Export products
wp export --post_type=product

# Import products from CSV
wp wc product import products.csv

# Clear all caches
wp cache flush

# Check GraphQL schema
wp graphql show-schema
```

## 🆘 Troubleshooting

### GraphQL endpoint not working
- Check permalink settings
- Flush rewrite rules: `wp rewrite flush`
- Verify WPGraphQL is activated

### CORS errors
- Install WPGraphQL CORS plugin
- Add your domain to allowed origins
- Check server headers

### Custom fields not showing
- Verify "Show in GraphQL" is enabled in ACF
- Check field group location rules
- Refresh GraphQL schema

### Images not loading in Next.js
- Add WordPress domain to `next.config.js` images.domains
- Check image URLs are absolute
- Verify CORS headers allow image requests

## 📖 Additional Resources

- [WPGraphQL Documentation](https://www.wpgraphql.com/docs)
- [WooCommerce GraphQL](https://woographql.com/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

---

**Need help?** Check the GitHub issues or contact support.
