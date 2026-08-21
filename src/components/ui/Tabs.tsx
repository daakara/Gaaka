import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
}

interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ items, activeId, onChange, className = '' }: TabsProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`flex flex-wrap items-center gap-2 p-1.5 bg-amber-50/80 backdrop-blur-sm rounded-2xl border border-amber-200/80 max-w-fit shadow-inner ${className}`} role="tablist">
      {items.map((tab) => {
        const isActive = activeId === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            type="button"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${
              isActive ? 'bg-primary-700 text-white shadow-md shadow-primary-700/20' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-primary-800 text-amber-200' 
                    : 'bg-amber-100 text-primary-800'
                }`}>
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
