# Deploying to Namecheap Stellar Plus Hosting

This guide walks you through deploying your GAAKA Next.js site to Namecheap Stellar Plus shared hosting.

## 📋 Overview

**Hosting:** Namecheap Stellar Plus (Shared Hosting with cPanel)  
**Deployment Method:** Static Export  
**WordPress:** Hosted at https://www.gaaka.com (headless CMS)

### Important Limitations

Since Stellar Plus is shared hosting (no Node.js):
- ❌ No server-side rendering (SSR)
- ❌ No API routes
- ❌ No automatic WordPress updates
- ✅ Fast, static HTML/CSS/JS
- ✅ Works on any web server

**When you add/update products in WordPress, you'll need to rebuild and redeploy the site.**

---

## 🚀 Quick Start: First Deployment

### Step 1: Build the Static Site

```bash
# Make sure you're in the project directory
cd /Users/iDavid/Documents/Gaaka

# Install dependencies (if not already done)
npm install

# Build static export (fetches WordPress products)
npm run export
```

This creates an `out/` folder with your static website.

### Step 2: Upload to Namecheap via cPanel

#### Option A: Using cPanel File Manager (Recommended)

1. **Log into cPanel**
   - Go to https://cpanel.namecheap.com (or your specific cPanel URL)
   - Enter your credentials

2. **Navigate to File Manager**
   - Click **File Manager** in cPanel
   - Go to `public_html` directory

3. **Clear Existing Files** (First time only)
   - Select all files in `public_html` (except cgi-bin if present)
   - Click **Delete**

4. **Upload Your Site**
   - Click **Upload** button
   - Drag and drop the contents of your `out/` folder
   - **Important:** Upload the CONTENTS of `out/`, not the folder itself
   - Wait for upload to complete (may take 5-10 minutes)

5. **Set Permissions**
   - Select all uploaded files
   - Click **Permissions**
   - Set to `644` for files, `755` for folders

6. **Test Your Site**
   - Visit https://gaaka.com
   - Check that all pages load correctly

#### Option B: Using FTP (FileZilla)

1. **Get FTP Credentials from cPanel**
   - In cPanel, go to **FTP Accounts**
   - Create new FTP account or use main account
   - Note: Host, Username, Password

2. **Connect with FileZilla**
   - Host: `ftp.gaaka.com` (or your FTP hostname)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

3. **Upload Files**
   - Navigate to `public_html` on the remote side
   - Upload contents of `out/` folder to `public_html`

---

## 🔄 Updating Your Site (When Products Change)

Whenever you add/update products in WordPress:

### Quick Update Process

```bash
# 1. Pull latest code (if working with team)
git pull

# 2. Rebuild with fresh WordPress data
npm run export

# 3. Upload the new `out/` folder to Namecheap
# Use cPanel File Manager or FTP (same as initial deployment)
```

### Automated Rebuild (Optional)

Create a rebuild script for easier updates:

**File: `scripts/rebuild-and-zip.sh`**
```bash
#!/bin/bash

echo "🔨 Building static site with WordPress data..."
npm run export

echo "📦 Creating deployment package..."
cd out
zip -r ../gaaka-deployment-$(date +%Y%m%d-%H%M%S).zip .
cd ..

echo "✅ Deployment package ready!"
echo "📁 Upload this file via cPanel: gaaka-deployment-*.zip"
echo "   Then extract it in public_html"
```

Make it executable:
```bash
chmod +x scripts/rebuild-and-zip.sh
```

Run it:
```bash
./scripts/rebuild-and-zip.sh
```

Then upload and extract the zip file in cPanel (faster than uploading individual files).

---

## 📝 .htaccess Configuration

Create this file in `public_html/.htaccess` for better routing:

```apache
# Redirect HTTP to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L,QSA]

# Remove trailing slash from directories (optional)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]

# Custom 404 page
ErrorDocument 404 /404.html

# Caching for better performance
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 day"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>
```

---

## 🔍 Troubleshooting

### Images Not Loading

**Problem:** WordPress images show broken links

**Solution:**
1. Check CORS is enabled in WordPress
2. Add to `wp-config.php`:
```php
define('GRAPHQL_CORS_ENABLED', true);
define('GRAPHQL_CORS_ALLOWED_ORIGINS', 'https://gaaka.com');
```

### 404 Errors on Page Refresh

**Problem:** Pages work from navigation but 404 on direct access/refresh

**Solution:** 
1. Ensure `.htaccess` is uploaded (see above)
2. Check Next.js config has `trailingSlash: true`

### Build Fails

**Problem:** `npm run export` shows errors

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next out
npm run export
```

### Slow Upload Times

**Solution:**
1. Use zip method (see "Automated Rebuild" above)
2. Use FTP instead of cPanel File Manager
3. Delete old files before uploading new ones

---

## 📊 Performance Optimization

### 1. Enable Cloudflare (Free CDN)

1. Sign up at cloudflare.com
2. Add your domain
3. Update nameservers at Namecheap to Cloudflare's
4. Enable Auto Minify (JS, CSS, HTML)
5. Enable Brotli compression

### 2. Optimize Images Before Build

```bash
# Install image optimization tool
npm install -g sharp-cli

# Optimize images (run before build)
sharp -i public/images/*.jpg -o public/images/ --quality 85
```

### 3. Monitor Bandwidth

Stellar Plus has bandwidth limits. Monitor in cPanel:
- cPanel → Metrics → Bandwidth

---

## 🔐 Security Best Practices

1. **Keep WordPress Secure**
   - Update WordPress, plugins regularly
   - Use strong admin password
   - Install Wordfence security plugin

2. **Protect cPanel**
   - Enable 2FA in cPanel
   - Use strong FTP passwords
   - Restrict FTP access to specific IPs (if possible)

3. **SSL Certificate**
   - Namecheap provides free SSL
   - Enable in cPanel → SSL/TLS Status

---

## 📈 Maintenance Schedule

### Daily
- Monitor site uptime (use uptimerobot.com free tier)

### When Adding Products
- Rebuild and redeploy (10-15 minutes)

### Weekly
- Check WordPress for updates
- Review site analytics

### Monthly
- Review bandwidth usage in cPanel
- Check for broken links
- Update dependencies: `npm update`

---

## 🆘 Common Issues

### "Build succeeds but products don't show"

Check:
```bash
# Test WordPress connection
node scripts/test-wordpress.js

# If products show in test, rebuild:
npm run export
```

### "Upload stops midway"

- Use FTP instead of cPanel (more reliable)
- Upload in smaller batches
- Check disk space in cPanel

### "Site shows old content"

Clear caches:
1. Browser cache (Ctrl+Shift+R)
2. Cloudflare cache (if using)
3. cPanel → File Manager → Delete `out/` contents, re-upload

---

## 📞 Support Resources

- **Namecheap Support:** https://www.namecheap.com/support/
- **cPanel Documentation:** https://docs.cpanel.net/
- **Next.js Static Export:** https://nextjs.org/docs/app/building-your-application/deploying/static-exports

---

## ✅ Deployment Checklist

**Pre-Deployment:**
- [ ] WordPress has products with images
- [ ] Categories created in WordPress
- [ ] Environment variables set locally
- [ ] Test build runs successfully
- [ ] All pages tested locally

**First Deployment:**
- [ ] Build static site (`npm run export`)
- [ ] Clear `public_html` in cPanel
- [ ] Upload `out/` contents to `public_html`
- [ ] Create `.htaccess` file
- [ ] Test all pages on live site
- [ ] Check mobile responsiveness
- [ ] Test all links and forms

**Post-Deployment:**
- [ ] Enable SSL in cPanel
- [ ] Set up Cloudflare (optional)
- [ ] Configure Google Analytics
- [ ] Test checkout flow
- [ ] Submit sitemap to Google Search Console

---

**Need Help?** If you encounter issues, check:
1. Terminal errors during build
2. Browser console errors on live site
3. cPanel error logs (Metrics → Errors)
