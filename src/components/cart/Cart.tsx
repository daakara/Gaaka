import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useLanguage } from '../../lib/i18n'

export default function Cart() {
  const { state, removeItem, updateQuantity, toggleCart } = useCart()
  const { t } = useLanguage()

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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
        aria-hidden="true"
      />
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 id="cart-title" className="text-xl font-semibold text-gray-900">
            {t('shoppingCart')} ({state.itemCount})
          </h2>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close shopping cart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('emptyCart')}
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                {t('emptyCartDescription')}
              </p>
              <Link href="/collections/all">
                <a 
                  className="btn-primary inline-block"
                  onClick={toggleCart}
                >
                  {t('continueShopping')}
                </a>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.color}`} className="flex gap-4 items-center">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base">
                      {item.name}
                    </h3>
                    {item.color && (
                      <p className="text-xs text-gray-600">
                        {t('color')}: {item.color}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-gray-900 text-sm">
                        €{item.price}
                      </span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50">
            {/* Subtotal */}
            <div className="flex justify-between text-base font-semibold text-gray-900">
              <span>{t('subtotal')}</span>
              <span>€{state.total.toFixed(2)}</span>
            </div>

            {/* Shipping Note */}
            <p className="text-xs text-gray-500">
              {t('shippingCalculated')}
            </p>

            {/* Checkout Buttons */}
            <div className="space-y-2.5">
              <Link href="/checkout">
                <a 
                  className="w-full btn-primary py-3 text-center block"
                  onClick={toggleCart}
                >
                  {t('proceedToCheckout')}
                </a>
              </Link>
              
              <Link href="/cart">
                <a 
                  className="w-full btn-outline py-3 text-center block"
                  onClick={toggleCart}
                >
                  {t('viewCart')}
                </a>
              </Link>
            </div>

            {/* Continue Shopping */}
            <button
              onClick={toggleCart}
              className="w-full text-xs text-gray-500 hover:text-gray-900 py-1"
            >
              {t('continueShopping')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}