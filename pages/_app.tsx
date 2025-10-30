import '../src/app/globals.css'
import type { AppProps } from 'next/app'
import { LanguageProvider } from '../src/lib/i18n'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  )
}