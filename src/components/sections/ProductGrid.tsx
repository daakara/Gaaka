import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'

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
      return 'bg-accent-500 text-white'
    case 'limited-edition':
      return 'bg-primary-500 text-white'
    case 'sold-out':
      return 'bg-gray-500 text-white'
    case 'on-sale':
      return 'bg-red-500 text-white'
    default:
      return ''
  }
}

export default function ProductGrid() {
  const { t } = useLanguage()

  const products: Product[] = [
    {
      id: 'taya-storage-basket',
      name: t('tayaStorageBasket'),
      price: 119,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80',
      rating: 4.8,
      reviewCount: 124,
      badge: 'best-seller',
      colors: ['Natural', 'Brown', 'Black']
    },
    {
      id: 'wanjiru-storage-basket',
      name: t('wanjiruStorageBasket'),
      price: 119,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
      id: 'faaiza-basket-set',
      name: t('faaizaBasket'),
      price: 249,
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
      rating: 4.6,
      reviewCount: 67,
      badge: 'sold-out',
      colors: ['Natural', 'Multi']
    },
    {
      id: 'natty-storage-basket',
      name: t('nattyStorageBasket'),
      price: 119,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
      id: 'mangey-storage-basket',
      name: t('mangeyStorageBasket'),
      price: 179,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
            {t('wovenLaundryBaskets')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('basketsDescription')}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card group">
              {/* Product Image */}
              <div className="relative overflow-hidden aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${getBadgeStyles(product.badge)}`}>
                    {getBadgeText(product.badge)}
                  </div>
                )}
                
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
              <div className="p-6">
                <div className="mb-3">
                  <Link href={`/products/${product.id}`}>
                    <a>
                      <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-300 mb-2">
                        {product.name}
                      </h3>
                    </a>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
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
                    <span className="text-sm text-gray-600">({product.reviewCount})</span>
                  </div>
                  
                  {/* Colors */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-600">{t('colors')}:</span>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div 
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
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
                      {product.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      €{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        €{product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                      product.badge === 'sold-out'
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                    disabled={product.badge === 'sold-out'}
                  >
                    {product.badge === 'sold-out' ? t('soldOut') : t('addToCart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/collections/all">
            <a className="btn-outline">
              {t('viewAllProducts')}
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}