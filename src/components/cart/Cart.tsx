import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCart } from '../../contexts/CartContext'
import { useLanguage } from '../../lib/i18n'

export default function Cart() {
  const [mounted, setMounted] = useState(false)
  const { state, removeItem, updateQuantity, toggleCart } = useCart()
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when cart is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [state.isOpen])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && state.isOpen) {
        toggleCart()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [state.isOpen, toggleCart])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {state.isOpen && (
        <div 
          className="fixed inset-0 z-[9999] overflow-hidden" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="cart-title"
        >
          {/* Overlay */}
          <motion.div 
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={toggleCart}
            aria-hidden="true"
          />
          
          {/* Cart Panel */}
          <motion.div 
            className="fixed right-0 top-0 h-full h-screen w-full max-w-[85vw] sm:max-w-md bg-white shadow-2xl z-[9999] flex flex-col sm:rounded-l-3xl"
            initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-amber-50/40 shrink-0">
              <div>
                <h2 id="cart-title" className="text-xl font-bold text-gray-900">
                  {t('shoppingCart')}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button 
                onClick={toggleCart}
                className="p-2.5 hover:bg-white rounded-xl transition-colors text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 shadow-sm"
                aria-label="Close shopping cart"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 overscroll-contain">
              {state.items.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-amber-100">
                    <ShoppingBag className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {t('emptyCart')}
                  </h3>
                  <p className="text-gray-500 mb-8 text-sm leading-relaxed max-w-xs mx-auto">
                    {t('emptyCartDescription')}
                  </p>
                  <Link href="/collections/all">
                    <motion.a 
                      className="btn-primary cursor-pointer"
                      onClick={toggleCart}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('continueShopping')}
                    </motion.a>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  <AnimatePresence initial={false}>
                    {state.items.map((item) => (
                      <motion.div 
                        key={item.cartId}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.2 }}
                        className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center group"
                      >
                        {/* Product Image */}
                        <div className="relative w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                          <Image
                            src={item.image || '/images/placeholder.png'}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate text-sm">
                            {item.name}
                          </h3>
                          {item.color && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              Color: {item.color}
                            </p>
                          )}
                          <p className="text-sm font-bold text-primary-700 mt-1">
                            €{item.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                className="p-1 text-gray-500 hover:text-gray-800 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                className="p-1 text-gray-500 hover:text-gray-800 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.cartId)}
                              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer with Total and Checkout */}
            {state.items.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50/80 shrink-0 pb-12 sm:pb-6">
                {/* Subtotal */}
                <div className="flex justify-between items-baseline text-base font-bold text-gray-900">
                  <span>{t('subtotal')}</span>
                  <span className="text-xl text-primary-800">€{state.total.toFixed(2)}</span>
                </div>

                {/* Shipping Note */}
                <p className="text-xs text-gray-500">
                  {t('shippingCalculated')}
                </p>

                {/* Checkout Buttons */}
                <div className="space-y-2.5 pt-1">
                  <Link href="/checkout">
                    <motion.a 
                      className="w-full btn-primary py-4 text-center font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                      onClick={toggleCart}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{t('proceedToCheckout')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </Link>
                  
                  <Link href="/cart">
                    <motion.a 
                      className="w-full btn-outline py-3 text-center text-sm font-semibold block cursor-pointer"
                      onClick={toggleCart}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('viewCart')}
                    </motion.a>
                  </Link>
                </div>

                {/* Continue Shopping */}
                <button
                  onClick={toggleCart}
                  className="w-full text-xs text-gray-500 hover:text-gray-900 py-1 underline font-medium transition-colors"
                  type="button"
                >
                  {t('continueShopping')}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}