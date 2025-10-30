// Payment service with error handling and validation
import { CartItem } from '../../contexts/CartContext'
import { PAYMENT_CONFIG, calculateShipping, calculateTax } from './config'

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled'
  clientSecret?: string
  metadata?: Record<string, string>
}

export interface OrderData {
  items: CartItem[]
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  billingAddress?: {
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  pricing: {
    subtotal: number
    shipping: number
    tax: number
    total: number
  }
}

export interface PaymentResult {
  success: boolean
  paymentIntent?: PaymentIntent
  error?: {
    code: string
    message: string
    details?: any
  }
  orderId?: string
}

class PaymentService {
  private config = PAYMENT_CONFIG

  // Calculate order totals with validation
  calculateOrderTotals(items: CartItem[], country: string) {
    if (!items.length) {
      throw new Error('Cannot calculate totals for empty cart')
    }

    const subtotal = items.reduce((sum, item) => {
      if (item.price <= 0 || item.quantity <= 0) {
        throw new Error(`Invalid item: ${item.name}`)
      }
      return sum + (item.price * item.quantity)
    }, 0)

    const shipping = calculateShipping(subtotal, country)
    const tax = calculateTax(subtotal, country)
    const total = subtotal + shipping + tax

    return {
      subtotal: Number(subtotal.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2))
    }
  }

  // Validate payment data
  validatePaymentData(orderData: Partial<OrderData>): string[] {
    const errors: string[] = []

    // Validate items
    if (!orderData.items?.length) {
      errors.push('Cart cannot be empty')
    }

    // Validate shipping info
    const shippingAddress = orderData.shippingAddress
    if (!shippingAddress) {
      errors.push('Shipping information is required')
    } else {
      if (!shippingAddress.firstName?.trim()) errors.push('First name is required')
      if (!shippingAddress.lastName?.trim()) errors.push('Last name is required')
      if (!shippingAddress.email?.trim()) errors.push('Email is required')
      if (!shippingAddress.address?.trim()) errors.push('Address is required')
      if (!shippingAddress.city?.trim()) errors.push('City is required')
      if (!shippingAddress.postalCode?.trim()) errors.push('Postal code is required')
      if (!shippingAddress.country?.trim()) errors.push('Country is required')
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (shippingAddress.email && !emailRegex.test(shippingAddress.email)) {
        errors.push('Invalid email format')
      }
    }

    // Validate payment method
    if (!orderData.paymentMethod) {
      errors.push('Payment method is required')
    } else {
      const method = this.config.methods.find(m => m.id === orderData.paymentMethod)
      if (!method || !method.enabled) {
        errors.push('Selected payment method is not available')
      }
    }

    return errors
  }

  // Create payment intent (Stripe integration)
  async createPaymentIntent(orderData: OrderData): Promise<PaymentResult> {
    try {
      // Validate data first
      const validationErrors = this.validatePaymentData(orderData)
      if (validationErrors.length > 0) {
        return {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: validationErrors.join(', '),
            details: validationErrors
          }
        }
      }

      // In production, this would call your backend API
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(orderData.pricing.total * 100), // Stripe expects cents
          currency: this.config.currency.toLowerCase(),
          metadata: {
            orderId: `order_${Date.now()}`,
            customerEmail: orderData.shippingAddress.email,
            itemCount: orderData.items.length.toString()
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          error: {
            code: errorData.code || 'PAYMENT_ERROR',
            message: errorData.message || 'Payment processing failed'
          }
        }
      }

      const paymentIntent = await response.json()
      
      return {
        success: true,
        paymentIntent,
        orderId: paymentIntent.metadata?.orderId
      }

    } catch (error: any) {
      console.error('Payment intent creation failed:', error)
      
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Unable to process payment. Please check your connection and try again.',
          details: error.message
        }
      }
    }
  }

  // Process PayPal payment
  async processPayPalPayment(orderData: OrderData): Promise<PaymentResult> {
    try {
      const validationErrors = this.validatePaymentData(orderData)
      if (validationErrors.length > 0) {
        return {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: validationErrors.join(', ')
          }
        }
      }

      // PayPal integration would go here
      // For now, return success for testing
      return {
        success: true,
        paymentIntent: {
          id: `paypal_${Date.now()}`,
          amount: orderData.pricing.total,
          currency: 'EUR',
          status: 'succeeded'
        },
        orderId: `order_${Date.now()}`
      }

    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'PAYPAL_ERROR',
          message: 'PayPal payment failed. Please try again.'
        }
      }
    }
  }

  // Get available payment methods for country
  getAvailablePaymentMethods(country: string) {
    return this.config.methods.filter(method => {
      // Add country-specific filtering logic here
      if (method.id === 'klarna' && !['DE', 'AT', 'NL', 'BE'].includes(country)) {
        return false
      }
      return method.enabled
    })
  }

  // Check if payment method supports the current browser/device
  isPaymentMethodSupported(methodId: string): boolean {
    switch (methodId) {
      case 'apple_pay':
        return typeof window !== 'undefined' && 'ApplePaySession' in window
      case 'google_pay':
        return typeof window !== 'undefined' && 'PaymentRequest' in window
      default:
        return true
    }
  }
}

export const paymentService = new PaymentService()