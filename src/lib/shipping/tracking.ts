// Order tracking service with carrier integration
import { TrackingInfo, TrackingEvent, ShippingCarrier } from './types'
import { SHIPPING_CARRIERS } from './config'

export class OrderTrackingService {
  private static instance: OrderTrackingService

  public static getInstance(): OrderTrackingService {
    if (!OrderTrackingService.instance) {
      OrderTrackingService.instance = new OrderTrackingService()
    }
    return OrderTrackingService.instance
  }

  /**
   * Track package by tracking number
   */
  public async trackPackage(trackingNumber: string, carrierCode?: string): Promise<TrackingInfo | null> {
    try {
      // If no carrier specified, try to detect from tracking number format
      const carrier = carrierCode ? this.getCarrierById(carrierCode) : this.detectCarrier(trackingNumber)
      
      if (!carrier) {
        throw new Error('Carrier not found or could not be detected')
      }

      // In a real implementation, this would call the actual carrier API
      // For now, return mock tracking data
      return this.getMockTrackingData(trackingNumber, carrier)

    } catch (error) {
      console.error('Tracking error:', error)
      return null
    }
  }

  /**
   * Generate tracking URL for carrier
   */
  public getTrackingUrl(trackingNumber: string, carrierCode: string): string {
    const carrier = this.getCarrierById(carrierCode)
    if (!carrier) {
      return ''
    }

    return carrier.trackingUrl.replace('${trackingNumber}', trackingNumber)
  }

  /**
   * Get carrier by ID
   */
  private getCarrierById(carrierId: string): ShippingCarrier | null {
    return SHIPPING_CARRIERS.find(carrier => 
      carrier.id.toLowerCase() === carrierId.toLowerCase()
    ) || null
  }

  /**
   * Detect carrier from tracking number format
   */
  private detectCarrier(trackingNumber: string): ShippingCarrier | null {
    const cleanNumber = trackingNumber.replace(/\s+/g, '').toUpperCase()

    // DHL tracking number patterns
    if (/^[0-9]{10}$/.test(cleanNumber) || /^[0-9]{12}$/.test(cleanNumber)) {
      return this.getCarrierById('dhl')
    }

    // UPS tracking number patterns
    if (/^1Z[0-9A-Z]{16}$/.test(cleanNumber)) {
      return this.getCarrierById('ups')
    }

    // FedEx tracking number patterns
    if (/^[0-9]{12}$/.test(cleanNumber) || /^[0-9]{14}$/.test(cleanNumber)) {
      return this.getCarrierById('fedex')
    }

    // Hermes tracking number patterns
    if (/^H[0-9]{10}$/.test(cleanNumber)) {
      return this.getCarrierById('hermes')
    }

    // Deutsche Post patterns
    if (/^[A-Z]{2}[0-9]{9}[A-Z]{2}$/.test(cleanNumber)) {
      return this.getCarrierById('deutsche-post')
    }

    // Default to DHL if no pattern matches
    return this.getCarrierById('dhl')
  }

  /**
   * Generate mock tracking data (replace with real API integration)
   */
  private getMockTrackingData(trackingNumber: string, carrier: ShippingCarrier): TrackingInfo {
    const now = new Date()
    const events: TrackingEvent[] = []

    // Create realistic tracking events
    events.push({
      timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      status: 'Order processed',
      location: 'Frankfurt, DE',
      description: 'Your order has been processed and prepared for shipment'
    })

    events.push({
      timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      status: 'Shipped',
      location: 'Frankfurt Distribution Center, DE',
      description: 'Package has been shipped from our warehouse'
    })

    events.push({
      timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      status: 'In transit',
      location: 'Hamburg, DE',
      description: 'Package is in transit to destination'
    })

    // Current status based on time
    const currentStatus = events.length > 2 ? 'in_transit' : 'shipped'
    
    return {
      trackingNumber,
      carrier: carrier.name,
      status: currentStatus,
      events: events.reverse(), // Most recent first
      estimatedDelivery: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000)
    }
  }

  /**
   * Get status color for UI display
   */
  public getStatusColor(status: TrackingInfo['status']): string {
    switch (status) {
      case 'pending':
        return 'text-gray-600 bg-gray-100'
      case 'shipped':
        return 'text-blue-600 bg-blue-100'
      case 'in_transit':
        return 'text-yellow-600 bg-yellow-100'
      case 'out_for_delivery':
        return 'text-orange-600 bg-orange-100'
      case 'delivered':
        return 'text-green-600 bg-green-100'
      case 'exception':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  /**
   * Get status display text
   */
  public getStatusText(status: TrackingInfo['status']): string {
    switch (status) {
      case 'pending':
        return 'Order Pending'
      case 'shipped':
        return 'Shipped'
      case 'in_transit':
        return 'In Transit'
      case 'out_for_delivery':
        return 'Out for Delivery'
      case 'delivered':
        return 'Delivered'
      case 'exception':
        return 'Exception'
      default:
        return 'Unknown'
    }
  }

  /**
   * Check if package is delivered
   */
  public isDelivered(status: TrackingInfo['status']): boolean {
    return status === 'delivered'
  }

  /**
   * Check if package has an issue
   */
  public hasException(status: TrackingInfo['status']): boolean {
    return status === 'exception'
  }
}

// Export singleton instance
export const orderTrackingService = OrderTrackingService.getInstance()

// Utility functions
export const trackPackage = (trackingNumber: string, carrierCode?: string): Promise<TrackingInfo | null> => {
  return orderTrackingService.trackPackage(trackingNumber, carrierCode)
}

export const getTrackingUrl = (trackingNumber: string, carrierCode: string): string => {
  return orderTrackingService.getTrackingUrl(trackingNumber, carrierCode)
}

export const getStatusColor = (status: TrackingInfo['status']): string => {
  return orderTrackingService.getStatusColor(status)
}

export const getStatusText = (status: TrackingInfo['status']): string => {
  return orderTrackingService.getStatusText(status)
}