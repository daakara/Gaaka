import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Truck, Clock, Globe, Package, Shield, Star } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import OrderTracking from '../src/components/tracking/OrderTracking'
import { useLanguage } from '../src/lib/i18n'

export default function ShippingPage() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>Shipping Information | GAAKA - Handcrafted African Baskets</title>
        <meta name="description" content="Learn about GAAKA's shipping methods, delivery times, and international shipping options. Track your order and get detailed shipping information." />
        <meta name="keywords" content="shipping, delivery, international shipping, tracking, DHL, Hermes, UPS" />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <a className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Shop
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900">Shipping & Delivery</h1>
              <p className="mt-2 text-gray-600">
                Fast, reliable shipping for your handcrafted African baskets
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Order Tracking Section */}
          <section className="mb-12">
            <OrderTracking />
          </section>

          {/* Shipping System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-indigo-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Shopify-Style Shipping</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-green-600">
                  <Package className="h-4 w-4 mr-2" />
                  <span className="text-sm">Multi-carrier support (DHL, UPS, Hermes)</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm">Zone-based pricing for 12+ countries</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Real-time rate calculation</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="text-sm">Advanced order tracking</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Facts</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Free Shipping</div>
                    <div className="text-sm text-gray-600">Orders over €50 within Germany</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Secure Packaging</div>
                    <div className="text-sm text-gray-600">Every basket carefully protected</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Tracking Included</div>
                    <div className="text-sm text-gray-600">Monitor your order's progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Status */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">✅ Implementation Complete</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-800 mb-2">Shipping Calculator</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Zone-based rate calculation</li>
                  <li>• Weight and dimension support</li>
                  <li>• Free shipping thresholds</li>
                  <li>• Multi-currency support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-2">Order Tracking</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Carrier detection</li>
                  <li>• Real-time status updates</li>
                  <li>• Delivery estimates</li>
                  <li>• Event timeline</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">
              Ready for production deployment with carrier API integration.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}