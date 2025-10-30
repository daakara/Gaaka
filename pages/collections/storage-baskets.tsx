import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ArrowRight } from 'lucide-react'
import Header from '../../src/components/layout/Header'
import Footer from '../../src/components/layout/Footer'
import { useLanguage } from '../../src/lib/i18n'
import { useCart } from '../../src/contexts/CartContext'
import { translations } from '../../src/lib/i18n/translations'

export default function StorageBaskets() {
  const { t } = useLanguage()
  const { addItem } = useCart()

  // Featured storage baskets with more variety
  const storageBaskets = [
    {
      id: 'taya-storage-basket',
      name: t('tayaStorageBasket'),
      price: 119,
      image: 'https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-34copy_800x.jpg',
      rating: 4.8,
      reviewCount: 124,
      colors: ['Natural', 'Brown'],
      badge: 'best-seller'
    },
    {
      id: 'wanjiru-storage-basket',
      name: t('wanjiruStorageBasket'),
      price: 119,
      image: 'https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-35copy_800x.jpg',
      rating: 4.7,
      reviewCount: 98,
      colors: ['Natural', 'Black']
    },
    {
      id: 'astou-storage-basket',
      name: t('astouStorageBasket'),
      price: 249,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
      rating: 4.9,
      reviewCount: 34,
      badge: 'limited-edition',
      colors: ['Natural', 'Black', 'Red']
    },
    {
      id: 'ndeye-storage-basket',
      name: t('ndeyeStorageBasket'),
      price: 119,
      image: 'https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-32copy_800x.jpg',
      rating: 4.6,
      reviewCount: 89,
      colors: ['Natural', 'Brown']
    },
    {
      id: 'faaiza-basket-set',
      name: t('faaizaBasket'),
      price: 89,
      image: 'https://expeditionsubsahara.com/cdn/shop/files/ES_Oct_2023_182_14798bef-6360-42df-80e2-e6c403ca1672_800x.jpg',
      rating: 4.6,
      reviewCount: 67,
      colors: ['Natural', 'Multi']
    },
    {
      id: 'natty-storage-basket',
      name: t('nattyStorageBasket'),
      price: 119,
      image: 'https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-32copy_800x.jpg',
      rating: 4.8,
      reviewCount: 92,
      colors: ['Natural', 'Brown']
    }
  ]

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'best-seller': return t('bestSeller')
      case 'limited-edition': return t('limitedEdition')
      case 'on-sale': return t('onSale')
      case 'sold-out': return t('soldOut')
      default: return ''
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'best-seller': return 'bg-green-100 text-green-800'
      case 'limited-edition': return 'bg-purple-100 text-purple-800'
      case 'on-sale': return 'bg-red-100 text-red-800'
      case 'sold-out': return 'bg-gray-100 text-gray-800'
      default: return ''
    }
  }

  const getColorName = (color: string) => {
    const colorKey = color.toLowerCase() as keyof typeof translations.en
    return (translations.en[colorKey] || color) as string
  }

  return (
    <>
      <Head>
        <title>{t('storageBaskets')} - GAAKA</title>
        <meta name="description" content={t('storageBasketsDescription')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                {t('storageBaskets')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('storageBasketsDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {storageBaskets.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-4">
                    {/* Badge */}
                    {product.badge && (
                      <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.badge)}`}>
                        {getBadgeText(product.badge)}
                      </div>
                    )}
                    
                    {/* Product Image */}
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>
                    
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/products/${product.id}`}>
                        <a className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                          {t('quickView')}
                        </a>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <Link href={`/products/${product.id}`}>
                        <a>
                          <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-300">
                            {product.name}
                          </h3>
                        </a>
                      </Link>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                    
                    {/* Colors */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{t('colors')}:</span>
                      <div className="flex gap-1">
                        {product.colors.map((color) => (
                          <span key={color} className="text-sm text-gray-800">
                            {getColorName(color)}
                          </span>
                        )).slice(0, 2)}
                        {product.colors.length > 2 && (
                          <span className="text-sm text-gray-500">+{product.colors.length - 2}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        €{product.price}
                      </span>
                      <button 
                        onClick={() => {
                          if (product.badge !== 'sold-out') {
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              color: product.colors[0]
                            })
                          }
                        }}
                        disabled={product.badge === 'sold-out'}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                          product.badge === 'sold-out'
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                      >
                        {product.badge === 'sold-out' ? t('soldOut') : t('addToCart')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn-outline">
                Load More Products
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Why Choose Our Storage Baskets?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Each basket is carefully handwoven by skilled artisans using traditional techniques passed down through generations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: t('handwovenByArtisans'),
                  description: 'Every basket is individually crafted by skilled hands'
                },
                {
                  title: t('sustainableMaterials'),
                  description: 'Made from responsibly sourced natural materials'
                },
                {
                  title: t('uniquePatterns'),
                  description: 'Each piece features distinctive traditional patterns'
                },
                {
                  title: t('fairTradeCertified'),
                  description: 'Supporting artisan communities with fair wages'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}