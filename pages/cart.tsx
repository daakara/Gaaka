import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Loader2, ArrowLeft, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'
import { useCart } from '../src/contexts/CartContext'
import {
  getCart,
  updateCartItemQuantity,
  removeFromCart,
  getCheckoutUrl,
  type WooCommerceCart,
} from '../src/lib/woocommerce/cart-service'

export default function CartPage() {
  const { t } = useLanguage()
  const { state: localCart, removeItem: removeLocalItem, updateQuantity: updateLocalQuantity } = useCart()
  const [cart, setCart] = useState<WooCommerceCart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadCart()
  }, [])

  async function loadCart() {
    setLoading(true)
    try {
      const result = await getCart()
      if (result.success && result.cart && result.cart.items.length > 0) {
        setCart(result.cart)
        setError(null)
      } else {
        // Fallback to local cart context smoothly without raw error banner
        setCart(null)
        setError(null)
      }
    } catch {
      setCart(null)
      setError(null)
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

  const hasLocalItems = localCart && localCart.items && localCart.items.length > 0
  const hasWooItems = cart && cart.items && cart.items.length > 0
  const isCartEmpty = !hasWooItems && !hasLocalItems

  const subtotal = hasWooItems 
    ? parseFloat(cart.totals.total_price) 
    : localCart.total

  const itemsCount = hasWooItems 
    ? cart.items_count 
    : localCart.itemCount

  return (
    <>
      <Head>
        <title>{t('shoppingCart')} - Handcrafted African Baskets | GAAKA</title>
        <meta name="description" content="Review your selected handwoven African baskets and proceed to checkout." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
        <link rel="canonical" href="https://gaaka.com/cart" />
      </Head>

      <Header />

      <main id="main-content" className="min-h-screen bg-[#faf8f5]">
        <div className="container-custom py-12">
          <div className="mb-8">
            <Link href="/collections/all">
              <a className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold text-sm transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Exploring Collections
              </a>
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
            Shopping Cart ({itemsCount})
          </h1>

          {loading && !hasLocalItems ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary-700" />
            </div>
          ) : isCartEmpty ? (
            <div className="bg-white rounded-3xl border border-amber-100 shadow-sm p-12 text-center max-w-lg mx-auto">
              <ShoppingBag className="w-16 h-16 mx-auto text-amber-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6 text-sm">Discover our fair-trade Kenyan storage and decor baskets to get started.</p>
              <Link href="/collections/all">
                <a className="btn-primary inline-flex items-center gap-2">
                  <span>Browse Collections</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-3xl border border-amber-100/80 shadow-sm overflow-hidden divide-y divide-gray-100">
                  {hasWooItems ? (
                    cart.items.map((item) => {
                      const isUpdating = updatingItems.has(item.key)
                      const itemImage = item.images[0]?.src || '/images/placeholder.png'

                      return (
                        <div key={item.key} className={`p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between ${isUpdating ? 'opacity-50' : ''}`}>
                          <div className="flex gap-4 items-center">
                            <div className="relative w-20 h-20 flex-shrink-0 bg-amber-50 rounded-2xl overflow-hidden border border-amber-100">
                              <Image
                                src={itemImage}
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-base text-gray-900">{item.name}</h3>
                              <p className="text-primary-700 font-bold text-sm">€{parseFloat(item.price).toFixed(2)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                              <button
                                onClick={() => handleUpdateQuantity(item.key, item.quantity - 1)}
                                disabled={isUpdating || item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.key, item.quantity + 1)}
                                disabled={isUpdating}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.key)}
                              disabled={isUpdating}
                              className="text-gray-400 hover:text-red-600 transition-colors p-2"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    localCart.items.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <div className="relative w-20 h-20 flex-shrink-0 bg-amber-50 rounded-2xl overflow-hidden border border-amber-100">
                            <Image
                              src={item.image || '/images/placeholder.png'}
                              alt={item.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-base text-gray-900">{item.name}</h3>
                            {item.color && (
                              <p className="text-xs text-gray-500 font-medium">Color: {item.color}</p>
                            )}
                            <p className="text-primary-700 font-bold text-sm mt-0.5">€{item.price.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                            <button
                              onClick={() => updateLocalQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white disabled:opacity-40 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateLocalQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeLocalItem(item.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Summary Card */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl border border-amber-100/80 shadow-sm p-6 space-y-6 sticky top-28">
                  <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({itemsCount} items)</span>
                      <span className="font-semibold text-gray-900">€{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold text-gray-900">
                        Calculated at checkout
                      </span>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-900">
                      <span>Subtotal (incl. VAT)</span>
                      <span className="text-xl text-primary-700">
                        €{subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full btn-primary py-4 text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    type="button"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="space-y-2 pt-2 border-t border-gray-100 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Encrypted SSL 256-bit Secure Checkout</span>
                    </div>
                  </div>
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
