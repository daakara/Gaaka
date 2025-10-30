// Order tracking display component
import React, { useState, useEffect } from 'react'
import { Package, Truck, MapPin, Clock, ExternalLink, Search } from 'lucide-react'
import { TrackingInfo } from '../../lib/shipping/types'
import { trackPackage, getTrackingUrl, getStatusColor, getStatusText } from '../../lib/shipping/tracking'

interface OrderTrackingProps {
  trackingNumber?: string
  carrierCode?: string
  className?: string
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  trackingNumber: initialTrackingNumber,
  carrierCode,
  className = ''
}) => {
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || '')
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-track if tracking number provided
  useEffect(() => {
    if (initialTrackingNumber) {
      handleTrack(initialTrackingNumber)
    }
  }, [initialTrackingNumber])

  const handleTrack = async (number?: string) => {
    const trackNumber = number || trackingNumber
    
    if (!trackNumber.trim()) {
      setError('Please enter a tracking number')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const info = await trackPackage(trackNumber.trim(), carrierCode)
      
      if (info) {
        setTrackingInfo(info)
      } else {
        setError('Tracking information not found. Please check your tracking number.')
      }
    } catch (err) {
      console.error('Tracking error:', err)
      setError('Unable to retrieve tracking information. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack()
    }
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusIcon = (status: TrackingInfo['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6" />
      case 'shipped':
      case 'in_transit':
        return <Truck className="h-6 w-6" />
      case 'out_for_delivery':
        return <MapPin className="h-6 w-6" />
      case 'delivered':
        return <Package className="h-6 w-6" />
      default:
        return <Package className="h-6 w-6" />
    }
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Tracking Input */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Track Your Order</h2>
        
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your tracking number..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => handleTrack()}
            disabled={isLoading || !trackingNumber.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span>{isLoading ? 'Tracking...' : 'Track'}</span>
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* Tracking Results */}
      {trackingInfo && (
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Package Status</h3>
              
              {trackingInfo.trackingNumber && (
                <a
                  href={getTrackingUrl(trackingInfo.trackingNumber, trackingInfo.carrier.toLowerCase())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm">Track on {trackingInfo.carrier}</span>
                </a>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${getStatusColor(trackingInfo.status)}`}>
                {getStatusIcon(trackingInfo.status)}
              </div>
              
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900">
                  {getStatusText(trackingInfo.status)}
                </h4>
                
                <div className="mt-1 space-y-1">
                  <p className="text-gray-600">
                    Tracking Number: <span className="font-mono font-medium">{trackingInfo.trackingNumber}</span>
                  </p>
                  <p className="text-gray-600">
                    Carrier: <span className="font-medium">{trackingInfo.carrier}</span>
                  </p>
                  
                  {trackingInfo.estimatedDelivery && (
                    <p className="text-gray-600">
                      Estimated Delivery: <span className="font-medium">
                        {formatDate(trackingInfo.estimatedDelivery)}
                      </span>
                    </p>
                  )}
                  
                  {trackingInfo.actualDelivery && (
                    <p className="text-green-600">
                      Delivered: <span className="font-medium">
                        {formatDate(trackingInfo.actualDelivery)}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Events Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking History</h3>
            
            <div className="space-y-6">
              {trackingInfo.events.map((event, index) => (
                <div key={index} className="flex space-x-4">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      index === 0 
                        ? 'bg-indigo-600 border-indigo-600' 
                        : 'bg-gray-200 border-gray-300'
                    }`}></div>
                    {index < trackingInfo.events.length - 1 && (
                      <div className="w-px h-12 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  
                  {/* Event details */}
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">{event.status}</h4>
                      <time className="text-sm text-gray-500">
                        {formatDate(event.timestamp)}
                      </time>
                    </div>
                    
                    <p className="mt-1 text-gray-600">{event.description}</p>
                    
                    {event.location && (
                      <p className="mt-1 text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Delivery Information</h3>
            
            <div className="space-y-2 text-blue-800">
              <p>• Packages are typically delivered between 9:00 AM and 6:00 PM</p>
              <p>• Someone must be available to receive the package if signature is required</p>
              <p>• If you're not home, the carrier will leave a delivery notice</p>
              <p>• You can track your package in real-time using the link above</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderTracking