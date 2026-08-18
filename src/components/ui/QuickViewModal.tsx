import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react'
import { Product } from '../../lib/wordpress/types'
import { useCart } from '../../contexts/CartContext'

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem, toggleCart } = useCart()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    onClose()
    toggleCart()
  }

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="quick-view-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-amber-100 animate-scaleUp">
          <button
            onClick={onClose}
            aria-label="Close product preview"
            type="button"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 hover:bg-white hover:text-gray-900 shadow-md backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Column */}
            <div className="relative aspect-square md:aspect-auto bg-amber-50/50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-amber-100">
              <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={product.image || '/images/placeholder.png'}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-primary-800">
                    Handwoven in Kenya
                  </span>
                  <div className="flex items-center text-amber-500 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="ml-1 font-bold text-gray-700">{product.rating ?? 5}.0</span>
                  </div>
                </div>

                <h2 id="quick-view-title" className="text-2xl font-bold text-gray-900 font-serif">
                  {product.name}
                </h2>

                <p className="text-2xl font-extrabold text-primary-700 mt-2 mb-4">
                  €{product.price.toFixed(2)}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {product.description || 'Authentic handwoven Kenyan basket made with 100% sustainably harvested natural Sisal and sweetgrass fibers.'}
                </p>

                {/* Quick Trust badges */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-center mb-6">
                  <div>
                    <ShieldCheck className="w-4 h-4 text-primary-700 mx-auto mb-0.5" />
                    <p className="text-[10px] font-bold text-gray-800">Fair Trade</p>
                  </div>
                  <div>
                    <Truck className="w-4 h-4 text-primary-700 mx-auto mb-0.5" />
                    <p className="text-[10px] font-bold text-gray-800">Tracked</p>
                  </div>
                  <div>
                    <RefreshCw className="w-4 h-4 text-primary-700 mx-auto mb-0.5" />
                    <p className="text-[10px] font-bold text-gray-800">30-Day Return</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-3.5 text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • €{product.price.toFixed(2)}</span>
                </button>

                <Link href={`/products/${product.slug}`}>
                  <a 
                    onClick={onClose}
                    className="w-full py-2.5 text-center text-xs font-semibold text-primary-800 hover:text-primary-900 flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>View Complete Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
