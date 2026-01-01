import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'
import { Star, Heart, Check, Sparkles, Eye, ShoppingBag, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { fetchGraphQL } from '../../src/lib/wordpress/client'
import { GET_ALL_PRODUCT_SLUGS, GET_PRODUCT_BY_SLUG } from '../../src/lib/wordpress/queries'
import { transformProduct } from '../../src/lib/wordpress/utils'
import { Product } from '../../src/lib/wordpress/types'
import { useLanguage } from '../../src/lib/i18n'
import { useCart } from '../../src/contexts/CartContext'
import Header from '../../src/components/layout/Header'
import Footer from '../../src/components/layout/Footer'

interface ProductPageProps {
  product: Product
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const { t } = useLanguage()
  const { addItem } = useCart()

  if (!product) {
    return (
      <div>
        <Header />
        <main className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/">
            <a className="text-amber-600 hover:underline mt-4 inline-block">Go back home</a>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <main className="bg-gray-50">
        <div className="container-custom py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <Link href="/"><a className="hover:text-amber-600">Home</a></Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/collections/all"><a className="hover:text-amber-600">Products</a></Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-medium text-gray-800">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={product.image ?? '/images/placeholder.png'}
                  alt={product.imageAlt ?? product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {/* Thumbnails could go here */}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating ?? 0)
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-gray-900">€{product.price}</span>
                {product.compareAtPrice && (
                  <span className="text-xl text-gray-400 line-through">€{product.compareAtPrice}</span>
                )}
              </div>

              <div className="prose prose-lg text-gray-700 mb-8" dangerouslySetInnerHTML={{ __html: product.description ?? '' }} />

              {/* Add to Cart */}
              <div className="mt-auto">
                <button
                  onClick={() => {
                    if (product.inStock) {
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image ?? '',
                        color: product.colors?.[0] ?? ''
                      })
                    }
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    !product.inStock
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="w-6 h-6" />
                  {!product.inStock ? t('soldOut') : t('addToCart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchGraphQL(GET_ALL_PRODUCT_SLUGS, {})
  const paths = data.products.nodes.map((product: { slug: string }) => ({
    params: { slug: product.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<ProductPageProps, IParams> = async (context) => {
  const { slug } = context.params!
  
  try {
    const data = await fetchGraphQL(GET_PRODUCT_BY_SLUG, { slug })
    
    if (!data.product) {
      return {
        notFound: true,
      }
    }

    const product = transformProduct(data.product)

    return {
      props: {
        product,
      },
      revalidate: 60, // In seconds
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return {
      notFound: true,
    }
  }
}

export default ProductPage
