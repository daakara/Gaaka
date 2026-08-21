import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Product } from '../../lib/wordpress/types'
import { useCart } from '../../contexts/CartContext'

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [mounted, setMounted] = useState(false)
  const { addItem, toggleCart } = useCart()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!mounted) return null

  const handleAddToCart = () => {
    if (!product) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    onClose()
    toggleCart()
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && product && (
        <div 
          className="fixed inset-0 z-[9999] overflow-y-auto" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="quick-view-title"
        >
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            <motion.div 
              className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl sm:my-8 sm:w-full sm:max-w-3xl border border-amber-100 z-10"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 15 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
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

                    <div className="flex items-baseline gap-2 mt-2 mb-4">
                      <span className="text-2xl font-black text-primary-800">€{product.price.toFixed(2)}</span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-gray-400 line-through">€{product.compareAtPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {product.description || 'Authentic handmade Kenyan basket woven from natural sisal and sweetgrass fibers by female artisan collectives.'}
                    </p>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 mb-6 text-center">
                      <div className="flex flex-col items-center">
                        <ShieldCheck className="w-4 h-4 text-primary-700 mb-1" />
                        <span className="text-[11px] font-bold text-gray-800">Fair Trade</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Truck className="w-4 h-4 text-primary-700 mb-1" />
                        <span className="text-[11px] font-bold text-gray-800">Fast Shipping</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <RefreshCw className="w-4 h-4 text-primary-700 mb-1" />
                        <span className="text-[11px] font-bold text-gray-800">30-Day Returns</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      type="button"
                      onClick={handleAddToCart}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary py-3.5 text-center font-bold flex items-center justify-center gap-2 shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart - €{product.price.toFixed(2)}</span>
                    </motion.button>

                    <Link href={`/products/${product.slug}`}>
                      <a 
                        className="w-full py-2.5 text-center text-xs font-bold text-gray-600 hover:text-primary-700 transition-colors flex items-center justify-center gap-1.5"
                        onClick={onClose}
                      >
                        <span>View Full Product Details & Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
