import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'

interface LanguageToggleProps {
  variant?: 'default' | 'compact' | 'icon-only'
}

export default function LanguageToggle({ variant = 'default' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en')
  }

  // Icon-only variant for mobile header
  if (variant === 'icon-only') {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center justify-center p-3 rounded-full text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 hover:scale-105 relative group"
        aria-label={`Switch to ${language === 'en' ? 'German' : 'English'}`}
      >
        <Globe className="h-5 w-5" />
        <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow-sm">
          {language.toUpperCase()}
        </span>
      </button>
    )
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 text-sm font-medium bg-white shadow-sm"
        aria-label={`Switch to ${language === 'en' ? 'German' : 'English'}`}
      >
        <Globe className="h-4 w-4 text-gray-600" />
        <span className="text-gray-700">
          {language === 'en' ? 'DE' : 'EN'}
        </span>
      </button>
    )
  }

  // Default variant
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors duration-200 text-sm"
      aria-label={`Switch to ${language === 'en' ? 'German' : 'English'}`}
    >
      <Globe className="h-4 w-4 text-gray-600" />
      <span className="font-medium text-gray-700">
        {language === 'en' ? 'DE' : 'EN'}
      </span>
    </button>
  )
}