import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { CheckCircle2, ShoppingBag, X } from 'lucide-react'

export interface ToastNotification {
  id: string
  title: string
  description?: string
  image?: string
  price?: number
  actionText?: string
  onAction?: () => void
  onClose: () => void
}

export function Toast({
  title,
  description,
  image,
  price,
  actionText = 'View Cart',
  onAction,
  onClose
}: ToastNotification) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div 
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[9999] max-w-sm w-[calc(100vw-2rem)] sm:w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/90 p-4 animate-slideInUp flex items-center gap-3.5"
      role="status"
      aria-live="polite"
    >
      {image ? (
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-amber-50 border border-amber-100 shrink-0">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
            {title}
          </h4>
        </div>
        {description && (
          <p className="text-[11px] text-gray-500 truncate mt-0.5">
            {description}
          </p>
        )}
        {price !== undefined && (
          <p className="text-xs font-bold text-primary-700 mt-0.5">
            €{price.toFixed(2)}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="px-3 py-1.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>{actionText}</span>
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>,
    document.body
  )
}
