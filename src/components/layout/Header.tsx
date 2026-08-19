'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Heart, Sparkles, ShoppingBag, Grid, ChevronRight, Package, ShieldCheck, Mail, BookOpen, Users, HelpCircle, Truck, RefreshCw, FileText, Globe } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'
import { useCart } from '../../contexts/CartContext'
import LanguageToggle from '../ui/LanguageToggle'
import SearchComponent from '../common/Search'
import { Drawer } from '../ui/Drawer'
import { MobileDock } from '../ui/MobileDock'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, language, setLanguage } = useLanguage()
  const { state, toggleCart } = useCart()

  // Primary desktop navbar links
  const primaryNav = [
    { name: t('home'), href: '/' },
    { name: t('storageBaskets'), href: '/collections/storage-baskets' },
    { name: t('kitchenDining'), href: '/collections/kitchen-dining' },
    { name: t('wallBaskets'), href: '/collections/wall-baskets' },
    { name: t('about'), href: '/about' },
  ]

  // Full comprehensive catalog & site directory for drawer (mobile + desktop)
  const collectionLinks = [
    { name: 'All Handwoven Baskets', href: '/collections/all', icon: Grid, badge: 'Full Shop' },
    { name: t('storageBaskets'), href: '/collections/storage-baskets', icon: Package, badge: 'Popular' },
    { name: t('kitchenDining'), href: '/collections/kitchen-dining', icon: Sparkles },
    { name: t('wallBaskets'), href: '/collections/wall-baskets', icon: Heart },
  ]

  const storyLinks = [
    { name: t('about'), href: '/about', icon: Users },
    { name: t('mission'), href: '/mission', icon: ShieldCheck, badge: 'Fair Trade' },
    { name: t('artisanStories'), href: '/artisan-stories', icon: Heart },
    { name: t('blog'), href: '/blog', icon: BookOpen },
  ]

  const customerCareLinks = [
    { name: t('faq'), href: '/faq', icon: HelpCircle },
    { name: t('shipping'), href: '/shipping', icon: Truck },
    { name: t('returns'), href: '/returns', icon: RefreshCw },
    { name: t('contact'), href: '/contact', icon: Mail },
  ]

  const legalLinks = [
    { name: t('termsOfService'), href: '/terms' },
    { name: t('privacyPolicy'), href: '/privacy-policy' },
  ]

  const announcementText = language === 'de'
    ? 'Authentische handgefertigte kenianische Körbe • Fairer Handel'
    : 'Authentic Handcrafted Kenyan Baskets • Fair Trade'

  return (
    <>
      {/* Skip to Main Content for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:bg-primary-700 focus:text-white focus:rounded-xl focus:shadow-xl focus:font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        Skip to main content
      </a>

      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-amber-100/80 shadow-sm transition-all duration-200">
        {/* Top Banner */}
        <div className="bg-primary-800 text-white text-center py-2 px-4 text-xs sm:text-sm font-medium tracking-wide">
          <Link href="/collections/all">
            <a className="inline-flex items-center justify-center gap-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-md py-0.5 px-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{announcementText}</span>
              <Heart className="w-3.5 h-3.5 text-red-300 fill-current shrink-0" />
            </a>
          </Link>
        </div>

        {/* Main Header */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Universal Burger Menu Button (Visible on Mobile, Tablet & Desktop) */}
            <div className="flex items-center">
              <button
                type="button"
                className="h-11 px-3 sm:px-3.5 rounded-2xl flex items-center gap-2 text-gray-700 hover:text-primary-700 bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/70 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 active:scale-95 shadow-sm"
                onClick={() => setMenuOpen(true)}
                aria-label="Open comprehensive site menu"
                aria-expanded={menuOpen}
                aria-controls="main-site-drawer"
              >
                <Menu className="h-5 w-5 text-primary-800" />
                <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-gray-800">
                  Menu
                </span>
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/">
                <a className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl p-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-md group-hover:bg-primary-700 transition-colors">
                    <span className="font-black text-xl tracking-wider">G</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight block">
                      GAAKA
                    </span>
                    <p className="text-[11px] text-primary-700 font-medium tracking-wide -mt-1">african artistry</p>
                  </div>
                </a>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 justify-center px-8 max-w-md">
              <SearchComponent />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
              {primaryNav.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className="relative px-3.5 py-2 rounded-xl text-gray-700 hover:text-primary-700 font-medium transition-colors hover:bg-amber-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
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
              {/* Mobile Language Toggle */}
              <div className="sm:hidden">
                <LanguageToggle variant="icon-only" />
              </div>
              
              <Link href="/collections/all">
                <a 
                  className="p-2.5 text-gray-700 hover:text-primary-700 hover:bg-amber-50 rounded-xl transition-colors lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Search all products"
                >
                  <Search className="h-5 w-5" />
                </a>
              </Link>

              <button 
                onClick={toggleCart}
                className="relative p-2.5 text-gray-700 hover:text-primary-700 hover:bg-amber-50 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={`Shopping cart with ${state.itemCount} items`}
                type="button"
              >
                <ShoppingBag className="h-6 w-6" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center font-bold shadow-sm animate-scaleUp">
                    {state.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Full Comprehensive Drawer (Watermelon UI Sheet - Mobile + Tablet + Desktop) */}
        <Drawer
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          title="Full Site Directory"
          side="left"
        >
          {/* Quick Search inside Drawer */}
          <div>
            <SearchComponent />
          </div>

          {/* Section 1: Collections Catalog */}
          <div className="space-y-1">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-primary-800 px-3 mb-2 flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5" />
              <span>Shop Handwoven Baskets</span>
            </p>
            {collectionLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <a
                    className="flex items-center justify-between text-gray-900 hover:text-primary-700 font-semibold py-2.5 px-3.5 rounded-2xl hover:bg-amber-50 transition-colors border border-transparent hover:border-amber-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-primary-700 flex items-center justify-center border border-amber-200/50 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    {item.badge ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-primary-800 border border-amber-200">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </a>
                </Link>
              )
            })}
          </div>

          {/* Section 2: Our Story & Impact */}
          <div className="pt-4 border-t border-gray-100 space-y-1">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-primary-800 px-3 mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Our Story & Impact</span>
            </p>
            {storyLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <a
                    className="flex items-center justify-between text-gray-900 hover:text-primary-700 font-semibold py-2.5 px-3.5 rounded-2xl hover:bg-amber-50 transition-colors border border-transparent hover:border-amber-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-primary-700 flex items-center justify-center border border-amber-200/50 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    {item.badge ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </a>
                </Link>
              )
            })}
          </div>

          {/* Section 3: Customer Care & Policies */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-primary-800 px-3 mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Customer Care & Policies</span>
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {customerCareLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.name} href={item.href}>
                    <a 
                      onClick={() => setMenuOpen(false)}
                      className="p-3 bg-amber-50/60 hover:bg-amber-100/70 rounded-2xl text-gray-800 flex flex-col items-center justify-center gap-1.5 text-center transition-colors border border-amber-100/80"
                    >
                      <Icon className="w-4 h-4 text-primary-700" />
                      <span>{item.name}</span>
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Section 4: Language Selection */}
          <div className="pt-4 border-t border-gray-100">
            <p className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2.5 px-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary-700" />
              <span>{t('chooseLanguage')}</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setLanguage('en'); setMenuOpen(false); }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Switch to English"
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                onClick={() => { setLanguage('de'); setMenuOpen(false); }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  language === 'de'
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Switch to German"
              >
                🇩🇪 Deutsch
              </button>
            </div>
          </div>

          {/* Section 5: Legal Links */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between px-2 text-[11px] text-gray-500 font-medium">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a 
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-primary-700 hover:underline transition-colors"
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>

          {/* Section 6: Direct Artisan Impact Card */}
          <div className="bg-gradient-to-br from-amber-100/90 to-orange-100/60 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-primary-700 shrink-0" />
              <span className="text-xs font-bold text-primary-900">Direct Artisan Impact</span>
            </div>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              100% sustainably handwoven by female artisan cooperatives in rural Kenya with fair living wages and 15% profits reinvested into community education.
            </p>
          </div>
        </Drawer>

        {/* Mobile Floating Bottom Dock (Thumb-friendly Navigation) */}
        <MobileDock 
          onOpenMenu={() => setMenuOpen(true)}
        />
      </header>
    </>
  )
}