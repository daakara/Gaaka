import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionItemProps {
  id: string
  title: string | React.ReactNode
  icon?: React.ReactNode
  badge?: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({
  id,
  title,
  icon,
  badge,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
      isOpen 
        ? 'border-primary-300 bg-amber-50/30 shadow-sm' 
        : 'border-gray-200/80 bg-white hover:border-gray-300'
    }`}>
      <button
        type="button"
        id={`accordion-btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 group"
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-200 ${
              isOpen ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500 group-hover:bg-amber-100 group-hover:text-primary-600'
            }`}>
              {icon}
            </div>
          )}
          <span className="font-bold text-gray-900 text-base group-hover:text-primary-800 transition-colors">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-primary-800 border border-amber-200">
              {badge}
            </span>
          )}
        </div>
        
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-primary-700 text-white rotate-180 shadow-sm' 
            : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-700'
        }`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <div
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-btn-${id}`}
        className={`transition-all duration-300 ease-in-out px-6 ${
          isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="pt-2 border-t border-amber-100/60 text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Accordion({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-3.5 ${className}`}>{children}</div>
}
