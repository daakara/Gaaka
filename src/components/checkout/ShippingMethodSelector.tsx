// Shipping method selector component (Shopify-style)
import React, { useState, useEffect } from 'react'
import { Truck, Clock, Shield, Info, CheckCircle } from 'lucide-react'
import { ShippingRate, ShippingCalculationInput } from '../../lib/shipping/types'
import { calculateShippingRates } from '../../lib/shipping/calculator'

interface ShippingMethodSelectorProps {
  cartItems: Array<{
    id: string
    name: string
    quantity: number
    weight: number
    price: number
    dimensions?: {
      length: number
      width: number
      height: number
    }
  }>
  destination: {
    country: string
    postalCode: string
    state?: string
    city?: string
  }
  selectedMethodId?: string
  onMethodSelect: (rate: ShippingRate) => void
  currency?: 'EUR' | 'USD' | 'GBP'
  className?: string
}

export const ShippingMethodSelector: React.FC<ShippingMethodSelectorProps> = ({
  cartItems,
  destination,
  selectedMethodId,
  onMethodSelect,
  currency = 'EUR',
  className = ''
}) => {
  const [rates, setRates] = useState<ShippingRate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({})

  // Calculate shipping rates when inputs change
  useEffect(() => {
    const calculateRates = async () => {
      if (!cartItems.length || !destination.country || !destination.postalCode) {
        setRates([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const input: ShippingCalculationInput = {
          items: cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            weight: item.weight,
            dimensions: item.dimensions,
            price: item.price
          })),
          destination,
          currency
        }

        const result = await calculateShippingRates(input)

        if (result.success) {
          setRates(result.rates)
          
          // Auto-select cheapest method if none selected
          if (!selectedMethodId && result.rates.length > 0) {
            const cheapest = result.rates.reduce((prev, curr) => 
              curr.price < prev.price ? curr : prev
            )
            onMethodSelect(cheapest)
          }
        } else {
          setError(result.errors?.[0] || 'Failed to calculate shipping rates')
          setRates([])
        }
      } catch (err) {
        console.error('Shipping calculation error:', err)
        setError('Unable to calculate shipping rates. Please try again.')
        setRates([])
      } finally {
        setIsLoading(false)
      }
    }

    calculateRates()
  }, [cartItems, destination, currency, selectedMethodId, onMethodSelect])

  const toggleDetails = (methodId: string) => {
    setShowDetails(prev => ({ ...prev, [methodId]: !prev[methodId] }))
  }

  const formatPrice = (price: number): string => {
    if (price === 0) return 'Free'
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const formatEstimatedDelivery = (date: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date)
  }

  const getCarrierIcon = (carrier: string): string => {
    const carrierIcons: Record<string, string> = {
      'DHL': '🚚',
      'UPS': '📦',
      'Hermes': '🎯',
      'Deutsche Post': '📮',
      'FedEx': '✈️'
    }
    return carrierIcons[carrier] || '🚛'
  }

  const getMethodTypeColor = (methodId: string): string => {
    if (methodId.includes('express') || methodId.includes('overnight')) {
      return 'bg-red-50 border-red-200 text-red-700'
    }
    if (methodId.includes('economy')) {
      return 'bg-blue-50 border-blue-200 text-blue-700'
    }
    return 'bg-green-50 border-green-200 text-green-700'
  }

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
          <div className="flex items-center text-red-600">
            <Info className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    )
  }

  if (rates.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center text-gray-600">
            <Truck className="h-5 w-5 mr-2" />
            <span>No shipping methods available for this destination</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
      
      <div className="space-y-3">
        {rates.map((rate) => (
          <div key={rate.methodId} className="border border-gray-200 rounded-lg overflow-hidden">
            <label
              className={`block cursor-pointer transition-all duration-200 ${
                selectedMethodId === rate.methodId
                  ? 'bg-indigo-50 border-indigo-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={rate.methodId}
                      checked={selectedMethodId === rate.methodId}
                      onChange={() => onMethodSelect(rate)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{getCarrierIcon(rate.carrier)}</span>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center space-x-2">
                          <span>{rate.name}</span>
                          {rate.trackingIncluded && (
                            <div title="Tracking included">
                              <Shield className="h-4 w-4 text-green-500" />
                            </div>
                          )}
                          {selectedMethodId === rate.methodId && (
                            <CheckCircle className="h-4 w-4 text-indigo-600" />
                          )}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center space-x-4">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {rate.deliveryTime}
                          </span>
                          <span>via {rate.carrier}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatPrice(rate.price)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Est. {formatEstimatedDelivery(rate.estimatedDelivery)}
                    </div>
                  </div>
                </div>

                {rate.description && (
                  <div className="mt-2 ml-7">
                    <p className="text-sm text-gray-600">{rate.description}</p>
                  </div>
                )}

                {/* Method type badge */}
                <div className="mt-2 ml-7">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getMethodTypeColor(rate.methodId)}`}>
                    {rate.methodId.includes('express') ? 'Express' :
                     rate.methodId.includes('economy') ? 'Economy' :
                     rate.methodId.includes('overnight') ? 'Overnight' : 'Standard'}
                  </span>
                </div>
              </div>

              {/* Additional details (expandable) */}
              {showDetails[rate.methodId] && (
                <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                  <div className="pt-3 text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>Carrier:</span>
                      <span className="font-medium">{rate.carrier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tracking:</span>
                      <span className="font-medium">
                        {rate.trackingIncluded ? 'Included' : 'Not available'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated delivery:</span>
                      <span className="font-medium">
                        {formatEstimatedDelivery(rate.estimatedDelivery)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </label>
            
            {/* Toggle details button */}
            <button
              type="button"
              onClick={() => toggleDetails(rate.methodId)}
              className="w-full px-4 py-2 text-xs text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              <Info className="h-3 w-3 mr-1" />
              {showDetails[rate.methodId] ? 'Hide details' : 'Show details'}
            </button>
          </div>
        ))}
      </div>

      {/* Shipping info footer */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium">Shipping Information</p>
            <p className="mt-1">
              Delivery times are estimates and may vary. You'll receive tracking information once your order ships.
              {rates.some(r => r.price === 0) && (
                <span className="block mt-1 font-medium">
                  🎉 Free shipping is available for your order!
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingMethodSelector