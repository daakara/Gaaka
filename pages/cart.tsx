import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useCart } from '../src/contexts/CartContext'
import { useLanguage } from '../src/lib/i18n'

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()
  const { t } = useLanguage()

  const shippingCost = state.total >= 200 ? 0 : 16.90
  const totalWithShipping = state.total + shippingCost

  return (
    <>
      <Head>
        <title>{t('shoppingCart')} - GAAKA</title>
        <meta name="description" content="Review your selected handwoven African baskets and proceed to checkout." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white py-8 border-b">
          <div className="container-custom">
            <div className="flex items-center gap-4">
              <Link href="/collections/all">
                <a className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  {t('continueShopping')}
                </a>
              </Link>
              <div className="text-gray-300">|</div>
              <h1 className="text-2xl font-heading font-bold text-gray-900">
                {t('shoppingCart')} ({state.itemCount} items)
              </h1>
            </div>
          </div>
        </section>

        {/* Cart Content */}
        <section className="section-padding">
          <div className="container-custom">
            {state.items.length === 0 ? (
              // Empty Cart
              <div className="text-center py-16">
                <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t('emptyCart')}
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {t('emptyCartDescription')}
                </p>
                <Link href="/collections/all">
                  <a className="btn-primary">
                    {t('continueShopping')}
                  </a>
                </Link>
              </div>
            ) : (
              // Cart with Items
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Cart Items ({state.itemCount})
                      </h2>
                      <button
                        onClick={clearCart}
                        className="text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-6">
                      {state.items.map((item) => (
                        <div key={`${item.id}-${item.color}`} className="flex gap-4 p-4 border border-gray-100 rounded-xl">
                          {/* Product Image */}
                          <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            {item.color && (
                              <p className="text-sm text-gray-600 mb-2">
                                {t('color')}: {item.color}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {/* Quantity Controls */}
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-2 hover:bg-gray-50 transition-colors"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2 hover:bg-gray-50 transition-colors"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>

                                {/* Remove Button */}
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <div className="font-semibold text-gray-900">
                                  €{(item.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  €{item.price} each
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl p-6 sticky top-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Order Summary
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>{t('subtotal')}</span>
                        <span>€{state.total.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>
                          {shippingCost === 0 ? (
                            <span className="text-green-600 font-medium">Free</span>
                          ) : (
                            `€${shippingCost.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      {state.total < 200 && (
                        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                          Add €{(200 - state.total).toFixed(2)} more for free shipping!
                        </div>
                      )}

                      <hr className="border-gray-200" />

                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total</span>
                        <span>€{totalWithShipping.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Link href="/checkout">
                      <a className="w-full btn-primary py-4 text-center block mb-4">
                        {t('proceedToCheckout')}
                      </a>
                    </Link>

                    {/* Continue Shopping */}
                    <Link href="/collections/all">
                      <a className="w-full btn-outline py-3 text-center block">
                        {t('continueShopping')}
                      </a>
                    </Link>

                    {/* Security Badges */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-3">Secure Checkout</p>
                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                          <span>🔒 SSL</span>
                          <span>•</span>
                          <span>256-bit encryption</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}