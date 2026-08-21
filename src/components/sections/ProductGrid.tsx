import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'
import { useCart } from '../../contexts/CartContext'
import { Product } from '../../lib/wordpress/types'
import { ALL_FALLBACK_PRODUCTS } from '../../lib/wordpress/fallbackProducts'
import { QuickViewModal } from '../ui/QuickViewModal'
import { Toast, ToastNotification } from '../ui/Toast'

const getBadgeStyles = (badge: Product['badge']) => {
  switch (badge) {
    case 'best-seller':
      return 'bg-amber-600 text-white shadow-sm'
    case 'limited-edition':
      return 'bg-purple-800 text-white shadow-sm'
    case 'sold-out':
      return 'bg-gray-800 text-white shadow-sm'
    case 'on-sale':
      return 'bg-red-700 text-white shadow-sm'
    default:
      return 'bg-primary-700 text-white shadow-sm'
  }
}

interface ProductGridProps {
  products?: Product[]
  isLoading?: boolean
  error?: string | null
  title?: string
  subtitle?: string
}

export default function ProductGrid({
  products: initialProducts,
  isLoading = false,
  title,
  subtitle,
}: ProductGridProps) {
  const { t } = useLanguage()
  const { addItem, toggleCart } = useCart()
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({})
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [toast, setToast] = useState<ToastNotification | null>(null)

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

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? '',
      color: product.colors?.[0] ?? ''
    })
    setAddedIds(prev => ({ ...prev, [product.id]: true }))
    setToast({
      id: product.id,
      title: product.name,
      description: 'Added to your shopping cart',
      image: product.image,
      price: product.price,
      onAction: () => {
        setToast(null)
        toggleCart()
      },
      onClose: () => setToast(null)
    })
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }))
    }, 1800)
    setTimeout(() => {
      setToast(null)
    }, 4500)
  }

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50/50 to-amber-50/30 overflow-hidden border-b border-gray-100 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            {title || 'Artisan Masterpieces'}
          </h2>
          
          <p className="text-lg text-primary-800 font-serif italic mb-3">
            {subtitle || 'Each basket tells a unique story'}
          </p>
          
          <p className="text-base text-gray-600 leading-relaxed">
            {t('basketsDescription')}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            const isAdded = !!addedIds[product.id]

            return (
              <div 
                key={product.id} 
                className="group flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-amber-100/80 overflow-hidden"
              >
                {/* Product Image & Badges */}
                <div className="relative overflow-hidden aspect-square bg-amber-50/50">
                  <Image
                    src={product.image ?? '/images/placeholder.png'}
                    alt={product.imageAlt ?? `${product.name} - Handwoven African Basket`}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${getBadgeStyles(product.badge)}`}>
                      {getBadgeText(product.badge)}
                    </div>
                  )}
                  
                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-white/95 text-gray-900 px-4 py-2.5 rounded-full font-bold text-xs shadow-lg hover:bg-white transition-all transform hover:scale-105 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                      aria-label={`Quick view details of ${product.name}`}
                    >
                      <Eye className="w-4 h-4 text-primary-700" />
                      <span>{t('quickView')}</span>
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <Link href={`/products/${product.slug}`}>
                      <a className="block group-hover:text-primary-700 transition-colors">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-1.5">
                          {product.name}
                        </h3>
                      </a>
                    </Link>
                    
                    {/* Rating */}
                    <div 
                      className="flex items-center gap-2 mb-3"
                      aria-label={`Rating: ${product.rating ?? 5} out of 5 stars based on ${product.reviewCount ?? 0} reviews`}
                    >
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(product.rating ?? 5)
                                ? 'text-amber-500 fill-current'
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
                        <span className="text-xs text-gray-500 mr-1 font-medium">Colors:</span>
                        <div className="flex items-center gap-1" role="group" aria-label="Available colors">
                          {product.colors.slice(0, 4).map((color, colorIndex) => (
                            <span 
                              key={colorIndex}
                              title={color}
                              aria-label={`Color: ${color}`}
                              className="w-4 h-4 rounded-full border border-gray-300 shadow-inner inline-block"
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
                          ))}
                          {product.colors.length > 4 && (
                            <span className="text-xs text-gray-400 font-semibold">+{product.colors.length - 4}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Price & Add to Cart */}
                  <div className="pt-3 border-t border-gray-100 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-gray-900">
                        €{product.price}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-gray-400 line-through font-medium">
                          €{product.compareAtPrice}
                        </span>
                      )}
                      {product.onSale && product.compareAtPrice && (
                        <span className="bg-red-50 text-red-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-red-200">
                          Save €{product.compareAtPrice - product.price}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 hover:scale-[1.01] active:scale-[0.98] ${
                        !product.inStock
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isAdded
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : 'btn-primary'
                      }`}
                      disabled={!product.inStock}
                      aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is sold out`}
                      type="button"
                    >
                      {!product.inStock ? (
                        <span>{t('soldOut')}</span>
                      ) : isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart</span>
                        </>
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
            )
          })}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-14">
          <Link href="/collections/all">
            <a className="btn-primary text-base px-9 py-4 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
              <span>{t('viewAllProducts')}</span>
            </a>
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Toast Notification */}
      {toast && <Toast {...toast} />}
    </section>
  )
}