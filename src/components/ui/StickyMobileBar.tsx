import React from 'react'
import Image from 'next/image'
import { ShoppingBag, Star, Check } from 'lucide-react'

interface StickyMobileBarProps {
  title: string
  price: number
  image?: string
  inStock: boolean
  isAdded: boolean
  onAddToCart: () => void
}

export function StickyMobileBar({
  title,
  price,
  image,
  inStock,
  isAdded,
  onAddToCart
}: StickyMobileBarProps) {
  return (
    <div 
      className="fixed bottom-16 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-xl border-t border-amber-200/80 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-3 px-4 animate-slideInUp"
      role="region"
      aria-label="Quick Add to Cart Mobile Bar"
    >
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          {image && (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-amber-50 border border-amber-100 shrink-0">
              <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-900 truncate">
              {title}
            </h4>
            <p className="text-sm font-extrabold text-primary-700">
              €{price.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          disabled={!inStock}
          className={`shrink-0 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
            !inStock
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : isAdded
              ? 'bg-emerald-700 text-white'
              : 'btn-primary'
          }`}
          aria-label={inStock ? `Add ${title} to cart` : `${title} is sold out`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : !inStock ? (
            <span>Sold Out</span>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
