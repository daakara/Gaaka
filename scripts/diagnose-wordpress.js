#!/usr/bin/env node

/**
 * WordPress GraphQL Diagnostics
 * Comprehensive test to verify WordPress/WooCommerce GraphQL setup
 */

const https = require('https');

// Configuration
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://www.gaaka.com/dev/graphql';

console.log('\n🔍 GAAKA WordPress GraphQL Diagnostics\n');
console.log('=' .repeat(60));
console.log(`📍 Endpoint: ${WORDPRESS_API_URL}\n`);

/**
 * Execute GraphQL query
 */
function executeQuery(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(WORDPRESS_API_URL);
    const postData = JSON.stringify({ query, variables });

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 404) {
          reject(new Error(`404 Not Found - GraphQL endpoint doesn't exist at ${WORDPRESS_API_URL}`));
          return;
        }

        if (res.statusCode === 500) {
          reject(new Error(`500 Server Error - WordPress/WPGraphQL configuration issue`));
          return;
        }

        try {
          const json = JSON.parse(data);
          if (json.errors) {
            reject(new Error(`GraphQL Error: ${JSON.stringify(json.errors, null, 2)}`));
          } else {
            resolve(json.data);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Run all diagnostic tests
 */
async function runDiagnostics() {
  const tests = [
    {
      name: 'WordPress Site Info',
      query: `
        query {
          generalSettings {
            title
            description
            url
          }
        }
      `,
      check: (data) => {
        console.log('✅ WordPress GraphQL is working!');
        console.log(`   Site: ${data.generalSettings.title}`);
        console.log(`   URL: ${data.generalSettings.url}`);
        return true;
      }
    },
    {
      name: 'WPGraphQL for WooCommerce Plugin',
      query: `
        query {
          products(first: 1) {
            nodes {
              id
              name
            }
          }
        }
      `,
      check: (data) => {
        console.log('✅ WooCommerce GraphQL plugin is installed!');
        if (data.products.nodes.length > 0) {
          console.log(`   Found ${data.products.nodes.length} product(s)`);
        } else {
          console.log('   ⚠️  No products found (add some in WordPress admin)');
        }
        return true;
      }
    },
    {
      name: 'Product Query with Fragments',
      query: `
        fragment ImageFields on MediaItem {
          id
          sourceUrl
          altText
        }

        query GetFeaturedProducts {
          products(first: 6, where: { featured: true }) {
            nodes {
              id
              name
              slug
              type
              ... on SimpleProduct {
                price
                regularPrice
              }
              image {
                ...ImageFields
              }
            }
          }
        }
      `,
      check: (data) => {
        const count = data.products.nodes.length;
        console.log(`✅ Complex product query works!`);
        console.log(`   Featured products: ${count}`);
        if (count === 0) {
          console.log('   💡 Mark some products as "Featured" in WordPress');
        } else {
          console.log(`   Products: ${data.products.nodes.map(p => p.name).join(', ')}`);
        }
        return true;
      }
    },
    {
      name: 'Product Categories',
      query: `
        query {
          productCategories(first: 20) {
            nodes {
              id
              name
              slug
              count
            }
          }
        }
      `,
      check: (data) => {
        const cats = data.productCategories.nodes.filter(c => c.slug !== 'uncategorized');
        console.log(`✅ Product categories available!`);
        console.log(`   Categories: ${cats.length}`);
        if (cats.length > 0) {
          cats.forEach(cat => {
            console.log(`   - ${cat.name} (${cat.count} products)`);
          });
        } else {
          console.log('   💡 Create categories: Storage Baskets, Kitchen & Dining, Wall Baskets');
        }
        return true;
      }
    },
    {
      name: 'Environment Variables',
      query: null,
      check: () => {
        console.log('✅ Checking environment configuration...');
        console.log(`   WORDPRESS_API_URL: ${process.env.WORDPRESS_API_URL || '❌ Not set'}`);
        console.log(`   NEXT_PUBLIC_WORDPRESS_API_URL: ${process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '❌ Not set'}`);
        
        if (!process.env.WORDPRESS_API_URL && !process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
          console.log('   ⚠️  Set these in .env.local');
          return false;
        }
        
        const url = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
        if (!url.startsWith('https://')) {
          console.log('   ⚠️  Warning: Using HTTP instead of HTTPS');
        }
        
        return true;
      }
    }
  ];

  console.log('Running diagnostic tests...\n');

  for (const test of tests) {
    try {
      console.log(`\n📋 Test: ${test.name}`);
      console.log('-'.repeat(60));
      
      if (test.query) {
        const data = await executeQuery(test.query);
        test.check(data);
      } else {
        test.check();
      }
    } catch (error) {
      console.log(`❌ FAILED: ${error.message}`);
      
      if (error.message.includes('404')) {
        console.log('\n🔧 Fix:');
        console.log('   1. Verify WordPress is installed at: https://www.gaaka.com/dev/');
        console.log('   2. Install WPGraphQL plugin');
        console.log('   3. Activate plugin in WordPress admin');
        console.log('   4. Check that /graphql endpoint exists');
      }
      
      if (error.message.includes('products')) {
        console.log('\n🔧 Fix:');
        console.log('   1. Install "WPGraphQL for WooCommerce" plugin');
        console.log('   2. Activate in WordPress → Plugins');
        console.log('   3. Install WooCommerce if not already installed');
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✅ Diagnostics Complete!\n');
  
  console.log('📚 Next Steps:');
  console.log('   1. Add products in WordPress admin');
  console.log('   2. Create categories: Storage Baskets, Kitchen & Dining, Wall Baskets');
  console.log('   3. Mark some products as "Featured"');
  console.log('   4. Run: npm run dev');
  console.log('   5. Visit: http://localhost:3000\n');
}

// Run diagnostics
runDiagnostics().catch((error) => {
  console.error('\n❌ Fatal Error:', error.message);
  process.exit(1);
});
