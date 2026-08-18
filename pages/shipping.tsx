import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Truck, Clock, Globe, Package, Shield } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function ShippingPage() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('shippingDelivery')} | GAAKA</title>
        <meta name="description" content="Learn about GAAKA's shipping methods, delivery times, and international shipping options. Track your order and get detailed shipping information." />
        <meta name="keywords" content="shipping, delivery, international shipping, tracking, DHL, Hermes, UPS" />
        <link rel="canonical" href="https://gaaka.com/shipping" />
      </Head>

      <Header />
      
      <main id="main-content" className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <a className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    {t('backToShop')}
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900">{t('shippingDelivery')}</h1>
              <p className="mt-2 text-gray-600">
                {t('shippingDeliveryDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Order Tracking */}
          <section className="mb-12 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('trackYourOrder')}</h2>
            <p className="text-gray-600 mb-4">
              {t('trackYourOrderDesc')}
            </p>
            <Link href="https://www.gaaka.com/dev/my-account/orders/">
              <a className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                {t('viewMyOrders')}
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </a>
            </Link>
          </section>

          {/* Shipping System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-indigo-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">{t('shippingSystemOverview')}</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-green-600">
                  <Package className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('multiCarrierSupport')}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('zonePricing')}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('realtimeRate')}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t('advancedTracking')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('quickFacts')}</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{t('freeShippingLabel')}</div>
                    <div className="text-sm text-gray-600">{t('freeShippingGermanyDesc')}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{t('securePackaging')}</div>
                    <div className="text-sm text-gray-600">{t('securePackagingDesc')}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{t('trackingIncluded')}</div>
                    <div className="text-sm text-gray-600">{t('trackingIncludedDesc')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}