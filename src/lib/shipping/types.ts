// Shopify-style shipping types and interfaces
export interface ShippingZone {
  id: string
  name: string
  countries: string[]
  regions?: string[]
  enabled: boolean
}

export interface ShippingMethod {
  id: string
  name: string
  description?: string
  carrier: string
  type: 'standard' | 'express' | 'overnight' | 'economy' | 'premium'
  deliveryTime: {
    min: number
    max: number
    unit: 'days' | 'hours'
  }
  price: {
    baseRate: number
    weightMultiplier?: number
    freeThreshold?: number
  }
  restrictions?: {
    maxWeight?: number
    maxDimensions?: {
      length: number
      width: number
      height: number
    }
    requiresSignature?: boolean
    trackingIncluded: boolean
  }
  zones: string[]
  enabled: boolean
  icon?: string
}

export interface ShippingRate {
  methodId: string
  name: string
  description: string
  price: number
  currency: string
  deliveryTime: string
  carrier: string
  trackingIncluded: boolean
  estimatedDelivery: Date
}

export interface ShippingCalculationInput {
  items: Array<{
    id: string
    quantity: number
    weight: number
    dimensions?: {
      length: number
      width: number
      height: number
    }
    price: number
  }>
  destination: {
    country: string
    postalCode: string
    state?: string
    city?: string
  }
  currency: 'EUR' | 'USD' | 'GBP'
}

export interface ShippingCalculationResult {
  success: boolean
  rates: ShippingRate[]
  errors?: string[]
  totalWeight: number
  totalValue: number
}

export interface ShippingCarrier {
  id: string
  name: string
  trackingUrl: string
  supportedServices: string[]
  apiEndpoint?: string
  credentials?: {
    apiKey?: string
    accountId?: string
  }
}

export interface TrackingInfo {
  trackingNumber: string
  carrier: string
  status: 'pending' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception'
  events: TrackingEvent[]
  estimatedDelivery?: Date
  actualDelivery?: Date
}

export interface TrackingEvent {
  timestamp: Date
  status: string
  location?: string
  description: string
}