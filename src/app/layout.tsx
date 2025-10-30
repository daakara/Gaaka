import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GAAKA - Handcrafted African Storage Baskets',
  description: 'Discover beautiful handwoven African storage baskets that combine modern design with traditional craftsmanship. Ethically sourced and artisan-made.',
  keywords: ['handcrafted baskets', 'African baskets', 'storage solutions', 'home decor', 'artisan made', 'sustainable'],
  authors: [{ name: 'GAAKA Team' }],
  creator: 'GAAKA',
  publisher: 'GAAKA',
  metadataBase: new URL('https://gaaka.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'GAAKA - Handcrafted African Storage Baskets',
    description: 'Modern design meets traditional craftsmanship. Discover our collection of handwoven African storage baskets.',
    url: 'https://gaaka.com',
    siteName: 'GAAKA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GAAKA Handcrafted African Baskets',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GAAKA - Handcrafted African Storage Baskets',
    description: 'Modern design meets traditional craftsmanship',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ee7724" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  )
}