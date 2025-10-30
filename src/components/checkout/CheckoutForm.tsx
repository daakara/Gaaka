// Production-ready checkout form with validation and payment processing
import React from 'react'
import { CheckCircle, AlertCircle, Lock } from 'lucide-react'
import FormInput from '../ui/FormInput'
import { useCheckout } from '../../hooks/useCheckout'

interface CheckoutFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSuccess,
  onError
}) => {
  const {
    formData,
    errors,
    isProcessing,
    isValid,
    step,
    pricing,
    updateFormData,
    processPayment,
    getAvailablePaymentMethods
  } = useCheckout()

  const availablePaymentMethods = getAvailablePaymentMethods()
  
  // Country options for shipping
  const countryOptions = [
    { value: 'DE', label: 'Germany' },
    { value: 'AT', label: 'Austria' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'FR', label: 'France' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'BE', label: 'Belgium' },
    { value: 'IT', label: 'Italy' },
    { value: 'ES', label: 'Spain' },
    { value: 'DK', label: 'Denmark' },
    { value: 'SE', label: 'Sweden' },
    { value: 'NO', label: 'Norway' },
    { value: 'PL', label: 'Poland' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await processPayment()
    
    if (result.success) {
      onSuccess?.()
    } else {
      onError?.(result.error?.message || 'Payment failed')
    }
  }

  // Show success state
  if (step === 'success') {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">Thank you for your purchase. You will receive a confirmation email shortly.</p>
      </div>
    )
  }

  // Show error state
  if (step === 'error') {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Failed</h2>
        <p className="text-gray-600 mb-4">
          {errors.payment || 'There was an issue processing your payment. Please try again.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary px-6 py-2"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={(value) => updateFormData('email', value)}
          error={errors.email}
          required
          placeholder="your@email.com"
        />
        
        <div className="mt-4 flex items-center">
          <input
            id="newsletter"
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => updateFormData('newsletter', e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
            Subscribe to our newsletter for updates and exclusive offers
          </label>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={(value) => updateFormData('firstName', value)}
            error={errors.firstName}
            required
          />
          
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={(value) => updateFormData('lastName', value)}
            error={errors.lastName}
            required
          />
        </div>
        
        <FormInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={(value) => updateFormData('address', value)}
          error={errors.address}
          required
          className="mt-4"
          placeholder="Street address"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormInput
            label="City"
            name="city"
            value={formData.city}
            onChange={(value) => updateFormData('city', value)}
            error={errors.city}
            required
          />
          
          <FormInput
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={(value) => updateFormData('postalCode', value)}
            error={errors.postalCode}
            required
          />
          
          <FormInput
            label="Country"
            name="country"
            type="select"
            value={formData.country}
            onChange={(value) => updateFormData('country', value)}
            error={errors.country}
            options={countryOptions}
            required
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          {availablePaymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.paymentMethod === method.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={formData.paymentMethod === method.id}
                onChange={(e) => updateFormData('paymentMethod', e.target.value)}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                {method.name}
              </span>
              {method.testMode && (
                <span className="ml-auto text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                  Test Mode
                </span>
              )}
            </label>
          ))}
        </div>
        
        {errors.paymentMethod && (
          <div className="mt-2 flex items-center text-sm text-red-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>{errors.paymentMethod}</span>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>€{pricing.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>
              {pricing.shipping === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `€${pricing.shipping.toFixed(2)}`
              )}
            </span>
          </div>
          {pricing.tax > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>€{pricing.tax.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold text-gray-900 border-t border-gray-200 pt-2">
            <span>Total</span>
            <span>€{pricing.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid || isProcessing}
        className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Complete Order - €{pricing.total.toFixed(2)}
          </>
        )}
      </button>
      
      <div className="text-center text-sm text-gray-600">
        <div className="flex items-center justify-center">
          <Lock className="h-4 w-4 text-green-600 mr-1" />
          Your payment information is secure and encrypted
        </div>
      </div>
    </form>
  )
}

export default CheckoutForm