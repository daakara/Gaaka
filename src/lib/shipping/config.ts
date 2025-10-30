// Shipping zones and methods configuration (Shopify-style)
import { ShippingZone, ShippingMethod, ShippingCarrier } from './types'

// Shipping zones similar to Shopify's zone system
export const SHIPPING_ZONES: ShippingZone[] = [
  {
    id: 'de-domestic',
    name: 'Germany (Domestic)',
    countries: ['DE'],
    enabled: true
  },
  {
    id: 'eu-standard',
    name: 'European Union',
    countries: ['AT', 'BE', 'NL', 'FR', 'IT', 'ES', 'PT', 'LU', 'IE', 'GR', 'FI', 'CY', 'MT'],
    enabled: true
  },
  {
    id: 'eu-extended',
    name: 'Extended Europe',
    countries: ['CH', 'NO', 'DK', 'SE', 'PL', 'CZ', 'HU', 'SK', 'SI', 'HR', 'BG', 'RO', 'LV', 'LT', 'EE'],
    enabled: true
  },
  {
    id: 'worldwide',
    name: 'Rest of World',
    countries: ['*'], // Wildcard for all other countries
    enabled: true
  }
]

// Comprehensive shipping methods similar to major e-commerce platforms
export const SHIPPING_METHODS: ShippingMethod[] = [
  // German Domestic Shipping
  {
    id: 'dhl-standard-de',
    name: 'DHL Standard',
    description: 'Reliable delivery within Germany',
    carrier: 'DHL',
    type: 'standard',
    deliveryTime: { min: 2, max: 4, unit: 'days' },
    price: {
      baseRate: 4.99,
      freeThreshold: 50
    },
    restrictions: {
      maxWeight: 31.5,
      trackingIncluded: true,
      requiresSignature: false
    },
    zones: ['de-domestic'],
    enabled: true,
    icon: '/icons/dhl.svg'
  },
  {
    id: 'dhl-express-de',
    name: 'DHL Express',
    description: 'Next business day delivery',
    carrier: 'DHL',
    type: 'express',
    deliveryTime: { min: 1, max: 2, unit: 'days' },
    price: {
      baseRate: 9.99
    },
    restrictions: {
      maxWeight: 31.5,
      trackingIncluded: true,
      requiresSignature: true
    },
    zones: ['de-domestic'],
    enabled: true,
    icon: '/icons/dhl-express.svg'
  },
  {
    id: 'hermes-standard-de',
    name: 'Hermes Standard',
    description: 'Affordable shipping with Hermes',
    carrier: 'Hermes',
    type: 'standard',
    deliveryTime: { min: 3, max: 5, unit: 'days' },
    price: {
      baseRate: 3.99,
      freeThreshold: 40
    },
    restrictions: {
      maxWeight: 25,
      trackingIncluded: true
    },
    zones: ['de-domestic'],
    enabled: true,
    icon: '/icons/hermes.svg'
  },

  // EU Standard Shipping
  {
    id: 'dhl-eu-standard',
    name: 'DHL EU Standard',
    description: 'Standard delivery across EU',
    carrier: 'DHL',
    type: 'standard',
    deliveryTime: { min: 3, max: 7, unit: 'days' },
    price: {
      baseRate: 12.99,
      weightMultiplier: 2.50,
      freeThreshold: 100
    },
    restrictions: {
      maxWeight: 31.5,
      trackingIncluded: true
    },
    zones: ['eu-standard'],
    enabled: true,
    icon: '/icons/dhl.svg'
  },
  {
    id: 'ups-eu-express',
    name: 'UPS Express',
    description: 'Fast delivery across Europe',
    carrier: 'UPS',
    type: 'express',
    deliveryTime: { min: 2, max: 4, unit: 'days' },
    price: {
      baseRate: 19.99,
      weightMultiplier: 3.00
    },
    restrictions: {
      maxWeight: 70,
      trackingIncluded: true,
      requiresSignature: true
    },
    zones: ['eu-standard', 'eu-extended'],
    enabled: true,
    icon: '/icons/ups.svg'
  },

  // Extended Europe
  {
    id: 'dhl-eu-extended',
    name: 'DHL Europe Plus',
    description: 'Delivery to Switzerland, Norway, etc.',
    carrier: 'DHL',
    type: 'standard',
    deliveryTime: { min: 4, max: 8, unit: 'days' },
    price: {
      baseRate: 16.99,
      weightMultiplier: 3.00,
      freeThreshold: 120
    },
    restrictions: {
      maxWeight: 31.5,
      trackingIncluded: true
    },
    zones: ['eu-extended'],
    enabled: true,
    icon: '/icons/dhl.svg'
  },

  // Worldwide shipping
  {
    id: 'dhl-worldwide',
    name: 'DHL Worldwide',
    description: 'International shipping worldwide',
    carrier: 'DHL',
    type: 'standard',
    deliveryTime: { min: 7, max: 15, unit: 'days' },
    price: {
      baseRate: 25.99,
      weightMultiplier: 4.50
    },
    restrictions: {
      maxWeight: 31.5,
      trackingIncluded: true,
      requiresSignature: true
    },
    zones: ['worldwide'],
    enabled: true,
    icon: '/icons/dhl.svg'
  },
  {
    id: 'ups-worldwide-express',
    name: 'UPS Worldwide Express',
    description: 'Fast international delivery',
    carrier: 'UPS',
    type: 'express',
    deliveryTime: { min: 3, max: 7, unit: 'days' },
    price: {
      baseRate: 45.99,
      weightMultiplier: 6.00
    },
    restrictions: {
      maxWeight: 70,
      trackingIncluded: true,
      requiresSignature: true
    },
    zones: ['worldwide'],
    enabled: true,
    icon: '/icons/ups-express.svg'
  },

  // Economy options
  {
    id: 'deutsche-post-economy',
    name: 'Deutsche Post Economy',
    description: 'Budget-friendly shipping within Germany',
    carrier: 'Deutsche Post',
    type: 'economy',
    deliveryTime: { min: 4, max: 7, unit: 'days' },
    price: {
      baseRate: 2.99,
      freeThreshold: 35
    },
    restrictions: {
      maxWeight: 10,
      trackingIncluded: false
    },
    zones: ['de-domestic'],
    enabled: true,
    icon: '/icons/deutsche-post.svg'
  }
]

// Shipping carriers configuration
export const SHIPPING_CARRIERS: ShippingCarrier[] = [
  {
    id: 'dhl',
    name: 'DHL',
    trackingUrl: 'https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?lang=de&idc=${trackingNumber}',
    supportedServices: ['standard', 'express', 'overnight'],
    apiEndpoint: 'https://api.dhl.com/track/shipments'
  },
  {
    id: 'ups',
    name: 'UPS',
    trackingUrl: 'https://www.ups.com/track?loc=en_DE&tracknum=${trackingNumber}',
    supportedServices: ['standard', 'express', 'overnight'],
    apiEndpoint: 'https://onlinetools.ups.com/track/v1/details'
  },
  {
    id: 'hermes',
    name: 'Hermes',
    trackingUrl: 'https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation/#${trackingNumber}',
    supportedServices: ['standard', 'premium']
  },
  {
    id: 'deutsche-post',
    name: 'Deutsche Post',
    trackingUrl: 'https://www.deutschepost.de/sendung/simpleQuery.html?form.sendungsnummer=${trackingNumber}',
    supportedServices: ['economy', 'standard']
  },
  {
    id: 'fedex',
    name: 'FedEx',
    trackingUrl: 'https://www.fedex.com/fedextrack/?tracknumbers=${trackingNumber}',
    supportedServices: ['express', 'overnight', 'premium'],
    apiEndpoint: 'https://api.fedex.com/track/v1/trackingnumbers'
  }
]

// Country to zone mapping for quick lookup
export const COUNTRY_ZONE_MAP: Record<string, string> = SHIPPING_ZONES.reduce((acc, zone) => {
  zone.countries.forEach(country => {
    if (country !== '*') {
      acc[country] = zone.id
    }
  })
  return acc
}, {} as Record<string, string>)

// Default zone for countries not explicitly mapped
export const DEFAULT_ZONE = 'worldwide'

// Utility function to get zone for country
export const getZoneForCountry = (countryCode: string): string => {
  return COUNTRY_ZONE_MAP[countryCode] || DEFAULT_ZONE
}

// Utility function to get available methods for zone
export const getMethodsForZone = (zoneId: string): ShippingMethod[] => {
  return SHIPPING_METHODS.filter(method => 
    method.enabled && method.zones.includes(zoneId)
  )
}