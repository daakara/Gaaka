import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useLanguage } from '../../lib/i18n'

export default function Cart() {
  const { state, removeItem, updateQuantity, toggleCart } = useCart()
  const { t } = useLanguage()

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

  if (!state.isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="cart-title"
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={toggleCart}
        aria-hidden="true"
      />
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slideInLeft sm:rounded-l-3xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-amber-50/40">
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
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                <a 
                  className="btn-primary"
                  onClick={toggleCart}
                >
                  {t('continueShopping')}
                </a>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.color}`} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center group">
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
                        {t('color')}: <span className="font-medium text-gray-700">{item.color}</span>
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-extrabold text-gray-900 text-sm">
                        €{item.price}
                      </span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-gray-700 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-600"
                          aria-label={`Decrease quantity of ${item.name}`}
                          type="button"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-gray-700 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-600"
                          aria-label={`Increase quantity of ${item.name}`}
                          type="button"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-red-50 rounded-xl transition-colors text-gray-400 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label={`Remove ${item.name} from cart`}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50/80">
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
                <a 
                  className="w-full btn-primary py-4 text-center font-bold flex items-center justify-center gap-2"
                  onClick={toggleCart}
                >
                  <span>{t('proceedToCheckout')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
              
              <Link href="/cart">
                <a 
                  className="w-full btn-outline py-3 text-center text-sm font-semibold block"
                  onClick={toggleCart}
                >
                  {t('viewCart')}
                </a>
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
      </div>
    </div>
  )
}