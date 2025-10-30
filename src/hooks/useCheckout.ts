// Production-ready checkout hook with validation and error handling
import { useState, useCallback, useMemo } from 'react'
import { useCart } from '../contexts/CartContext'
import { paymentService, OrderData, PaymentResult } from '../lib/payments/service'
import { PaymentMethod } from '../lib/payments/config'
import { ShippingRate, ShippingCalculationInput } from '../lib/shipping/types'
import { calculateShippingRates } from '../lib/shipping/calculator'

export interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  postalCode: string
  country: string
  paymentMethod: string
  selectedShippingRate?: ShippingRate
  newsletter: boolean
  sameAsBilling: boolean
}

export interface CheckoutState {
  formData: CheckoutFormData
  errors: Record<string, string>
  isProcessing: boolean
  isValid: boolean
  step: 'details' | 'payment' | 'processing' | 'success' | 'error'
  paymentResult?: PaymentResult
}

const initialFormData: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'DE',
  paymentMethod: 'card',
  newsletter: false,
  sameAsBilling: true
}

export const useCheckout = () => {
  const { state: cartState, clearCart } = useCart()
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    formData: initialFormData,
    errors: {},
    isProcessing: false,
    isValid: false,
    step: 'details'
  })

  // Calculate pricing with memoization for performance
  const pricing = useMemo(() => {
    if (cartState.items.length === 0) {
      return { subtotal: 0, shipping: 0, tax: 0, total: 0 }
    }
    
    try {
      const baseTotals = paymentService.calculateOrderTotals(cartState.items, checkoutState.formData.country)
      
      // Use selected shipping rate if available
      const shippingCost = checkoutState.formData.selectedShippingRate?.price || baseTotals.shipping
      
      return {
        ...baseTotals,
        shipping: shippingCost,
        total: baseTotals.subtotal + shippingCost + baseTotals.tax
      }
    } catch (error) {
      console.error('Error calculating totals:', error)
      return { subtotal: 0, shipping: 0, tax: 0, total: 0 }
    }
  }, [cartState.items, checkoutState.formData.country, checkoutState.formData.selectedShippingRate])

  // Validate form field
  const validateField = useCallback((field: keyof CheckoutFormData, value: any): string | null => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format'
        return null
      
      case 'firstName':
      case 'lastName':
        if (!value?.trim()) return `${field === 'firstName' ? 'First' : 'Last'} name is required`
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return null
      
      case 'address':
        if (!value?.trim()) return 'Address is required'
        if (value.trim().length < 5) return 'Please enter a complete address'
        return null
      
      case 'city':
        if (!value?.trim()) return 'City is required'
        if (value.trim().length < 2) return 'Invalid city name'
        return null
      
      case 'postalCode':
        if (!value?.trim()) return 'Postal code is required'
        // Basic postal code validation (can be enhanced per country)
        if (!/^[A-Za-z0-9\s-]{3,10}$/.test(value)) return 'Invalid postal code format'
        return null
      
      case 'country':
        if (!value) return 'Country is required'
        return null
      
      case 'paymentMethod':
        if (!value) return 'Payment method is required'
        const availableMethods = paymentService.getAvailablePaymentMethods(checkoutState.formData.country)
        if (!availableMethods.find((m: PaymentMethod) => m.id === value)) return 'Selected payment method is not available'
        return null
      
      default:
        return null
    }
  }, [checkoutState.formData.country])

  // Update form data with validation
  const updateFormData = useCallback((field: keyof CheckoutFormData, value: any) => {
    setCheckoutState(prev => {
      const newFormData = { ...prev.formData, [field]: value }
      const fieldError = validateField(field, value)
      const newErrors = { ...prev.errors }
      
      if (fieldError) {
        newErrors[field] = fieldError
      } else {
        delete newErrors[field]
      }

      // Validate all required fields for form validity
      const requiredFields: (keyof CheckoutFormData)[] = [
        'email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'country', 'paymentMethod'
      ]
      
      const isValid = requiredFields.every(f => {
        const error = validateField(f, newFormData[f])
        return !error
      }) && Object.keys(newErrors).length === 0

      return {
        ...prev,
        formData: newFormData,
        errors: newErrors,
        isValid
      }
    })
  }, [validateField])

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const requiredFields: (keyof CheckoutFormData)[] = [
      'email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'country', 'paymentMethod'
    ]
    
    const newErrors: Record<string, string> = {}
    
    requiredFields.forEach(field => {
      const error = validateField(field, checkoutState.formData[field])
      if (error) {
        newErrors[field] = error
      }
    })

    // Additional cart validation
    if (cartState.items.length === 0) {
      newErrors.cart = 'Your cart is empty'
    }

    setCheckoutState(prev => ({
      ...prev,
      errors: newErrors,
      isValid: Object.keys(newErrors).length === 0
    }))

    return Object.keys(newErrors).length === 0
  }, [checkoutState.formData, validateField, cartState.items])

  // Process payment
  const processPayment = useCallback(async (): Promise<PaymentResult> => {
    if (!validateForm()) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Please fix the form errors before proceeding'
        }
      }
    }

    setCheckoutState(prev => ({ 
      ...prev, 
      isProcessing: true, 
      step: 'processing' 
    }))

    try {
      const orderData: OrderData = {
        items: cartState.items,
        shippingAddress: {
          firstName: checkoutState.formData.firstName,
          lastName: checkoutState.formData.lastName,
          email: checkoutState.formData.email,
          address: checkoutState.formData.address,
          city: checkoutState.formData.city,
          postalCode: checkoutState.formData.postalCode,
          country: checkoutState.formData.country
        },
        paymentMethod: checkoutState.formData.paymentMethod,
        pricing
      }

      let result: PaymentResult

      // Route to appropriate payment processor
      switch (checkoutState.formData.paymentMethod) {
        case 'paypal':
          result = await paymentService.processPayPalPayment(orderData)
          break
        case 'card':
        default:
          result = await paymentService.createPaymentIntent(orderData)
          break
      }

      setCheckoutState(prev => ({
        ...prev,
        isProcessing: false,
        paymentResult: result,
        step: result.success ? 'success' : 'error'
      }))

      // Clear cart on successful payment
      if (result.success) {
        clearCart()
      }

      return result

    } catch (error: any) {
      const errorResult: PaymentResult = {
        success: false,
        error: {
          code: 'PROCESSING_ERROR',
          message: 'Payment processing failed. Please try again.',
          details: error.message
        }
      }

      setCheckoutState(prev => ({
        ...prev,
        isProcessing: false,
        paymentResult: errorResult,
        step: 'error'
      }))

      return errorResult
    }
  }, [validateForm, checkoutState.formData, cartState.items, pricing, clearCart])

  // Reset checkout state
  const resetCheckout = useCallback(() => {
    setCheckoutState({
      formData: initialFormData,
      errors: {},
      isProcessing: false,
      isValid: false,
      step: 'details'
    })
  }, [])

  // Calculate shipping rates
  const calculateShippingForCart = useCallback(async (): Promise<ShippingRate[]> => {
    if (cartState.items.length === 0 || !checkoutState.formData.country || !checkoutState.formData.postalCode) {
      return []
    }

    try {
      const shippingInput: ShippingCalculationInput = {
        items: cartState.items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          weight: item.weight || 0.5, // Default weight if not specified
          price: item.price
        })),
        destination: {
          country: checkoutState.formData.country,
          postalCode: checkoutState.formData.postalCode,
          city: checkoutState.formData.city
        },
        currency: 'EUR'
      }

      const result = await calculateShippingRates(shippingInput)
      return result.success ? result.rates : []
    } catch (error) {
      console.error('Error calculating shipping rates:', error)
      return []
    }
  }, [cartState.items, checkoutState.formData.country, checkoutState.formData.postalCode, checkoutState.formData.city])

  return {
    // State
    formData: checkoutState.formData,
    errors: checkoutState.errors,
    isProcessing: checkoutState.isProcessing,
    isValid: checkoutState.isValid,
    step: checkoutState.step,
    paymentResult: checkoutState.paymentResult,
    pricing,
    
    // Actions
    updateFormData,
    validateForm,
    processPayment,
    resetCheckout,
    calculateShippingForCart,
    
    // Utilities
    getAvailablePaymentMethods: () => 
      paymentService.getAvailablePaymentMethods(checkoutState.formData.country),
    isPaymentMethodSupported: (methodId: string) => 
      paymentService.isPaymentMethodSupported(methodId)
  }
}