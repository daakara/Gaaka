import React from 'react'

export interface StatCounterProps {
  number: string
  label: string
  description?: string
  icon?: React.ReactNode
  badge?: string
}

export function StatCounter({ number, label, description, icon, badge }: StatCounterProps) {
  return (
    <div className="relative group p-6 sm:p-8 bg-white rounded-3xl border border-amber-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-gradient-to-br from-amber-200/40 to-orange-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div className="relative flex items-start justify-between gap-4 mb-4">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 text-primary-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        {badge && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {badge}
          </span>
        )}
      </div>

      <div className="relative">
        <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-serif">
          {number}
        </p>
        <h3 className="text-base font-bold text-primary-800 mt-1">
          {label}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
