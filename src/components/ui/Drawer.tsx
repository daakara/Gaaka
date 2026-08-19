import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  side?: 'left' | 'right'
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = 'left'
}: DrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Escape key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[60] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed inset-y-0 ${
          side === 'left' ? 'left-0 animate-slideInRight' : 'right-0 animate-slideInLeft'
        } w-full max-w-sm sm:max-w-md bg-white shadow-2xl z-[60] flex flex-col h-full`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-amber-100 bg-amber-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary-700 text-white font-black flex items-center justify-center text-sm shadow-sm">
              G
            </div>
            <h2 id="drawer-title" className="text-lg font-bold text-gray-900 font-serif">
              {title || 'GAAKA Menu'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu drawer"
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 pb-32 sm:pb-12">
          {children}
        </div>
      </div>
    </div>
  )
}
