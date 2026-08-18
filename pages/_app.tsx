import '../src/app/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { LanguageProvider } from '../src/lib/i18n'
import { CartProvider } from '../src/contexts/CartContext'
import Cart from '../src/components/cart/Cart'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <CartProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Language" content="en, de" />
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