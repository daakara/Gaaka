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
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleCart}
      />
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('shoppingCart')} ({state.itemCount})
            </h2>
            <button 
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
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
                <p className="text-gray-600 mb-6">
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
              <div className="space-y-6">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
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
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      {item.color && (
                        <p className="text-sm text-gray-600">
                          {t('color')}: {item.color}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-gray-900">
                          €{item.price}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {state.items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between text-lg font-semibold">
                <span>{t('subtotal')}</span>
                <span>€{state.total.toFixed(2)}</span>
              </div>

              {/* Shipping Note */}
              <p className="text-sm text-gray-600">
                {t('shippingCalculated')}
              </p>

              {/* Checkout Buttons */}
              <div className="space-y-3">
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
                className="w-full text-sm text-gray-600 hover:text-gray-900 py-2"
              >
                {t('continueShopping')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}