import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Lock, CreditCard, Smartphone, AlertCircle, CheckCircle } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useCart } from '../src/contexts/CartContext'
import { useLanguage } from '../src/lib/i18n'
import { useCheckout } from '../src/hooks/useCheckout'

export default function CheckoutPage() {
  const { state } = useCart()
  const { t } = useLanguage()
  
  // Use production-ready checkout hook
  const {
    formData,
    errors,
    isProcessing,
    isValid,
    step,
    pricing,
    updateFormData,
    processPayment,
    getAvailablePaymentMethods
  } = useCheckout()
  
  const [paymentMethod, setPaymentMethod] = useState('card')

  // Use calculated pricing from checkout hook
  const { subtotal, shipping, tax, total } = pricing

  // Payment methods matching the reference site
  const paymentMethods = [
    { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
    { id: 'paypal', label: 'PayPal', icon: '/icons/paypal.svg' },
    { id: 'apple_pay', label: 'Apple Pay', icon: '/icons/apple-pay.svg' },
    { id: 'google_pay', label: 'Google Pay', icon: '/icons/google-pay.svg' },
    { id: 'klarna', label: 'Klarna - Pay later', icon: '/icons/klarna.svg' },
    { id: 'shop_pay', label: 'Shop Pay', icon: '/icons/shop-pay.svg' }
  ]

  const supportedCards = [
    { name: 'Visa', icon: '/icons/visa.svg' },
    { name: 'Mastercard', icon: '/icons/mastercard.svg' },
    { name: 'American Express', icon: '/icons/amex.svg' },
    { name: 'Maestro', icon: '/icons/maestro.svg' },
    { name: 'Union Pay', icon: '/icons/unionpay.svg' }
  ]

  if (state.items.length === 0) {
    return (
      <>
        <Head>
          <title>Checkout - GAAKA</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">No items to checkout</h1>
            <Link href="/collections/all">
              <a className="btn-primary">Continue Shopping</a>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Secure Checkout - GAAKA</title>
        <meta name="description" content="Complete your order of handwoven African baskets with our secure checkout process." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white py-6 border-b">
          <div className="container-custom">
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <a className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Cart
                </a>
              </Link>
              <div className="text-gray-300">|</div>
              <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-2">
                <Lock className="h-6 w-6 text-green-600" />
                Secure Checkout
              </h1>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Checkout Form */}
              <div className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="newsletter" className="text-sm text-gray-600">
                        Subscribe to our newsletter for updates and exclusive offers
                      </label>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Street address"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>Germany</option>
                          <option>Austria</option>
                          <option>Switzerland</option>
                          <option>Netherlands</option>
                          <option>Belgium</option>
                          <option>France</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                          <option>Canada</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                  
                  {/* Payment Options */}
                  <div className="space-y-3 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-medium text-gray-900">{method.label}</span>
                        </div>
                        <div className={`w-5 h-5 border-2 rounded-full ${
                          paymentMethod === method.id
                            ? 'border-primary-600 bg-primary-600'
                            : 'border-gray-300'
                        }`}>
                          {paymentMethod === method.id && (
                            <div className="w-full h-full bg-white rounded-full scale-50"></div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 border-t border-gray-200 pt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      
                      {/* Supported Cards */}
                      <div className="flex items-center gap-2 pt-3">
                        <span className="text-sm text-gray-600">We accept:</span>
                        <div className="flex gap-2">
                          {supportedCards.map((card) => (
                            <div key={card.name} className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                              {card.name.substring(0, 2).toUpperCase()}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Express Checkout Buttons */}
                  {paymentMethod !== 'card' && (
                    <div className="border-t border-gray-200 pt-6">
                      <button className={`w-full py-4 rounded-xl font-medium text-white transition-colors ${
                        paymentMethod === 'paypal' ? 'bg-blue-600 hover:bg-blue-700' :
                        paymentMethod === 'apple_pay' ? 'bg-black hover:bg-gray-800' :
                        paymentMethod === 'google_pay' ? 'bg-gray-800 hover:bg-gray-900' :
                        paymentMethod === 'klarna' ? 'bg-pink-500 hover:bg-pink-600' :
                        'bg-purple-600 hover:bg-purple-700'
                      }`}>
                        Continue with {paymentMethods.find(m => m.id === paymentMethod)?.label}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-4">
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {state.items.map((item) => (
                      <div key={`${item.id}-${item.color}`} className="flex gap-3">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                          {item.color && (
                            <p className="text-xs text-gray-600">{item.color}</p>
                          )}
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 border-t border-gray-200 pt-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>€{state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600 font-medium">Free</span>
                        ) : (
                          `€${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {tax > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span>€{tax.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-semibold text-gray-900 border-t border-gray-200 pt-3">
                      <span>Total</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Complete Order Button */}
                  <button 
                    className="w-full btn-primary py-4 mt-6 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={processPayment}
                    disabled={!isValid || isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Complete Order - €${total.toFixed(2)}`}
                  </button>

                  {/* Security & Trust Indicators */}
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span>Your payment information is secure</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Protected by 256-bit SSL encryption
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}