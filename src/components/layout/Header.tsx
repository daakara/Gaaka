'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, Search, User, Sparkles, Heart } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'
import { useCart } from '../../contexts/CartContext'
import LanguageToggle from '../ui/LanguageToggle'

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

          {/* Artistic Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
              >
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
            <button className="p-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all duration-300 hover:scale-105">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all duration-300 hover:scale-105">
              <User className="h-5 w-5" />
            </button>
            <button 
              onClick={toggleCart}
              className="relative p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300 hover:scale-105 group"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden">
          <div className="fixed inset-y-0 left-0 w-80 bg-gradient-to-br from-white via-amber-25 to-orange-25 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-amber-100 bg-white/80 backdrop-blur-sm">
              <Link href="/">
                <a className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">G</span>
                  </div>
                  <div>
                    <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">GAAKA</span>
                    <p className="text-xs text-gray-600 -mt-1">african artistry</p>
                  </div>
                </a>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="p-6">
              <div className="space-y-3">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                  >
                    <a
                      className="flex items-center gap-3 text-gray-700 hover:text-amber-700 font-semibold py-3 px-4 rounded-2xl hover:bg-white/60 transition-all duration-300 group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        index % 4 === 0 ? 'bg-amber-400' :
                        index % 4 === 1 ? 'bg-orange-400' :
                        index % 4 === 2 ? 'bg-red-400' :
                        'bg-pink-400'
                      } group-hover:scale-150 transition-transform duration-300`}></div>
                      {item.name}
                    </a>
                  </Link>
                ))}
                
                <div className="pt-6 mt-6 border-t border-amber-200">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4">
                    <LanguageToggle />
                  </div>
                </div>
                
                {/* Artistic Mobile Footer */}
                <div className="mt-8 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
                    <span className="text-sm italic">handcrafted with love</span>
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
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