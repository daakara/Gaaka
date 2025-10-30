// Payment configuration and types
export interface PaymentMethod {
  id: string
  name: string
  type: 'card' | 'wallet' | 'bnpl' | 'bank'
  icon?: string
  enabled: boolean
  testMode: boolean
  config?: Record<string, any>
}

export interface PaymentConfig {
  currency: 'EUR'
  locale: 'de-DE' | 'en-US'
  methods: PaymentMethod[]
  stripe?: {
    publishableKey: string
    merchantId?: string
  }
  paypal?: {
    clientId: string
    currency: string
  }
}

// Production-ready payment configuration
export const PAYMENT_CONFIG: PaymentConfig = {
  currency: 'EUR',
  locale: 'de-DE',
  methods: [
    {
      id: 'card',
      name: 'Credit / Debit Card',
      type: 'card',
      enabled: true,
      testMode: process.env.NODE_ENV !== 'production',
      config: {
        supportedCards: ['visa', 'mastercard', 'amex', 'maestro']
      }
    },
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'wallet',
      enabled: true,
      testMode: process.env.NODE_ENV !== 'production'
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      type: 'wallet',
      enabled: typeof window !== 'undefined' && 'ApplePaySession' in window,
      testMode: process.env.NODE_ENV !== 'production'
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      type: 'wallet',
      enabled: true,
      testMode: process.env.NODE_ENV !== 'production'
    },
    {
      id: 'klarna',
      name: 'Klarna',
      type: 'bnpl',
      enabled: true,
      testMode: process.env.NODE_ENV !== 'production'
    }
  ],
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
    merchantId: 'GAAKA_MERCHANT'
  },
  paypal: {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test_client_id',
    currency: 'EUR'
  }
}

// Shipping calculation
export const calculateShipping = (total: number, country: string): number => {
  if (total >= 200) return 0 // Free shipping over €200
  
  const shippingRates: Record<string, number> = {
    'DE': 4.90,     // Germany
    'AT': 6.90,     // Austria
    'CH': 9.90,     // Switzerland
    'NL': 7.90,     // Netherlands
    'BE': 7.90,     // Belgium
    'FR': 8.90,     // France
    'IT': 8.90,     // Italy
    'ES': 8.90,     // Spain
    'GB': 12.90,    // UK
    'US': 19.90,    // United States
    'CA': 19.90,    // Canada
    'default': 16.90 // Default EU
  }
  
  return shippingRates[country] || shippingRates.default
}

// Tax calculation (simplified - real implementation would use tax services)
export const calculateTax = (subtotal: number, country: string): number => {
  const taxRates: Record<string, number> = {
    'DE': 0.19,     // 19% VAT Germany
    'AT': 0.20,     // 20% VAT Austria
    'CH': 0.077,    // 7.7% VAT Switzerland
    'NL': 0.21,     // 21% VAT Netherlands
    'BE': 0.21,     // 21% VAT Belgium
    'FR': 0.20,     // 20% VAT France
    'IT': 0.22,     // 22% VAT Italy
    'ES': 0.21,     // 21% VAT Spain
    'GB': 0.20,     // 20% VAT UK
    'US': 0.00,     // No VAT (state taxes handled separately)
    'CA': 0.00,     // No VAT (provincial taxes handled separately)
    'default': 0.19
  }
  
  return subtotal * (taxRates[country] || taxRates.default)
}