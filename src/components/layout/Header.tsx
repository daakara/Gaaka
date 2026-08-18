'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Heart, Sparkles, User, ShoppingBag } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'
import { useCart } from '../../contexts/CartContext'
import LanguageToggle from '../ui/LanguageToggle'
import SearchComponent from '../common/Search'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, language, setLanguage } = useLanguage()
  const { state, toggleCart } = useCart()

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('storageBaskets'), href: '/collections/storage-baskets' },
    { name: t('kitchenDining'), href: '/collections/kitchen-dining' },
    { name: t('wallBaskets'), href: '/collections/wall-baskets' },
    { name: t('about'), href: '/about' },
  ]

  return (
    <>
      {/* Skip to Main Content for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:bg-primary-700 focus:text-white focus:rounded-xl focus:shadow-xl focus:font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        Skip to main content
      </a>

      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-amber-100/80 shadow-sm transition-all duration-200">
        {/* Top Banner */}
        <div className="bg-primary-800 text-white text-center py-2 px-4 text-xs sm:text-sm font-medium tracking-wide">
          <Link href="/collections/all">
            <a className="inline-flex items-center justify-center gap-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-md py-0.5 px-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{t('freeShipping')}</span>
              <Heart className="w-3.5 h-3.5 text-red-300 fill-current shrink-0" />
            </a>
          </Link>
        </div>

        {/* Main Header */}
        <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="p-3 rounded-xl text-gray-700 hover:text-primary-700 hover:bg-amber-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open main navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl p-1">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-md group-hover:bg-primary-700 transition-colors">
                  <span className="font-black text-xl tracking-wider">G</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight block">
                    GAAKA
                  </span>
                  <p className="text-xs text-primary-700 font-medium tracking-wide -mt-1">african artistry</p>
                </div>
              </a>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <SearchComponent />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className="relative px-4 py-2 rounded-lg text-gray-700 hover:text-primary-700 font-medium transition-colors hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Desktop Language Toggle */}
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            {/* Mobile Language Toggle - Icon Only */}
            <div className="sm:hidden">
              <LanguageToggle variant="icon-only" />
            </div>
            <Link href="/collections/all">
              <a 
                className="p-3 text-gray-700 hover:text-primary-700 hover:bg-amber-50 rounded-xl transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Search all products"
              >
                <Search className="h-5 w-5" />
              </a>
            </Link>
            <button 
              onClick={toggleCart}
              className="relative p-3 text-gray-700 hover:text-primary-700 hover:bg-amber-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={`Shopping cart with ${state.itemCount} items`}
            >
              <ShoppingBag className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center font-bold shadow-sm">
                  {state.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-2xl z-50 flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <Link href="/">
                <a 
                  className="flex items-center space-x-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center font-black">
                    G
                  </div>
                  <div>
                    <span className="text-xl font-black text-gray-900">GAAKA</span>
                    <p className="text-xs text-primary-700 font-medium">african artistry</p>
                  </div>
                </a>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Mobile Navigation Content */}
            <nav className="p-5 flex-1 overflow-y-auto space-y-4" aria-label="Mobile Navigation">
              {/* Search */}
              <div className="pb-2">
                <SearchComponent />
              </div>

              {/* Navigation Items */}
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className="flex items-center justify-between text-gray-800 hover:text-primary-700 font-medium py-3 px-4 rounded-xl hover:bg-amber-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                    </a>
                  </Link>
                ))}
              </div>
              
              {/* Language Selection */}
              <div className="pt-6 border-t border-gray-200">
                <p className="font-semibold text-gray-900 text-sm mb-3">{t('chooseLanguage')}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      language === 'en'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    aria-label="Switch to English"
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => { setLanguage('de'); setMobileMenuOpen(false); }}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      language === 'de'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    aria-label="Switch to German"
                  >
                    🇩🇪 Deutsch
                  </button>
                </div>
              </div>
              
              {/* Mobile Mission Note */}
              <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-primary-600 fill-current" />
                  <span className="text-xs font-semibold text-primary-900">{t('handcraftedWithLove')}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {t('supportingCommunities')} • {t('preservingTraditions')}
                </p>
              </div>
            </nav>
          </div>
        </div>
      )}
      </header>
    </>
  )
}