import '../src/app/globals.css'
import type { AppProps } from 'next/app'
import { LanguageProvider } from '../src/lib/i18n'
import { CartProvider } from '../src/contexts/CartContext'
import Cart from '../src/components/cart/Cart'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <CartProvider>
        <Component {...pageProps} />
        <Cart />
      </CartProvider>
    </LanguageProvider>
  )
}