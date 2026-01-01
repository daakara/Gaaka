# Hybrid Content Management Setup

This guide shows you how to set up the hybrid content approach where:
- **Products** → WordPress/WooCommerce (already configured)
- **Hero Headlines & Mission** → WordPress ACF (editable by non-technical users)
- **UI Labels** → i18n files (already in place)
- **Footer Links** → Hardcoded (structural, rarely changes)

## 📦 Step 1: Install Custom Content Plugin

### Option A: Upload as Plugin (Recommended)

1. Create plugin directory structure:
```bash
mkdir -p /path/to/wordpress/wp-content/plugins/gaaka-custom-content
```

2. Copy the plugin file:
```bash
cp wordpress-config/gaaka-custom-content.php \
   /path/to/wordpress/wp-content/plugins/gaaka-custom-content/gaaka-custom-content.php
```

3. Activate in WordPress:
   - Go to **Plugins** → **Installed Plugins**
   - Find "GAAKA Custom Content"
   - Click **Activate**

### Option B: Add to Theme's functions.php

1. Open your theme's `functions.php` file
2. Copy the contents of `wordpress-config/gaaka-custom-content.php` (without the plugin header)
3. Paste at the end of `functions.php`
4. Save

## 🎨 Step 2: Import ACF Field Groups

1. **Install ACF PRO** (if not already installed):
   - Purchase from https://www.advancedcustomfields.com/pro/
   - Install and activate the plugin

2. **Import Site Content Fields**:
   - Go to **Custom Fields** → **Tools**
   - Select "Import Field Groups"
   - Upload: `wordpress-config/acf-site-content-fields.json`
   - Click **Import JSON**

3. **Import Artisan Story Fields**:
   - Repeat above steps with: `wordpress-config/acf-artisan-story-fields.json`

## ✍️ Step 3: Create Hero Content

1. Go to **Site Content** → **Add Content Block**

2. **Title:** Homepage Hero

3. **Content Type:** Hero Section (Homepage)

4. Fill in fields:
   - **Headline:** handcrafted african artistry
   - **Subheadline:** where every basket tells a story
   - **Call to Action Text:** discover the collection
   - **Call to Action Link:** /collections/all
   - **Background Image:** (optional) Upload hero background

5. **Publish**

## 📖 Step 4: Create Mission Content

1. Go to **Site Content** → **Add Content Block**

2. **Title:** Mission Statement

3. **Content Type:** Mission Statement

4. Fill in fields:
   - **Headline:** Our Mission
   - **Subheadline:** Supporting African artisans and preserving traditional crafts

5. In the main content editor, write your full mission statement

6. **Publish**

## 👥 Step 5: Add Artisan Stories

1. Go to **Artisan Stories** → **Add Story**

2. **Title:** Maria's Weaving Journey (example)

3. **Content:** Write the full artisan story in the editor

4. **Featured Image:** Upload artisan photo

5. Fill in custom fields:
   - **Artisan Name:** Maria Wanjiku
   - **Location:** Nairobi
   - **Primary Craft:** Basket Weaving
   - **Years of Experience:** 15
   - **Featured Quote:** "Every basket carries the spirit of my ancestors"
   - **Video URL:** (optional) YouTube link
   - **Related Products:** Select products made by this artisan

6. **Publish**

7. Repeat for more artisan stories

## 🏷️ Step 6: Add Category Descriptions

1. Go to **Products** → **Categories**

2. Edit "Storage Baskets" (or create if needed)

3. **Description:** Short description (auto-generated excerpt)

4. **Long Description:** (new field added by plugin)
   ```
   Our handwoven storage baskets combine functionality with timeless beauty. 
   Each piece is crafted by skilled artisans using traditional techniques 
   passed down through generations. Perfect for organizing your home while 
   celebrating African craftsmanship.
   ```

5. **Save**

6. Repeat for:
   - Kitchen & Dining
   - Wall Baskets

## 🧪 Step 7: Test WordPress Connection

1. From your project directory:
```bash
node scripts/test-wordpress.js
```

2. You should see:
   - ✅ WordPress Connection Successful
   - Content types available
   - Categories with long descriptions

## 🚀 Step 8: Rebuild Your Site

### For Vercel (Automatic):
```bash
git add .
git commit -m "feat: implement hybrid content management"
git push
```

Vercel will automatically rebuild with the new content.

### For Static Export (Manual):
```bash
npm run build:static
```

Then upload the `out/` folder to your hosting.

## 📝 Editing Content (Non-Technical Users)

### To Change Hero Headline:

1. Log into WordPress: https://www.gaaka.com/dev/wp-admin
2. Go to **Site Content**
3. Click "Homepage Hero"
4. Edit the **Headline** field
5. Click **Update**
6. Trigger site rebuild (or wait for scheduled rebuild)

### To Add New Artisan Story:

1. Log into WordPress
2. Go to **Artisan Stories** → **Add Story**
3. Fill in all fields (name, location, story, etc.)
4. Upload photo
5. Click **Publish**
6. Story appears on your site after rebuild

### To Update Collection Descriptions:

1. Log into WordPress
2. Go to **Products** → **Categories**
3. Edit the category (e.g., "Storage Baskets")
4. Update **Long Description**
5. Click **Update**
6. Collection page updates after rebuild

## 🔄 Content Workflow

```
┌─────────────────────┐
│   Content Editor    │
│   (WordPress)       │
└──────────┬──────────┘
           │
           │ 1. Edit content in WordPress
           │
           ▼
┌─────────────────────┐
│   WordPress API     │
│   (GraphQL)         │
└──────────┬──────────┘
           │
           │ 2. GraphQL queries fetch content
           │
           ▼
┌─────────────────────┐
│   Next.js Build     │
│   (getStaticProps)  │
└──────────┬──────────┘
           │
           │ 3. Static pages generated
           │
           ▼
┌─────────────────────┐
│   Live Website      │
│   (Vercel/Namecheap)│
└─────────────────────┘
```

## 🎯 What's Editable via WordPress

| Content Type | Editable? | Where to Edit |
|--------------|-----------|---------------|
| Products | ✅ Yes | Products → All Products |
| Hero Headline | ✅ Yes | Site Content → Homepage Hero |
| Mission Statement | ✅ Yes | Site Content → Mission Statement |
| Artisan Stories | ✅ Yes | Artisan Stories → All Stories |
| Collection Descriptions | ✅ Yes | Products → Categories |
| Product Categories | ✅ Yes | Products → Categories |
| Footer Links | ❌ No | Hardcoded in code |
| Navigation Menu | ❌ No | Hardcoded in code |
| UI Labels (buttons, etc.) | ❌ No | i18n translation files |

## 🛠️ Advanced: Custom Queries

If you want to add more WordPress content types:

1. **Register Custom Post Type** in `gaaka-custom-content.php`
2. **Create ACF Fields** for the content
3. **Add GraphQL Query** in `src/lib/wordpress/content-queries.ts`
4. **Update Component** to fetch and display content
5. **Update Page** with `getStaticProps` to fetch data

Example for "Team Members":

```php
// In gaaka-custom-content.php
register_post_type('team_member', [
  'show_in_graphql' => true,
  'graphql_single_name' => 'teamMember',
  'graphql_plural_name' => 'teamMembers',
  // ... rest of configuration
]);
```

```typescript
// In content-queries.ts
export const GET_TEAM_MEMBERS = `
  query GetTeamMembers {
    teamMembers(first: 10) {
      nodes {
        id
        title
        content
        featuredImage { node { sourceUrl } }
      }
    }
  }
`;
```

## 📚 Resources

- **ACF Documentation:** https://www.advancedcustomfields.com/resources/
- **WPGraphQL Docs:** https://www.wpgraphql.com/docs
- **Custom Post Types:** https://developer.wordpress.org/plugins/post-types/

## 🆘 Troubleshooting

### Content not updating on site

1. Check WordPress content is published (not draft)
2. Trigger manual rebuild in Vercel
3. Clear browser cache
4. Check GraphQL query is correct

### ACF fields not showing in GraphQL

1. Verify "Show in GraphQL" is enabled in ACF
2. Check GraphQL field name is set
3. Flush WordPress permalinks
4. Test query in GraphiQL

### Custom post type not appearing

1. Activate the plugin
2. Flush WordPress permalinks: Settings → Permalinks → Save
3. Check `show_in_graphql => true` in post type registration

---

**Next Steps:**
1. ✅ Complete WordPress setup above
2. ✅ Add your first hero content
3. ✅ Create 2-3 artisan stories
4. ✅ Add collection descriptions
5. ✅ Test and rebuild site
