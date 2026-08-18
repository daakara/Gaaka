import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'
import { useCart } from '../../contexts/CartContext'
import { Product } from '../../lib/wordpress/types'
import { ALL_FALLBACK_PRODUCTS } from '../../lib/wordpress/fallbackProducts'

const getBadgeStyles = (badge: Product['badge']) => {
  switch (badge) {
    case 'best-seller':
      return 'bg-primary-600 text-white'
    case 'limited-edition':
      return 'bg-purple-700 text-white'
    case 'sold-out':
      return 'bg-gray-700 text-white'
    case 'on-sale':
      return 'bg-red-600 text-white'
    default:
      return 'bg-primary-600 text-white'
  }
}

interface ProductGridProps {
  products?: Product[]
  isLoading?: boolean
  error?: string | null
}

export default function ProductGrid({
  products: initialProducts,
  isLoading = false,
}: ProductGridProps) {
  const { t } = useLanguage()
  const { addItem } = useCart()

  const products = initialProducts && initialProducts.length > 0 ? initialProducts : ALL_FALLBACK_PRODUCTS

  if (isLoading && products.length === 0) {
    return (
      <section className="section-padding text-center">
        <h2 className="text-2xl font-bold text-gray-900">Loading our treasures...</h2>
        <p className="text-gray-600 mt-2">Please wait a moment.</p>
      </section>
    )
  }

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
    <section className="section-padding bg-gray-50/60 overflow-hidden border-b border-gray-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Artisan Masterpieces
          </h2>
          
          <p className="text-lg text-primary-700 italic font-medium mb-3">
            Each basket tells a unique story
          </p>
          
          <p className="text-base text-gray-600 leading-relaxed">
            {t('basketsDescription')}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
              {/* Product Image & Badges */}
              <div className="relative overflow-hidden aspect-square bg-gray-100">
                <Image
                  src={product.image ?? '/images/placeholder.png'}
                  alt={product.imageAlt ?? product.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getBadgeStyles(product.badge)}`}>
                    {getBadgeText(product.badge)}
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button 
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <Heart className="h-4 w-4" />
                </button>
                
                {/* Quick View Button */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href={`/products/${product.slug}`}>
                    <a 
                      className="bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm shadow-md hover:bg-amber-50 transition-colors flex items-center gap-2"
                      aria-label={`Quick view ${product.name}`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>{t('quickView')}</span>
                    </a>
                  </Link>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <Link href={`/products/${product.slug}`}>
                    <a>
                      <h3 className="font-bold text-lg text-gray-900 hover:text-primary-700 transition-colors line-clamp-1 mb-2">
                        {product.name}
                      </h3>
                    </a>
                  </Link>
                  
                  {/* Rating */}
                  <div 
                    className="flex items-center gap-2 mb-3"
                    aria-label={`Rating: ${product.rating ?? 5} out of 5 stars based on ${product.reviewCount ?? 0} reviews`}
                  >
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating ?? 5)
                              ? 'text-amber-400 fill-current'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">({product.reviewCount ?? 0})</span>
                  </div>
                  
                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-xs text-gray-500 mr-1">Colors:</span>
                      {product.colors.slice(0, 4).map((color, colorIndex) => (
                        <span 
                          key={colorIndex}
                          title={color}
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-inner inline-block"
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
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-xs text-gray-400">+{product.colors.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Price & Add to Cart */}
                <div className="pt-2 border-t border-gray-100 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-gray-900">
                      €{product.price}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        €{product.compareAtPrice}
                      </span>
                    )}
                    {product.onSale && product.compareAtPrice && (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-md font-bold">
                        Save €{product.compareAtPrice - product.price}
                      </span>
                    )}
                  </div>
                  
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
                    className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      !product.inStock
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
                    }`}
                    disabled={!product.inStock}
                    aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is sold out`}
                  >
                    {!product.inStock ? (
                      <span>{t('soldOut')}</span>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{t('addToCart')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/collections/all">
            <a className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-xl font-semibold text-base shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
              <span>{t('viewAllProducts')}</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}