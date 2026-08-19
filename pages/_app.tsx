import { useEffect } from 'react'
import '../src/app/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { LanguageProvider } from '../src/lib/i18n'
import { CartProvider } from '../src/contexts/CartContext'
import Cart from '../src/components/cart/Cart'

export default function App({ Component, pageProps }: AppProps) {
  // Proactively flush stale service workers and legacy caches
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            // Delete old caches to ensure latest UX is loaded
            caches.delete(name)
          })
        })
      }
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister()
          }
        })
      }
    }
  }, [])

  return (
    <LanguageProvider>
      <CartProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Language" content="en, de" />
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
          <meta name="theme-color" content="#d97706" />
          <link rel="alternate" hrefLang="en" href="https://gaaka.com" />
          <link rel="alternate" hrefLang="de" href="https://gaaka.com" />
          <link rel="alternate" hrefLang="x-default" href="https://gaaka.com" />
        </Head>
        <Component {...pageProps} />
        <Cart />
      </CartProvider>
    </LanguageProvider>
  )
}