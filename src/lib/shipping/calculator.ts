// Advanced shipping calculation service (Shopify-style)
import { 
  ShippingCalculationInput, 
  ShippingCalculationResult, 
  ShippingRate, 
  ShippingMethod 
} from './types'
import { 
  getZoneForCountry, 
  getMethodsForZone, 
  SHIPPING_CARRIERS 
} from './config'

export class ShippingCalculator {
  private static instance: ShippingCalculator
  
  public static getInstance(): ShippingCalculator {
    if (!ShippingCalculator.instance) {
      ShippingCalculator.instance = new ShippingCalculator()
    }
    return ShippingCalculator.instance
  }

  /**
   * Calculate shipping rates for given input
   */
  public async calculateRates(input: ShippingCalculationInput): Promise<ShippingCalculationResult> {
    try {
      // Validate input
      const validation = this.validateInput(input)
      if (!validation.valid) {
        return {
          success: false,
          rates: [],
          errors: validation.errors,
          totalWeight: 0,
          totalValue: 0
        }
      }

      // Calculate totals
      const totals = this.calculateTotals(input.items)
      
      // Get shipping zone for destination
      const zone = getZoneForCountry(input.destination.country)
      
      // Get available methods for zone
      const availableMethods = getMethodsForZone(zone)
      
      if (availableMethods.length === 0) {
        return {
          success: false,
          rates: [],
          errors: [`No shipping methods available for ${input.destination.country}`],
          totalWeight: totals.weight,
          totalValue: totals.value
        }
      }

      // Calculate rates for each method
      const rates: ShippingRate[] = []
      
      for (const method of availableMethods) {
        const rate = this.calculateMethodRate(method, totals, input)
        if (rate) {
          rates.push(rate)
        }
      }

      // Sort by price (ascending)
      rates.sort((a, b) => a.price - b.price)

      return {
        success: true,
        rates,
        totalWeight: totals.weight,
        totalValue: totals.value
      }

    } catch (error) {
      console.error('Shipping calculation error:', error)
      return {
        success: false,
        rates: [],
        errors: ['Failed to calculate shipping rates'],
        totalWeight: 0,
        totalValue: 0
      }
    }
  }

  /**
   * Calculate rate for specific shipping method
   */
  private calculateMethodRate(
    method: ShippingMethod, 
    totals: { weight: number; value: number }, 
    input: ShippingCalculationInput
  ): ShippingRate | null {
    try {
      // Check weight restrictions
      if (method.restrictions?.maxWeight && totals.weight > method.restrictions.maxWeight) {
        return null
      }

      // Calculate base price
      let price = method.price.baseRate

      // Add weight-based pricing
      if (method.price.weightMultiplier && totals.weight > 1) {
        const extraWeight = totals.weight - 1 // First kg often included in base rate
        price += extraWeight * method.price.weightMultiplier
      }

      // Apply free shipping threshold
      if (method.price.freeThreshold && totals.value >= method.price.freeThreshold) {
        price = 0
      }

      // Calculate estimated delivery date
      const estimatedDelivery = this.calculateEstimatedDelivery(method.deliveryTime)

      // Format delivery time string
      const deliveryTimeStr = this.formatDeliveryTime(method.deliveryTime)

      return {
        methodId: method.id,
        name: method.name,
        description: method.description || '',
        price: Math.round(price * 100) / 100, // Round to 2 decimals
        currency: input.currency,
        deliveryTime: deliveryTimeStr,
        carrier: method.carrier,
        trackingIncluded: method.restrictions?.trackingIncluded ?? true,
        estimatedDelivery
      }

    } catch (error) {
      console.error(`Error calculating rate for method ${method.id}:`, error)
      return null
    }
  }

  /**
   * Validate shipping calculation input
   */
  private validateInput(input: ShippingCalculationInput): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!input.items || input.items.length === 0) {
      errors.push('No items in cart')
    }

    if (!input.destination?.country) {
      errors.push('Destination country is required')
    }

    if (!input.destination?.postalCode) {
      errors.push('Destination postal code is required')
    }

    if (!input.currency) {
      errors.push('Currency is required')
    }

    // Validate items
    if (input.items) {
      input.items.forEach((item, index) => {
        if (!item.id) errors.push(`Item ${index + 1}: ID is required`)
        if (!item.quantity || item.quantity <= 0) errors.push(`Item ${index + 1}: Quantity must be greater than 0`)
        if (!item.weight || item.weight <= 0) errors.push(`Item ${index + 1}: Weight must be greater than 0`)
        if (!item.price || item.price < 0) errors.push(`Item ${index + 1}: Price must be non-negative`)
      })
    }

    return { valid: errors.length === 0, errors }
  }

  /**
   * Calculate cart totals
   */
  private calculateTotals(items: ShippingCalculationInput['items']): { weight: number; value: number } {
    return items.reduce(
      (totals, item) => ({
        weight: totals.weight + (item.weight * item.quantity),
        value: totals.value + (item.price * item.quantity)
      }),
      { weight: 0, value: 0 }
    )
  }

  /**
   * Calculate estimated delivery date
   */
  private calculateEstimatedDelivery(deliveryTime: ShippingMethod['deliveryTime']): Date {
    const now = new Date()
    
    if (deliveryTime.unit === 'hours') {
      return new Date(now.getTime() + (deliveryTime.max * 60 * 60 * 1000))
    } else {
      // Add business days (skip weekends)
      let daysToAdd = deliveryTime.max
      const result = new Date(now)
      
      while (daysToAdd > 0) {
        result.setDate(result.getDate() + 1)
        // Skip weekends (0 = Sunday, 6 = Saturday)
        if (result.getDay() !== 0 && result.getDay() !== 6) {
          daysToAdd--
        }
      }
      
      return result
    }
  }

  /**
   * Format delivery time for display
   */
  private formatDeliveryTime(deliveryTime: ShippingMethod['deliveryTime']): string {
    const { min, max, unit } = deliveryTime
    
    if (min === max) {
      return `${min} ${unit === 'days' ? (min === 1 ? 'day' : 'days') : (min === 1 ? 'hour' : 'hours')}`
    }
    
    return `${min}-${max} ${unit === 'days' ? 'business days' : 'hours'}`
  }

  /**
   * Get cheapest shipping rate
   */
  public getCheapestRate(rates: ShippingRate[]): ShippingRate | null {
    if (rates.length === 0) return null
    return rates.reduce((cheapest, current) => 
      current.price < cheapest.price ? current : cheapest
    )
  }

  /**
   * Get fastest shipping rate
   */
  public getFastestRate(rates: ShippingRate[]): ShippingRate | null {
    if (rates.length === 0) return null
    return rates.reduce((fastest, current) => 
      current.estimatedDelivery < fastest.estimatedDelivery ? current : fastest
    )
  }

  /**
   * Filter rates by carrier
   */
  public getRatesByCarrier(rates: ShippingRate[], carrierName: string): ShippingRate[] {
    return rates.filter(rate => rate.carrier.toLowerCase() === carrierName.toLowerCase())
  }

  /**
   * Get rate by method ID
   */
  public getRateById(rates: ShippingRate[], methodId: string): ShippingRate | null {
    return rates.find(rate => rate.methodId === methodId) || null
  }
}

// Shipping service instance
export const shippingCalculator = ShippingCalculator.getInstance()

// Utility functions for easy access
export const calculateShippingRates = (input: ShippingCalculationInput): Promise<ShippingCalculationResult> => {
  return shippingCalculator.calculateRates(input)
}

export const getCheapestShipping = (rates: ShippingRate[]): ShippingRate | null => {
  return shippingCalculator.getCheapestRate(rates)
}

export const getFastestShipping = (rates: ShippingRate[]): ShippingRate | null => {
  return shippingCalculator.getFastestRate(rates)
}

// Mock function for real-time carrier rates (for future API integration)
export const fetchLiveRates = async (input: ShippingCalculationInput): Promise<ShippingRate[]> => {
  // This would integrate with actual carrier APIs (DHL, UPS, etc.)
  // For now, return calculated rates
  const result = await calculateShippingRates(input)
  return result.rates
}