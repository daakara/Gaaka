// Error Boundary component for production-ready error handling
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service (e.g., Sentry)
    console.error('Error boundary caught an error:', error, errorInfo)
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please refresh the page or contact support if the problem persists.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer">Error Details</summary>
                <pre className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Specific error boundary for cart operations
export const CartErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-medium mb-2">Cart Error</h3>
          <p className="text-red-600 text-sm">
            There was a problem with your cart. Please refresh the page to try again.
          </p>
        </div>
      }
      onError={(error, errorInfo) => {
        // Clear potentially corrupted cart data
        localStorage.removeItem('gaaka-cart')
        console.error('Cart error:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

// Payment error boundary
export const PaymentErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <h3 className="text-red-800 font-medium mb-2">Payment System Error</h3>
          <p className="text-red-600 text-sm mb-4">
            We're experiencing issues with our payment system. Please try again in a few moments.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Reload Payment Form
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}