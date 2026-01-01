import React, { useState } from 'react'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { addToWooCommerceCart } from '../../lib/woocommerce/cart-service'

interface AddToCartButtonProps {
  productId: number
  productName: string
  quantity?: number
  variationId?: number
  className?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function AddToCartButton({
  productId,
  productName,
  quantity = 1,
  variationId,
  className = '',
  onSuccess,
  onError,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    const result = await addToWooCommerceCart(productId, quantity, variationId)

    if (result.success) {
      setJustAdded(true)
      onSuccess?.()
      
      // Reset "added" state after 2 seconds
      setTimeout(() => {
        setJustAdded(false)
      }, 2000)
    } else {
      onError?.(result.error || 'Failed to add to cart')
    }

    setIsAdding(false)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || justAdded}
      className={`
        inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        ${justAdded 
          ? 'bg-green-600 text-white' 
          : 'bg-amber-600 text-white hover:bg-amber-700'
        }
        ${className}
      `}
      aria-label={`Add ${productName} to cart`}
    >
      {isAdding ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Adding...</span>
        </>
      ) : justAdded ? (
        <>
          <Check className="w-5 h-5" />
          <span>Added to Cart!</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  )
}
