import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Loader2, ArrowLeft } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'
import {
  getCart,
  updateCartItemQuantity,
  removeFromCart,
  getCheckoutUrl,
  type WooCommerceCart,
} from '../src/lib/woocommerce/cart-service'

export default function CartPage() {
  const { t } = useLanguage()
  const [cart, setCart] = useState<WooCommerceCart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadCart()
  }, [])

  async function loadCart() {
    setLoading(true)
    const result = await getCart()
    if (result.success && result.cart) {
      setCart(result.cart)
      setError(null)
    } else {
      setError(result.error || 'Failed to load cart')
    }
    setLoading(false)
  }

  async function handleUpdateQuantity(itemKey: string, newQuantity: number) {
    if (newQuantity < 1) return

    setUpdatingItems(prev => new Set(prev).add(itemKey))
    const result = await updateCartItemQuantity(itemKey, newQuantity)
    
    if (result.success && result.cart) {
      setCart(result.cart)
    } else {
      setError(result.error || 'Failed to update quantity')
    }
    
    setUpdatingItems(prev => {
      const next = new Set(prev)
      next.delete(itemKey)
      return next
    })
  }

  async function handleRemoveItem(itemKey: string) {
    setUpdatingItems(prev => new Set(prev).add(itemKey))
    const result = await removeFromCart(itemKey)
    
    if (result.success && result.cart) {
      setCart(result.cart)
    } else {
      setError(result.error || 'Failed to remove item')
    }
    
    setUpdatingItems(prev => {
      const next = new Set(prev)
      next.delete(itemKey)
      return next
    })
  }

  const handleCheckout = () => {
    window.location.href = getCheckoutUrl()
  }

  const isCartEmpty = !cart || cart.items_count === 0

  return (
    <>
      <Head>
        <title>{t('shoppingCart')} - GAAKA</title>
        <meta name="description" content="Review your selected handwoven African baskets and proceed to checkout." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Link href="/collections/all">
              <a className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </a>
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={loadCart}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : isCartEmpty ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Add some beautiful handwoven baskets to get started!</p>
              <Link href="/collections/all">
                <a className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium">
                  Browse Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {cart.items.map((item) => {
                      const isUpdating = updatingItems.has(item.key)
                      const itemImage = item.images[0]?.src || '/images/placeholder.jpg'

                      return (
                        <div key={item.key} className={`p-6 ${isUpdating ? 'opacity-50' : ''}`}>
                          <div className="flex gap-6">
                            <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={itemImage}
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                              <p className="text-amber-600 font-medium">€{parseFloat(item.price).toFixed(2)}</p>

                              <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <button
                                    onClick={() => handleUpdateQuantity(item.key, item.quantity - 1)}
                                    disabled={isUpdating || item.quantity <= 1}
                                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item.key, item.quantity + 1)}
                                    disabled={isUpdating}
                                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => handleRemoveItem(item.key)}
                                  disabled={isUpdating}
                                  className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="font-semibold text-lg">
                                €{parseFloat(item.totals.line_total).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.items_count} items)</span>
                      <span>€{parseFloat(cart.totals.total_items).toFixed(2)}</span>
                    </div>

                    {parseFloat(cart.totals.total_discount) > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-€{parseFloat(cart.totals.total_discount).toFixed(2)}</span>
                      </div>
                    )}

                    {cart.needs_shipping && (
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>
                          {parseFloat(cart.totals.total_shipping) > 0
                            ? `€${parseFloat(cart.totals.total_shipping).toFixed(2)}`
                            : 'Calculated at checkout'}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>€{parseFloat(cart.totals.total_tax).toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-amber-600">
                          €{parseFloat(cart.totals.total_price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-amber-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    Secure checkout powered by WooCommerce
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
