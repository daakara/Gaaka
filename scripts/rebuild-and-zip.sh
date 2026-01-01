#!/bin/bash

# GAAKA Static Site Rebuild Script
# Rebuilds the site with fresh WordPress data and creates a deployment package

set -e  # Exit on error

echo "═══════════════════════════════════════════════════"
echo "🏗️  GAAKA Static Site Builder"
echo "═══════════════════════════════════════════════════"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Test WordPress connection
echo -e "${BLUE}📡 Testing WordPress connection...${NC}"
if node scripts/test-wordpress.js > /dev/null 2>&1; then
    echo -e "${GREEN}✓ WordPress connected${NC}"
else
    echo -e "${YELLOW}⚠ WordPress connection issue (build will continue with fallback)${NC}"
fi
echo ""

# Step 2: Clean previous build
echo -e "${BLUE}🧹 Cleaning previous build...${NC}"
rm -rf .next out
echo -e "${GREEN}✓ Clean complete${NC}"
echo ""

# Step 3: Build static site
echo -e "${BLUE}🔨 Building static site with WordPress data...${NC}"
echo "   This may take 2-5 minutes..."
npm run export

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful!${NC}"
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi
echo ""

# Step 4: Create deployment package
echo -e "${BLUE}📦 Creating deployment package...${NC}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
ZIPFILE="gaaka-deployment-${TIMESTAMP}.zip"

cd out
zip -r -q "../${ZIPFILE}" .
cd ..

echo -e "${GREEN}✓ Deployment package created: ${ZIPFILE}${NC}"
echo ""

# Step 5: Show summary
echo "═══════════════════════════════════════════════════"
echo -e "${GREEN}✅ BUILD COMPLETE!${NC}"
echo "═══════════════════════════════════════════════════"
echo ""
echo "📁 Files ready in: ./out/"
echo "📦 Deployment zip: ./${ZIPFILE}"
echo ""
echo "📤 NEXT STEPS:"
echo "   1. Log into cPanel: https://cpanel.namecheap.com"
echo "   2. Go to File Manager → public_html"
echo "   3. Upload ${ZIPFILE}"
echo "   4. Right-click → Extract"
echo "   5. Delete the zip file"
echo "   6. Visit https://gaaka.com to verify"
echo ""
echo "💡 TIP: For faster uploads, use FTP instead of File Manager"
echo ""
