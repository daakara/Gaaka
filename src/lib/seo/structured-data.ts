export interface StructuredDataProps {
  type: 'Organization' | 'Product' | 'WebSite' | 'BreadcrumbList'
  data: any
}

export function generateStructuredData({ type, data }: StructuredDataProps) {
  const baseContext = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }

  return baseContext
}

export function generateOrganizationData() {
  return generateStructuredData({
    type: 'Organization',
    data: {
      name: 'GAAKA',
      url: 'https://gaaka.com',
      logo: 'https://gaaka.com/images/GAAKA.png',
      description: 'Handcrafted Kenyan storage baskets combining modern design with traditional craftsmanship. Ethically sourced and fair trade certified.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'DE',
        addressLocality: 'Berlin',
        postalCode: '10115',
        streetAddress: 'Muster Straße 123'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+49-30-12345678',
        contactType: 'customer service',
        availableLanguage: ['German', 'English']
      },
      sameAs: [
        'https://facebook.com/gaaka',
        'https://instagram.com/gaaka',
        'https://twitter.com/gaaka'
      ],
      foundingDate: '2023',
      founder: {
        '@type': 'Person',
        name: 'GAAKA Founders'
      },
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '200+'
      },
      knowsAbout: [
        'Handcrafted Baskets',
        'African Craftsmanship',
        'Sustainable Design',
        'Fair Trade',
        'Home Storage Solutions'
      ]
    }
  })
}

export function generateWebSiteData() {
  return generateStructuredData({
    type: 'WebSite',
    data: {
      name: 'GAAKA - Handcrafted African Storage Baskets',
      url: 'https://gaaka.com',
      description: 'Premium handwoven African storage baskets that combine modern design with traditional craftsmanship. Shop ethically sourced home decor.',
      publisher: {
        '@type': 'Organization',
        name: 'GAAKA'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://gaaka.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      },
      inLanguage: ['de-DE', 'en-US']
    }
  })
}

export function generateProductData(product: {
  id: string
  name: string
  description: string
  price: number
  currency: string
  image: string
  brand: string
  category: string
  availability: 'InStock' | 'OutOfStock' | 'PreOrder'
  condition: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition'
  rating?: {
    ratingValue: number
    reviewCount: number
  }
}) {
  return generateStructuredData({
    type: 'Product',
    data: {
      name: product.name,
      description: product.description,
      image: product.image,
      brand: {
        '@type': 'Brand',
        name: product.brand
      },
      category: product.category,
      offers: {
        '@type': 'Offer',
        price: product.price.toString(),
        priceCurrency: product.currency,
        availability: `https://schema.org/${product.availability}`,
        itemCondition: `https://schema.org/${product.condition}`,
        seller: {
          '@type': 'Organization',
          name: 'GAAKA'
        }
      },
      ...(product.rating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating.ratingValue.toString(),
          reviewCount: product.rating.reviewCount.toString(),
          bestRating: '5',
          worstRating: '1'
        }
      }),
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Material',
          value: 'Handwoven Natural Fibers'
        },
        {
          '@type': 'PropertyValue',
          name: 'Origin',
          value: 'Africa'
        },
        {
          '@type': 'PropertyValue',
          name: 'Certification',
          value: 'Fair Trade'
        }
      ]
    }
  })
}

export function generateBreadcrumbData(breadcrumbs: { name: string; url: string }[]) {
  return generateStructuredData({
    type: 'BreadcrumbList',
    data: {
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  })
}