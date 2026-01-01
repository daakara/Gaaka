# Installing the GAAKA Preview Plugin

This guide shows you how to install the preview plugin that lets you see your Next.js site directly from WordPress admin.

## Quick Install (3 minutes)

### Step 1: Upload Plugin File

1. **Download the plugin file** from your repository:
   - File: `wordpress-config/gaaka-preview-link.php`
   - Location: `/Users/iDavid/Documents/Gaaka/wordpress-config/gaaka-preview-link.php`

2. **Access WordPress via FTP or File Manager**:
   - Connect to: `www.gaaka.com/dev`
   - Navigate to: `wp-content/plugins/`

3. **Create plugin folder**:
   - Create new folder: `gaaka-preview-link`
   - Full path: `wp-content/plugins/gaaka-preview-link/`

4. **Upload the PHP file**:
   - Upload `gaaka-preview-link.php` into the folder
   - Final path: `wp-content/plugins/gaaka-preview-link/gaaka-preview-link.php`

### Step 2: Activate Plugin

1. **Log into WordPress admin**:
   - URL: https://www.gaaka.com/dev/wp-admin

2. **Go to Plugins**:
   - Click "Plugins" in left sidebar
   - Find "GAAKA Preview Link"

3. **Click "Activate"**:
   - Plugin activates immediately
   - You'll see a confirmation message

### Step 3: Configure (Optional)

1. **Go to Settings → GAAKA Preview**:
   - Default URL: `https://gaaka.vercel.app`
   - Change if you have custom domain

2. **Save Settings**:
   - Click "Save Settings"
   - Test quick links to verify

## What You Get

### Admin Bar Links (Always Visible)

When logged into WordPress, you'll see:

```
🛍️ View Live Shop
  └─ 🏠 Homepage
  └─ 👁️ Preview This Product (when editing product)
  └─ 📂 Preview This Category (when editing category)
```

### Product List Quick Actions

On the Products page (`wp-admin/edit.php?post_type=product`):
- **Preview Column**: 👁️ button for each product
- **Row Actions**: "🔍 Preview on Site" link
- Click to open product on Next.js site in new tab

### Edit Product Screen

When editing a product:
- **Admin bar button**: "👁️ Preview This Product"
- Opens: `https://gaaka.vercel.app/products/[product-slug]`
- See exactly how it looks to customers

## Usage Examples

### Preview Product Before Publishing

1. **Add/Edit Product** in WordPress
2. Fill in details (title, price, images, description)
3. **Click "👁️ Preview This Product"** in admin bar
4. New tab opens showing product on Next.js site
5. Review how it looks
6. Go back to WordPress and adjust
7. Publish when satisfied

### Check Category Page

1. **Edit Category** (Products → Categories → Edit)
2. **Click "📂 Preview This Category"** in admin bar
3. See collection page on Next.js site
4. Verify products are displaying correctly

### Quick Shop Overview

1. **Click "🛍️ View Live Shop"** from anywhere in admin
2. Opens all products page
3. Check overall shop appearance
4. See which products are featured

## Troubleshooting

### Preview Links Not Showing

**Check**:
1. Plugin is activated (Plugins page)
2. You're logged into WordPress
3. Admin bar is visible (click your name → Show admin bar when viewing site)

### Wrong URL Opens

**Fix**:
1. Go to Settings → GAAKA Preview
2. Update "Next.js Site URL"
3. Remove trailing slash
4. Example: `https://gaaka.vercel.app` (not `https://gaaka.vercel.app/`)
5. Save settings

### Product Preview 404 Error

**Possible Causes**:
1. Product not published (save as draft first)
2. Slug mismatch (WordPress slug must match Next.js route)
3. Next.js cache hasn't updated (wait 1 hour or redeploy)

**Check Product Slug**:
- WordPress: Edit product → Slug field below title
- Next.js URL: `https://gaaka.vercel.app/products/[this-slug]`
- Must match exactly

## Alternative: Manual Preview

If you prefer not to use the plugin:

**Preview Product Manually**:
1. Edit product in WordPress
2. Copy the product slug (below title)
3. Open: `https://gaaka.vercel.app/products/[paste-slug-here]`

**Preview Category**:
- Storage Baskets: `https://gaaka.vercel.app/collections/storage-baskets`
- Kitchen & Dining: `https://gaaka.vercel.app/collections/kitchen-dining`
- Wall Baskets: `https://gaaka.vercel.app/collections/wall-baskets`

## Advanced: Custom Domain

If you have a custom domain (e.g., `shop.gaaka.com`):

1. **Update Plugin Settings**:
   - Settings → GAAKA Preview
   - Change URL to: `https://shop.gaaka.com`
   - Save

2. **Update Vercel Domain** (if needed):
   - Vercel dashboard → Project → Settings → Domains
   - Add custom domain
   - Update DNS records

## Benefits

✅ **See Live Preview**: View products as customers will see them
✅ **Faster Workflow**: No need to manually construct URLs
✅ **Quality Check**: Verify images, prices, descriptions before publishing
✅ **Category Management**: Preview collection pages instantly
✅ **Quick Access**: One click from product list to live site

## Next Steps

1. **Install the Plugin** (follow Step 1-3 above)
2. **Add Test Product** in WordPress
3. **Click Preview Button** to see it on Next.js
4. **Start Adding Real Products** with confidence

---

**Need Help?**
- Check: [PRODUCT_MANAGEMENT_GUIDE.md](PRODUCT_MANAGEMENT_GUIDE.md)
- WordPress Support: https://wordpress.org/support/
- WooCommerce Docs: https://woocommerce.com/documentation/

**Plugin File Location**:
- Repository: `wordpress-config/gaaka-preview-link.php`
- WordPress: `wp-content/plugins/gaaka-preview-link/gaaka-preview-link.php`
