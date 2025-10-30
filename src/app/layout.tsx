import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GAAKA - Handcrafted Kenyan Storage Baskets',
  description: 'Discover beautiful handwoven Kenyan storage baskets that combine modern design with traditional craftsmanship. Ethically sourced and artisan-made.',
  keywords: ['handcrafted baskets', 'Kenyan baskets', 'storage solutions', 'home decor', 'artisan made', 'sustainable'],
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
    title: 'GAAKA - Handcrafted Kenyan Storage Baskets',
    description: 'Modern design meets traditional craftsmanship. Discover our collection of handwoven Kenyan storage baskets.',
    url: 'https://gaaka.com',
    siteName: 'GAAKA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GAAKA Handcrafted Kenyan Baskets',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GAAKA - Handcrafted Kenyan Storage Baskets',
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
        <link rel="icon" href="/images/GAAKA.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/GAAKA.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/GAAKA.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/GAAKA.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ee7724" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  )
}