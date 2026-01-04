import React, { useEffect } from 'react'
import Head from 'next/head'
import { Loader2 } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { getCheckoutUrl } from '../src/lib/woocommerce/cart-service'

export default function CheckoutPage() {
  useEffect(() => {
    // Redirect to WooCommerce checkout
    window.location.href = getCheckoutUrl()
  }, [])

  return (
    <>
      <Head>
        <title>Checkout - GAAKA</title>
        <meta name="description" content="Complete your purchase of handwoven African baskets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
        <meta name="robots" content="noindex" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">
            Redirecting to Secure Checkout...
          </h1>
          <p className="text-gray-500">
            You will be redirected to our secure checkout page in a moment
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
