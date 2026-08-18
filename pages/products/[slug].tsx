import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import Image from 'next/image'
import { Star, Heart, Eye, ShoppingBag, ChevronRight, ShieldCheck, Truck, RefreshCw, Sparkles, Check, Info } from 'lucide-react'
import Link from 'next/link'

import { fetchGraphQL } from '../../src/lib/wordpress/client'
import { GET_ALL_PRODUCT_SLUGS, GET_PRODUCT_BY_SLUG } from '../../src/lib/wordpress/queries'
import { transformProduct } from '../../src/lib/wordpress/utils'
import { Product } from '../../src/lib/wordpress/types'
import { useLanguage } from '../../src/lib/i18n'
import { useCart } from '../../src/contexts/CartContext'
import Header from '../../src/components/layout/Header'
import Footer from '../../src/components/layout/Footer'
import ProductGrid from '../../src/components/sections/ProductGrid'
import { ALL_FALLBACK_PRODUCTS } from '../../src/lib/wordpress/fallbackProducts'
import { generateProductData, generateBreadcrumbData } from '../../src/lib/seo/structured-data'

interface ProductPageProps {
  product: Product
  relatedProducts?: Product[]
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

const ProductPage: NextPage<ProductPageProps> = ({ product, relatedProducts }) => {
  const { t } = useLanguage()
  const { addItem } = useCart()

  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || 'Natural')
  const [quantity, setQuantity] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care' | 'shipping'>('details')
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <div>
        <Header />
        <main id="main-content" className="container-custom py-20 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The basket you are looking for is no longer available.</p>
          <Link href="/collections/all">
            <a className="btn-primary">Browse All Collections</a>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  // Gallery images with fallback
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image ?? '/images/placeholder.png']

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0])

  const handleAddToCart = () => {
    if (!product.inStock) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: activeImage,
      color: selectedColor
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const productSchema = generateProductData({
    id: product.id,
    name: product.name,
    description: product.description || 'Handcrafted luxury African basket ethically woven in Kenya.',
    price: product.price,
    currency: 'EUR',
    image: product.image || 'https://gaaka.com/images/placeholder.png',
    brand: 'GAAKA',
    category: product.category?.name || 'Home Decor & Baskets',
    availability: product.inStock ? 'InStock' : 'OutOfStock',
    condition: 'NewCondition',
    rating: {
      ratingValue: product.rating ?? 5,
      reviewCount: product.reviewCount ?? 1
    },
    slug: product.slug
  })

  const breadcrumbsSchema = generateBreadcrumbData([
    { name: 'Home', url: 'https://gaaka.com' },
    { name: 'Products', url: 'https://gaaka.com/collections/all' },
    { name: product.name, url: `https://gaaka.com/products/${product.slug}` }
  ])

  const related = relatedProducts && relatedProducts.length > 0 
    ? relatedProducts 
    : ALL_FALLBACK_PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 4)

  return (
    <div>
      <Head>
        <title>{product.name} - Handcrafted African Basket | GAAKA</title>
        <meta name="description" content={product.excerpt || product.description?.replace(/<[^>]+>/g, '').slice(0, 155) || `Buy ${product.name} handcrafted African basket. Fair trade and sustainably sourced.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
        <link rel="canonical" href={`https://gaaka.com/products/${product.slug}`} />

        {/* OpenGraph */}
        <meta property="og:title" content={`${product.name} | GAAKA`} />
        <meta property="og:description" content={product.excerpt || `Authentic Kenyan handwoven basket: ${product.name}`} />
        <meta property="og:image" content={product.image || 'https://gaaka.com/images/placeholder.png'} />
        <meta property="og:url" content={`https://gaaka.com/products/${product.slug}`} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="EUR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | GAAKA`} />
        <meta name="twitter:description" content={product.excerpt || `Authentic Kenyan handwoven basket: ${product.name}`} />
        <meta name="twitter:image" content={product.image || 'https://gaaka.com/images/placeholder.png'} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
      </Head>

      <Header />

      <main id="main-content" className="bg-[#faf8f5]">
        <div className="container-custom py-8 sm:py-12">
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumbs" className="flex items-center text-xs sm:text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-1">
            <Link href="/"><a className="hover:text-primary-700 transition-colors font-medium">Home</a></Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 shrink-0" />
            <Link href="/collections/all"><a className="hover:text-primary-700 transition-colors font-medium">Collections</a></Link>
            {product.category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 shrink-0" />
                <Link href={`/collections/${product.category.slug}`}>
                  <a className="hover:text-primary-700 transition-colors font-medium">{product.category.name}</a>
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 shrink-0" />
            <span className="font-semibold text-gray-900 truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Product Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-square relative rounded-3xl overflow-hidden bg-white shadow-md border border-amber-100/80 group">
                <Image
                  src={activeImage}
                  alt={product.imageAlt ?? `${product.name} - Handwoven African Basket`}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="transition-transform duration-500 group-hover:scale-105"
                />

                {product.badge && (
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-primary-700 text-white shadow-md">
                    {product.badge.replace('-', ' ')}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2" role="group" aria-label="Product thumbnails">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                        activeImage === img
                          ? 'border-primary-700 ring-2 ring-primary-700/20'
                          : 'border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100'
                      }`}
                      aria-label={`View product image ${idx + 1}`}
                      type="button"
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Purchase & Details (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-primary-700" />
                  <span>Ethically Made in Kenya</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating & Stock */}
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <div 
                    className="flex items-center gap-2"
                    aria-label={`Rating: ${product.rating ?? 5} out of 5 stars based on ${product.reviewCount ?? 0} reviews`}
                  >
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating ?? 5)
                              ? 'text-amber-500 fill-current'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-600">({product.reviewCount ?? 0} reviews)</span>
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    product.inStock 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {product.inStock ? 'In Stock • Ready to Ship' : 'Sold Out'}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-gray-900">
                    €{product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-lg text-gray-400 line-through font-medium">
                      €{product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                  {product.onSale && product.compareAtPrice && (
                    <span className="bg-red-50 text-red-700 text-xs px-2.5 py-1 rounded-md font-bold border border-red-200">
                      Save €{(product.compareAtPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                      Color: <span className="text-primary-700 font-semibold">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2" role="radiogroup" aria-label="Select Color">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                            selectedColor === color
                              ? 'border-primary-700 ring-2 ring-primary-700/30 scale-110'
                              : 'border-transparent hover:scale-105'
                          }`}
                          aria-label={`Select color ${color}`}
                          type="button"
                        >
                          <span 
                            className="w-full h-full rounded-full block border border-black/10 shadow-inner"
                            style={{
                              backgroundColor: color === 'Natural' ? '#D2B48C' : 
                                color === 'Brown' ? '#8B4513' :
                                color === 'Black' ? '#1e1e1e' :
                                color === 'Red' ? '#DC2626' :
                                color === 'Blue' ? '#2563EB' :
                                color === 'Green' ? '#16A34A' :
                                color === 'Yellow' ? '#EAB308' :
                                color === 'White' ? '#FFFFFF' : '#9CA3AF'
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description Preview */}
                <div 
                  className="text-sm text-gray-600 leading-relaxed pt-2"
                  dangerouslySetInnerHTML={{ __html: product.description ?? '' }}
                />

                {/* Quantity & Add to Cart Controls */}
                <div className="space-y-3 pt-4">
                  <div className="flex gap-4 items-stretch">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300 rounded-xl bg-white p-1 shadow-sm">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1 || !product.inStock}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 disabled:opacity-40 transition-colors"
                        aria-label="Decrease quantity"
                        type="button"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={!product.inStock}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 disabled:opacity-40 transition-colors"
                        aria-label="Increase quantity"
                        type="button"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`flex-1 py-4 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${
                        !product.inStock
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'btn-primary'
                      }`}
                      type="button"
                      aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is sold out`}
                    >
                      {!product.inStock ? (
                        <span>{t('soldOut')}</span>
                      ) : isAdded ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-5 h-5" />
                          <span>{t('addToCart')} • €{(product.price * quantity).toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Trust guarantees */}
                  <div className="grid grid-cols-3 gap-2 pt-3 text-center border-t border-gray-200/60">
                    <div className="p-2 bg-white rounded-xl border border-gray-100">
                      <Truck className="w-4 h-4 text-primary-700 mx-auto mb-1" />
                      <p className="text-[11px] font-bold text-gray-800">Tracked Delivery</p>
                      <p className="text-[10px] text-gray-500">Fast & reliable</p>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-gray-100">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                      <p className="text-[11px] font-bold text-gray-800">Fair Trade</p>
                      <p className="text-[10px] text-gray-500">Direct artisan pay</p>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-gray-100">
                      <RefreshCw className="w-4 h-4 text-amber-700 mx-auto mb-1" />
                      <p className="text-[11px] font-bold text-gray-800">30-Day Returns</p>
                      <p className="text-[10px] text-gray-500">Hassle-free guarantee</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs for detailed content */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex border-b border-gray-200 gap-4" role="tablist">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-primary-700 text-primary-700'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                    role="tab"
                    aria-selected={activeTab === 'details'}
                    type="button"
                  >
                    Artisanship
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                      activeTab === 'specs'
                        ? 'border-primary-700 text-primary-700'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                    role="tab"
                    aria-selected={activeTab === 'specs'}
                    type="button"
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                      activeTab === 'care'
                        ? 'border-primary-700 text-primary-700'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                    role="tab"
                    aria-selected={activeTab === 'care'}
                    type="button"
                  >
                    Care Guide
                  </button>
                </div>

                <div className="py-4 text-xs text-gray-600 leading-relaxed">
                  {activeTab === 'details' && (
                    <p>
                      Each basket is exclusively woven by talented female artisans across rural Kenya. Using ancestral techniques passed down across generations, every weave embodies cultural heritage, empowerment, and authentic African craftsmanship.
                    </p>
                  )}
                  {activeTab === 'specs' && (
                    <ul className="space-y-1.5 list-disc pl-4">
                      <li><strong>Materials:</strong> 100% sustainably harvested natural Sisal fibers & sweetgrass</li>
                      <li><strong>Origin:</strong> Handwoven in Machakos & Kitui, Kenya</li>
                      <li><strong>Dye:</strong> Organic vegetable-based dyes</li>
                      <li><strong>Dimensions:</strong> Handcrafted variation approximately ±2cm</li>
                    </ul>
                  )}
                  {activeTab === 'care' && (
                    <p>
                      Keep dry and store in well-ventilated areas. To clean, gently wipe with a damp microfiber cloth and let air dry naturally. Avoid submerging in water or direct prolonged sunlight exposure.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Recommendation */}
          {related.length > 0 && (
            <div className="mt-20 pt-12 border-t border-amber-100">
              <ProductGrid 
                products={related} 
                title="You May Also Love" 
                subtitle="Complementary handcrafted pieces"
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fallbackPaths = ALL_FALLBACK_PRODUCTS.map((p) => ({
    params: { slug: p.slug },
  }))

  try {
    const data = await fetchGraphQL(GET_ALL_PRODUCT_SLUGS, {})
    
    if (!data || !data.products || !data.products.nodes || data.products.nodes.length === 0) {
      return {
        paths: fallbackPaths,
        fallback: 'blocking',
      }
    }
    
    const paths = data.products.nodes.map((product: { slug: string }) => ({
      params: { slug: product.slug },
    }))

    return {
      paths: [...fallbackPaths, ...paths],
      fallback: 'blocking',
    }
  } catch (error) {
    console.warn('Error fetching products for static paths, using fallback paths:', error)
    return {
      paths: fallbackPaths,
      fallback: 'blocking',
    }
  }
}

export const getStaticProps: GetStaticProps<ProductPageProps, IParams> = async (context) => {
  const { slug } = context.params!
  const fallbackProduct = ALL_FALLBACK_PRODUCTS.find((p) => p.slug === slug)

  try {
    const data = await fetchGraphQL(GET_PRODUCT_BY_SLUG, { slug })
    
    if (data?.product) {
      const product = transformProduct(data.product)
      return {
        props: {
          product,
        },
        revalidate: 60,
      }
    }

    if (fallbackProduct) {
      return {
        props: {
          product: fallbackProduct,
        },
        revalidate: 60,
      }
    }

    return {
      notFound: true,
    }
  } catch (error) {
    if (fallbackProduct) {
      return {
        props: {
          product: fallbackProduct,
        },
        revalidate: 60,
      }
    }
    return {
      notFound: true,
    }
  }
}

export default ProductPage
