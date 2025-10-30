import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en')
  }

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