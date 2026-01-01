#!/usr/bin/env node

/**
 * WordPress GraphQL Connection Test
 * Tests the WordPress API and displays available products
 */

const https = require('https');

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://www.gaaka.com/dev/graphql';

const query = `
  query TestWordPress {
    generalSettings {
      title
      description
      url
    }
    productCategories(first: 10) {
      nodes {
        id
        name
        slug
        count
      }
    }
    products(first: 10) {
      nodes {
        id
        databaseId
        name
        slug
        type
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          stockStatus
        }
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;

function makeRequest(query) {
  return new Promise((resolve, reject) => {
    const url = new URL(WORDPRESS_API_URL);
    const postData = JSON.stringify({ query });

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function testWordPress() {
  console.log('\n🔍 Testing WordPress GraphQL Connection...\n');
  console.log(`📍 Endpoint: ${WORDPRESS_API_URL}\n`);

  try {
    const response = await makeRequest(query);

    if (response.errors) {
      console.error('❌ GraphQL Errors:', JSON.stringify(response.errors, null, 2));
      return;
    }

    const { generalSettings, productCategories, products } = response.data;

    console.log('✅ WordPress Connection Successful!\n');

    // General Settings
    console.log('📝 Site Information:');
    console.log(`   Title: ${generalSettings.title}`);
    console.log(`   Description: ${generalSettings.description}`);
    console.log(`   URL: ${generalSettings.url}\n`);

    // Categories
    console.log('📁 Product Categories:');
    if (productCategories.nodes.length === 0) {
      console.log('   ⚠️  No categories found. Create categories in WordPress:\n');
      console.log('   - Storage Baskets');
      console.log('   - Kitchen & Dining');
      console.log('   - Wall Baskets\n');
    } else {
      productCategories.nodes.forEach(cat => {
        console.log(`   - ${cat.name} (${cat.count} products)`);
      });
      console.log('');
    }

    // Products
    console.log('🛍️  Products:');
    if (products.nodes.length === 0) {
      console.log('   ⚠️  No products found.\n');
      console.log('   📌 Next Steps:');
      console.log('   1. Log into WordPress admin: https://www.gaaka.com/wp-admin');
      console.log('   2. Go to Products → Add New');
      console.log('   3. Add a test product with:');
      console.log('      - Title (e.g., "Woven Storage Basket")');
      console.log('      - Price');
      console.log('      - Image');
      console.log('      - Category');
      console.log('      - Stock status: "In stock"');
      console.log('   4. Publish the product');
      console.log('   5. Run this script again\n');
    } else {
      products.nodes.forEach(product => {
        console.log(`\n   📦 ${product.name}`);
        console.log(`      ID: ${product.databaseId}`);
        console.log(`      Slug: ${product.slug}`);
        console.log(`      Type: ${product.type}`);
        if (product.price) {
          console.log(`      Price: ${product.price}`);
          console.log(`      Stock: ${product.stockStatus}`);
        }
        if (product.image) {
          console.log(`      Image: ✅ ${product.image.sourceUrl.substring(0, 50)}...`);
        } else {
          console.log(`      Image: ⚠️  No image set`);
        }
      });
      console.log('');
    }

    console.log('✅ WordPress is ready for integration!\n');

  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Verify WordPress is accessible at https://www.gaaka.com');
    console.error('   2. Check WPGraphQL plugin is activated');
    console.error('   3. Check WPGraphQL for WooCommerce plugin is activated');
    console.error('   4. Verify CORS settings allow requests from your domain\n');
    process.exit(1);
  }
}

testWordPress();
