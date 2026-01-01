# 🚀 Quick Deploy to Namecheap

## One-Command Deployment

```bash
./scripts/rebuild-and-zip.sh
```

This will:
1. ✅ Test WordPress connection
2. ✅ Build static site with your products
3. ✅ Create `gaaka-deployment-YYYYMMDD-HHMMSS.zip`

## Upload to Namecheap

### Method 1: cPanel File Manager (Easy)

1. **Login:** https://cpanel.namecheap.com
2. **Open:** File Manager → `public_html`
3. **Upload:** The `.zip` file created above
4. **Extract:** Right-click zip → Extract
5. **Clean:** Delete the zip file
6. **Visit:** https://gaaka.com ✨

### Method 2: FTP (Faster for large sites)

1. **Get FTP from cPanel:** FTP Accounts section
2. **Connect:** Use FileZilla
   - Host: `ftp.gaaka.com`
   - Username: Your FTP user
   - Password: From cPanel
3. **Upload:** Contents of `out/` folder to `public_html`

## When to Redeploy

Rebuild and upload whenever you:
- ✏️ Add new products in WordPress
- 📝 Update product details
- 🖼️ Change product images
- 🏷️ Modify categories

**Estimated time:** 5-10 minutes for complete rebuild + upload

## Troubleshooting

**Build fails?**
```bash
rm -rf .next out
npm install
./scripts/rebuild-and-zip.sh
```

**Products not showing?**
```bash
# Test WordPress first
node scripts/test-wordpress.js

# Then rebuild
./scripts/rebuild-and-zip.sh
```

**Upload stuck?**
- Use FTP instead of File Manager
- Or upload in smaller batches

## Full Documentation

See [NAMECHEAP_DEPLOYMENT.md](NAMECHEAP_DEPLOYMENT.md) for:
- Detailed cPanel instructions
- .htaccess configuration
- Performance optimization
- Security best practices
- Complete troubleshooting guide
