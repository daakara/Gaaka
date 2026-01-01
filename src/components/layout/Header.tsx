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
  const { t } = useLanguage()
  const { state, toggleCart } = useCart()

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('storageBaskets'), href: '/collections/storage-baskets' },
    { name: t('kitchenDining'), href: '/collections/kitchen-dining' },
    { name: t('wallBaskets'), href: '/collections/wall-baskets' },
    { name: t('giftCards'), href: '/gift-cards' },
    { name: t('about'), href: '/about' },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-amber-100">
      {/* Artistic Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white text-center py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <Link href="/collections/all">
          <a className="relative z-10 hover:underline flex items-center justify-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 animate-pulse" />
            {t('freeShipping')}
            <Heart className="w-4 h-4 animate-pulse fill-current" />
          </a>
        </Link>
      </div>

      {/* Artistic Main Header */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Artistic Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="p-3 rounded-full text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open main menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Artistic Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
                  <span className="text-white font-black text-xl">G</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-black bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  GAAKA
                </span>
                <p className="text-xs text-gray-600 font-medium -mt-1">african artistry</p>
              </div>
              </a>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <SearchComponent />
          </div>

          {/* Artistic Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <a className="relative group px-4 py-2 rounded-full text-gray-700 hover:text-amber-700 font-semibold transition-all duration-300 hover:bg-amber-50">
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                  )}
                </a>
              </Link>
            ))}
          </nav>

          {/* Artistic Right side icons */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            <button 
              className="p-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all duration-300 hover:scale-105 lg:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button 
              className="p-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-300 hover:scale-105"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </button>
            <button 
              onClick={toggleCart}
              className="relative p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300 hover:scale-105 group"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                  {state.itemCount}
                </span>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Artistic Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden animate-fadeIn">
          <div className="fixed inset-y-0 left-0 w-80 bg-gradient-to-br from-white via-amber-25 to-orange-25 shadow-2xl transform animate-slideInLeft relative overflow-hidden">
            {/* Artistic Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 right-10 w-32 h-32 bg-amber-400 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-40 left-10 w-24 h-24 bg-orange-400 rounded-full blur-lg animate-pulse delay-1000"></div>
              <div className="absolute top-60 right-20 w-16 h-16 bg-red-400 rounded-full blur-md animate-pulse delay-500"></div>
            </div>
            {/* Enhanced Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-amber-100 bg-white/90 backdrop-blur-md relative z-10">
              <Link href="/">
                <a className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                    <span className="text-white font-black text-xl">G</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                  {/* Artistic sparkle effect */}
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-red-400 rounded-full animate-pulse delay-500"></div>
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                    GAAKA
                  </span>
                  <p className="text-xs text-gray-600 font-medium -mt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    african artistry
                  </p>
                </div>
                </a>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-110 group"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Enhanced Mobile Navigation */}
            <nav className="p-6 relative z-10 h-full overflow-y-auto">
              <div className="space-y-4">
                {/* Mobile Search */}
                <div className="px-2 pb-4">
                  <SearchComponent />
                </div>

                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-4 mb-6 border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white fill-current" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Welcome to GAAKA</p>
                      <p className="text-xs text-gray-600">Discover African artistry</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Navigation Items */}
                {navigation.map((item, index) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className="flex items-center gap-4 text-gray-700 hover:text-amber-700 font-semibold py-4 px-5 rounded-3xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                        index % 4 === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                        index % 4 === 1 ? 'bg-gradient-to-br from-orange-400 to-red-500' :
                        index % 4 === 2 ? 'bg-gradient-to-br from-red-400 to-pink-500' :
                        'bg-gradient-to-br from-pink-400 to-purple-500'
                      } group-hover:scale-110`}>
                        <div className={`w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform duration-300`}></div>
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-base">{item.name}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className={`w-1 h-1 rounded-full ${
                          index % 4 === 0 ? 'bg-amber-400' :
                          index % 4 === 1 ? 'bg-orange-400' :
                          index % 4 === 2 ? 'bg-red-400' :
                          'bg-pink-400'
                        }`}></div>
                        <div className={`w-1 h-1 rounded-full ${
                          index % 4 === 0 ? 'bg-amber-300' :
                          index % 4 === 1 ? 'bg-orange-300' :
                          index % 4 === 2 ? 'bg-red-300' :
                          'bg-pink-300'
                        }`}></div>
                        <div className={`w-1 h-1 rounded-full ${
                          index % 4 === 0 ? 'bg-amber-200' :
                          index % 4 === 1 ? 'bg-orange-200' :
                          index % 4 === 2 ? 'bg-red-200' :
                          'bg-pink-200'
                        }`}></div>
                      </div>
                    </div>
                    <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </a>
                  </Link>
                ))}
                
                {/* Enhanced Language Toggle Section */}
                <div className="pt-8 mt-8 border-t border-amber-200">
                  <div className="bg-gradient-to-r from-white/90 to-amber-50/90 backdrop-blur-sm rounded-3xl p-6 border border-amber-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🌍</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Language</p>
                        <p className="text-xs text-gray-600">Choose your preferred language</p>
                      </div>
                    </div>
                    <LanguageToggle />
                  </div>
                </div>
                
                {/* Enhanced Artistic Mobile Footer */}
                <div className="mt-8 text-center pb-8">
                  <div className="bg-gradient-to-r from-gray-50 to-amber-50 rounded-3xl p-6 border border-amber-100">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Heart className="w-5 h-5 text-red-400 fill-current animate-pulse" />
                      <span className="text-sm font-medium text-gray-700">handcrafted with love</span>
                      <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
                      <span>Supporting artisan communities</span>
                      <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-300"></div>
                      <span>Preserving traditions</span>
                      <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse delay-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}