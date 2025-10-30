export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    image?: string
    type?: string
  }
  twitter?: {
    title?: string
    description?: string
    image?: string
  }
  structuredData?: any
}

export function generateSEOConfig({
  title,
  description,
  keywords = [],
  canonical,
  openGraph,
  twitter,
  structuredData
}: SEOConfig) {
  const baseTitle = 'GAAKA - Handcrafted African Storage Baskets'
  const fullTitle = title === baseTitle ? title : `${title} | ${baseTitle}`
  
  const defaultKeywords = [
    'handcrafted baskets',
    'african baskets',
    'storage solutions',
    'home decor',
    'artisan made',
    'sustainable',
    'fair trade',
    'woven baskets',
    'traditional craftsmanship',
    'germany',
    'berlin'
  ]

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords].join(', '),
    canonical: canonical || 'https://gaaka.com',
    openGraph: {
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || description,
      image: openGraph?.image || '/og-image.jpg',
      type: openGraph?.type || 'website',
      url: canonical || 'https://gaaka.com',
      siteName: 'GAAKA'
    },
    twitter: {
      card: 'summary_large_image',
      title: twitter?.title || fullTitle,
      description: twitter?.description || description,
      image: twitter?.image || '/twitter-image.jpg'
    },
    structuredData
  }
}

// SEO configurations for different pages
export const homeSEO = generateSEOConfig({
  title: 'GAAKA - Handcrafted African Storage Baskets',
  description: 'Discover beautiful handwoven African storage baskets that combine modern design with traditional craftsmanship. Ethically sourced, fair trade certified, and artisan-made in Germany.',
  keywords: [
    'handwoven storage baskets',
    'african home decor',
    'sustainable home organization',
    'fair trade baskets germany',
    'traditional african crafts'
  ],
  canonical: 'https://gaaka.com'
})

export const productsSEO = generateSEOConfig({
  title: 'Handwoven Storage Baskets Collection',
  description: 'Shop our complete collection of handcrafted African storage baskets. Premium quality, ethically sourced, and perfect for modern homes. Free shipping in Germany.',
  keywords: [
    'storage basket collection',
    'handwoven laundry baskets',
    'african basket shop',
    'premium storage solutions',
    'artisan baskets germany'
  ],
  canonical: 'https://gaaka.com/collections'
})

export const aboutSEO = generateSEOConfig({
  title: 'About GAAKA - Our Mission & Artisan Stories',
  description: 'Learn about GAAKA\'s mission to support African artisans through fair trade. Discover how we empower communities while preserving traditional craftsmanship.',
  keywords: [
    'fair trade mission',
    'african artisan support',
    'sustainable craftsmanship',
    'community empowerment',
    'traditional weaving techniques'
  ],
  canonical: 'https://gaaka.com/about'
})

// German market specific SEO
export const germanSEO = {
  hreflang: [
    { lang: 'de-DE', url: 'https://gaaka.com/de' },
    { lang: 'en-US', url: 'https://gaaka.com/en' },
    { lang: 'x-default', url: 'https://gaaka.com' }
  ],
  geoTargeting: {
    country: 'DE',
    region: 'Berlin',
    language: 'de'
  }
}