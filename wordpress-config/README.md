# WordPress Configuration Files

This folder contains the WordPress setup files for the hybrid content management system.

## 📂 Files Overview

### `gaaka-custom-content.php`
**Purpose:** WordPress plugin that registers custom post types and fields

**What it does:**
- Creates "Site Content" post type (for hero, mission, etc.)
- Creates "Artisan Stories" post type
- Adds "Long Description" field to product categories
- Exposes everything via GraphQL

**Installation:** Copy to `wp-content/plugins/gaaka-custom-content/` and activate

---

### `acf-site-content-fields.json`
**Purpose:** Advanced Custom Fields configuration for site-wide content

**Fields included:**
- Content Type (hero, mission, about, footer_cta)
- Headline
- Subheadline
- CTA Text
- CTA Link
- Background Image

**Installation:** Import via Custom Fields → Tools → Import

---

### `acf-artisan-story-fields.json`
**Purpose:** Advanced Custom Fields configuration for artisan stories

**Fields included:**
- Artisan Name
- Location
- Primary Craft
- Years of Experience
- Featured Quote
- Video URL
- Related Products

**Installation:** Import via Custom Fields → Tools → Import

---

## 🚀 Quick Installation

1. **Copy plugin to WordPress:**
```bash
# From your WordPress installation directory
cp /path/to/gaaka/wordpress-config/gaaka-custom-content.php \
   wp-content/plugins/gaaka-custom-content/gaaka-custom-content.php
```

2. **Activate plugin:**
- Go to Plugins → Installed Plugins
- Find "GAAKA Custom Content"
- Click Activate

3. **Import ACF fields:**
- Go to Custom Fields → Tools
- Click "Import Field Groups"
- Upload `acf-site-content-fields.json`
- Upload `acf-artisan-story-fields.json`

4. **Verify setup:**
- You should see "Site Content" in WordPress admin menu
- You should see "Artisan Stories" in WordPress admin menu
- Product categories should have "Long Description" field

---

## 🔧 Customization

To add more custom fields:

1. **Edit in ACF UI:**
   - Go to Custom Fields → Field Groups
   - Edit "Site Content Fields" or "Artisan Story Fields"
   - Add your fields
   - Make sure "Show in GraphQL" is enabled
   - Set a GraphQL field name

2. **Export updated config:**
   - Go to Custom Fields → Tools → Export
   - Select your field group
   - Click "Export as JSON"
   - Replace the JSON file in this folder

3. **Update GraphQL queries:**
   - Edit `src/lib/wordpress/content-queries.ts`
   - Add your new fields to the query

---

## 📖 Documentation

- **Full Setup Guide:** See `HYBRID_CONTENT_SETUP.md` in project root
- **Editor Guide:** See `CONTENT_EDITOR_GUIDE.md` for non-technical users
- **WordPress Setup:** See `WORDPRESS_SETUP.md` for initial WordPress configuration

---

## ⚙️ Technical Details

### Custom Post Types

**Site Content:**
- GraphQL Single: `siteContent`
- GraphQL Plural: `siteContents`
- Public: No (admin only)
- UI: Yes

**Artisan Stories:**
- GraphQL Single: `artisanStory`
- GraphQL Plural: `artisanStories`
- Public: Yes
- Archive: Yes
- Slug: `/artisan-stories`

### GraphQL Schema

After activation, your GraphQL schema includes:

```graphql
query {
  siteContents {
    nodes {
      id
      title
      siteContentFields {
        contentType
        headline
        subheadline
        ctaText
        ctaLink
      }
    }
  }
  
  artisanStories {
    nodes {
      id
      title
      artisanStoryFields {
        artisanName
        location
        craft
        quote
      }
    }
  }
  
  productCategory(id: "storage-baskets", idType: SLUG) {
    name
    longDescription
  }
}
```

---

## 🆘 Troubleshooting

**Custom post types not showing:**
1. Check plugin is activated
2. Go to Settings → Permalinks → Save (flush rewrite rules)
3. Refresh admin page

**ACF fields not in GraphQL:**
1. Make sure "Show in GraphQL" is enabled for each field
2. Check GraphQL field name is set (no spaces or special characters)
3. Flush WordPress cache
4. Test query in GraphiQL: http://www.gaaka.com/dev/graphql

**Import fails:**
1. Make sure ACF PRO is installed and activated
2. Check JSON file is valid (no syntax errors)
3. Try importing one field group at a time

---

**Need help?** Check the main setup guide or contact your developer.
