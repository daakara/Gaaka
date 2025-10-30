import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language, TranslationKey, getTranslation } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('gaaka-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      setLanguageState(savedLanguage)
    } else {
      // Default to German for German market
      setLanguageState('de')
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('gaaka-language', lang)
  }

  const t = (key: TranslationKey) => getTranslation(language, key)

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}