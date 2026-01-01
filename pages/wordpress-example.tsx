// Example page showing how to fetch and display products from WordPress
// This demonstrates the WordPress integration in action

import { GetStaticProps } from 'next'
import Head from 'next/head'
import { fetchGraphQL } from '../src/lib/wordpress/client'
import { GET_FEATURED_PRODUCTS } from '../src/lib/wordpress/queries'
import { ProductsResponse } from '../src/lib/wordpress/types'
import { transformProduct } from '../src/lib/wordpress/utils'
import type { Product } from '../src/lib/wordpress/types'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useCart } from '../src/contexts/CartContext'
import { useLanguage } from '../src/lib/i18n'

interface Props {
  products: Product[]
  error?: string
}

export default function WordPressExample({ products, error }: Props) {
  const { addItem } = useCart()
  const { t } = useLanguage()

  if (error) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Error Loading Products</h1>
            <p className="text-gray-600">{error}</p>
            <p className="mt-4 text-sm text-gray-500">
              Make sure WordPress is configured and WORDPRESS_API_URL is set in .env.local
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>WordPress Products - GAAKA</title>
        <meta name="description" content="Products fetched from WordPress/WooCommerce CMS" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Products from WordPress
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              These products are dynamically fetched from WordPress using WPGraphQL. 
              {products.length > 0 
                ? ` Showing ${products.length} product${products.length > 1 ? 's' : ''}.`
                : ' No products found.'}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                No Products Found
              </h2>
              <p className="text-gray-600 mb-8">
                Add some products in your WordPress admin to see them here.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/graphql', '/wp-admin')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Go to WordPress Admin
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-80 bg-gray-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.imageAlt || product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.badge === 'best-seller' ? 'bg-red-500 text-white' :
                          product.badge === 'limited-edition' ? 'bg-purple-500 text-white' :
                          product.badge === 'on-sale' ? 'bg-green-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {product.badge === 'best-seller' && 'Best Seller'}
                          {product.badge === 'limited-edition' && 'Limited Edition'}
                          {product.badge === 'on-sale' && 'On Sale'}
                          {product.badge === 'sold-out' && 'Sold Out'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>

                    {product.category && (
                      <p className="text-sm text-gray-500 mb-3">
                        {product.category.name}
                      </p>
                    )}

                    {product.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.excerpt}
                      </p>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-orange-600">
                        €{product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-gray-500 line-through">
                          €{product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-600">
                      {product.dimensions && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {product.dimensions.height}×{product.dimensions.width}×{product.dimensions.depth}cm
                        </span>
                      )}
                      {product.weight && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {product.weight}kg
                        </span>
                      )}
                      {product.colors && product.colors.length > 0 && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {product.colors.length} colors
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addItem({
                        id: product.databaseId.toString(),
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      })}
                      disabled={!product.inStock}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        product.inStock
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? t('addToCart') : 'Out of Stock'}
                    </button>

                    {/* Stock indicator */}
                    {product.inStock && product.stockQuantity && product.stockQuantity < 5 && (
                      <p className="text-xs text-orange-600 mt-2 text-center">
                        Only {product.stockQuantity} left in stock!
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-white border-t border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">How This Works</h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">✅ Data Source</h3>
                <p className="text-sm">
                  Products are fetched from WordPress using the WPGraphQL API. 
                  This page uses Static Site Generation (SSG) with Incremental Static Regeneration (ISR).
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🔄 Revalidation</h3>
                <p className="text-sm">
                  The page automatically revalidates every 60 seconds, ensuring product data 
                  stays fresh without requiring a full rebuild.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📦 WooCommerce</h3>
                <p className="text-sm">
                  Manage products, inventory, pricing, and categories through the familiar 
                  WooCommerce interface in WordPress.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚡ Performance</h3>
                <p className="text-sm">
                  GraphQL queries only request needed fields. Images are optimized through 
                  Next.js Image component with automatic WebP conversion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

// Fetch products at build time with revalidation
export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const data = await fetchGraphQL<ProductsResponse>(GET_FEATURED_PRODUCTS, {
      first: 12
    })

    if (!data || !data.products?.nodes) {
      return {
        props: {
          products: [],
          error: 'No products found. Make sure products exist in WordPress and are published.'
        },
        revalidate: 60,
      }
    }

    const products = data.products.nodes.map(transformProduct)

    return {
      props: {
        products,
      },
      revalidate: 60, // Revalidate every 60 seconds
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    
    return {
      props: {
        products: [],
        error: error instanceof Error 
          ? error.message 
          : 'Failed to fetch products from WordPress. Check your configuration.'
      },
      revalidate: 60,
    }
  }
}
