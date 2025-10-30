import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, Check, Sparkles, Eye, ShoppingBag } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'
import { useCart } from '../../contexts/CartContext'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  badge?: 'best-seller' | 'limited-edition' | 'sold-out' | 'on-sale'
  colors: string[]
}



const getBadgeStyles = (badge: Product['badge']) => {
  switch (badge) {
    case 'best-seller':
      return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
    case 'limited-edition':
      return 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
    case 'sold-out':
      return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    case 'on-sale':
      return 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
    default:
      return ''
  }
}

export default function ProductGrid() {
  const { t } = useLanguage()
  const { addItem } = useCart()

  const products: Product[] = [
    {
      id: 'taya-storage-basket',
      name: t('tayaStorageBasket'),
      price: 119,
      image: 'https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-34copy_800x.jpg',
      rating: 4.8,
      reviewCount: 124,
      badge: 'best-seller',
      colors: ['Natural', 'Brown', 'Black']
    },
    {
      id: 'wanjiru-storage-basket',
      name: t('wanjiruStorageBasket'),
      price: 119,
      image: 'https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-35copy_800x.jpg',
      rating: 4.9,
      reviewCount: 89,
      badge: 'best-seller',
      colors: ['Natural', 'Red', 'Blue']
    },
    {
      id: 'ndeye-storage-basket',
      name: t('ndeyeStorageBasket'),
      price: 119,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
      rating: 4.7,
      reviewCount: 156,
      badge: 'best-seller',
      colors: ['Natural', 'Green', 'Yellow']
    },
    {
      id: 'fanta-basket',
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
      id: 'yata-storage-basket',
      name: t('mangeyStorageBasket'),
      price: 49,
      originalPrice: 65,
      image: 'https://expeditionsubsahara.com/cdn/shop/products/ES_Trays_10_6_3896_800x.jpg',
      rating: 4.7,
      reviewCount: 78,
      badge: 'on-sale',
      colors: ['Natural', 'Brown', 'Green']
    },
    {
      id: 'hadiza-storage-basket',
      name: t('hadizaStorageBasket'),
      price: 119,
      image: 'https://images.unsplash.com/photo-1558618047-3c0c6424d253?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
      rating: 4.8,
      reviewCount: 45,
      badge: 'limited-edition',
      colors: ['Natural', 'Blue', 'White']
    }
  ]

  const getBadgeText = (badge: Product['badge']) => {
    switch (badge) {
      case 'best-seller':
        return t('bestSeller')
      case 'limited-edition':
        return t('limitedEdition')
      case 'sold-out':
        return t('soldOut')
      case 'on-sale':
        return t('onSale')
      default:
        return ''
    }
  }

  return (
    <section className="relative section-padding bg-gradient-to-br from-amber-25 via-white to-orange-25 overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-60 right-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-400 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Artistic Section Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="absolute -top-6 -left-6 text-5xl opacity-15 font-bold text-amber-600">🧺</div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
              <span className="block text-gray-900 mb-2">artisan</span>
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-black">
                masterpieces
              </span>
            </h2>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            <p className="text-xl text-gray-700 italic font-light">
              each basket tells a unique story
            </p>
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="border-l-4 border-amber-400 pl-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('basketsDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Artistic Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <div key={product.id} className="group relative">
              {/* Artistic Card Container */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-amber-100">
                
                {/* Artistic Product Image */}
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Artistic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Creative Badge */}
                  {product.badge && (
                    <div className={`absolute top-4 left-4 px-3 py-2 rounded-full text-xs font-bold shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300 ${getBadgeStyles(product.badge)}`}>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {getBadgeText(product.badge)}
                      </div>
                    </div>
                  )}
                  
                  {/* Artistic Wishlist Button */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 hover:fill-current transition-all duration-300" />
                  </button>
                  
                  {/* Creative Quick View Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Link href={`/products/${product.id}`}>
                        <a className="bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-white transition-all duration-300 shadow-lg flex items-center gap-2 group">
                          <Eye className="w-4 h-4" />
                          {t('quickView')}
                        </a>
                      </Link>
                    </div>
                  </div>

                  {/* Artisan Story Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">Handcrafted</p>
                        <p className="text-xs text-gray-600">in Kenya</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Artistic Product Info */}
                <div className="p-8">
                  <div className="mb-6">
                    <Link href={`/products/${product.id}`}>
                      <a>
                        <h3 className="font-bold text-xl text-gray-900 hover:text-amber-600 transition-colors duration-300 mb-3 leading-tight">
                          {product.name}
                        </h3>
                      </a>
                    </Link>
                    
                    {/* Artistic Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? 'text-amber-400 fill-current'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">({product.reviewCount} reviews)</span>
                    </div>
                    
                    {/* Artistic Colors */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2 font-medium">Available Colors:</p>
                      <div className="flex items-center gap-2">
                        {product.colors.slice(0, 3).map((color, colorIndex) => (
                          <div 
                            key={colorIndex}
                            className="relative group/color"
                          >
                            <div 
                              className="w-6 h-6 rounded-full border-2 border-gray-200 hover:border-amber-400 cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-sm"
                              style={{ 
                                backgroundColor: color === 'Natural' ? '#D2B48C' : 
                                  color === 'Brown' ? '#8B4513' :
                                  color === 'Black' ? '#000000' :
                                  color === 'Red' ? '#DC2626' :
                                  color === 'Blue' ? '#2563EB' :
                                  color === 'Green' ? '#16A34A' :
                                  color === 'Yellow' ? '#EAB308' :
                                  color === 'White' ? '#FFFFFF' : '#9CA3AF'
                              }}
                            />
                            <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                              {color}
                            </span>
                          </div>
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-gray-500 font-medium ml-1">+{product.colors.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Artistic Price and CTA */}
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-black text-gray-900">
                        €{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          €{product.originalPrice}
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                          SAVE €{product.originalPrice - product.price}
                        </span>
                      )}
                    </div>
                    
                    {/* Artistic Add to Cart Button */}
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
                      className={`w-full py-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1 shadow-lg hover:shadow-xl ${
                        product.badge === 'sold-out'
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-orange-600 hover:to-red-600'
                      }`}
                      disabled={product.badge === 'sold-out'}
                    >
                      {product.badge === 'sold-out' ? (
                        <>
                          <span>✕</span>
                          {t('soldOut')}
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-5 h-5" />
                          {t('addToCart')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className={`absolute -z-10 ${
                index % 4 === 0 ? '-top-4 -left-4 w-24 h-24 bg-amber-200' :
                index % 4 === 1 ? '-top-4 -right-4 w-28 h-28 bg-orange-200' :
                index % 4 === 2 ? '-bottom-4 -left-4 w-20 h-20 bg-red-200' :
                '-bottom-4 -right-4 w-32 h-32 bg-pink-200'
              } rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
        
        {/* Artistic View All Button */}
        <div className="text-center mt-16">
          <Link href="/collections/all">
            <a className="group relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 inline-flex items-center">
              <span className="relative z-10 flex items-center">
                <Sparkles className="mr-3 w-6 h-6 group-hover:animate-spin" />
                {t('viewAllProducts')}
                <Sparkles className="ml-3 w-6 h-6 group-hover:animate-spin" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
          </Link>
          
          {/* Artistic subtitle */}
          <p className="mt-6 text-gray-600 italic font-light">
            Discover our complete collection of handcrafted treasures
          </p>
        </div>
      </div>
    </section>
  )
}