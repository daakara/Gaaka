import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Home, Grid, Search, ShoppingBag, Menu } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

interface MobileDockProps {
  onOpenMenu: () => void
  onOpenSearch?: () => void
}

export function MobileDock({ onOpenMenu, onOpenSearch }: MobileDockProps) {
  const router = useRouter()
  const { state, toggleCart } = useCart()

  const isActive = (path: string) => {
    if (!router) return false
    const currentPath = router.pathname || ''
    const currentAsPath = router.asPath || ''
    if (path === '/' && currentPath === '/') return true
    if (path !== '/' && currentAsPath.startsWith(path)) return true
    return false
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t border-amber-200/80 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] safe-area-pb"
      role="navigation"
      aria-label="Mobile Navigation Bar"
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {/* Home */}
        <Link href="/">
          <a 
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              isActive('/') 
                ? 'text-primary-700 font-bold scale-105' 
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
            aria-label="Home page"
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </a>
        </Link>

        {/* Shop / Collections */}
        <Link href="/collections/all">
          <a 
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              isActive('/collections') 
                ? 'text-primary-700 font-bold scale-105' 
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
            aria-label="Shop all collections"
          >
            <Grid className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Shop</span>
          </a>
        </Link>

        {/* Quick Search */}
        <Link href="/collections/all">
          <a 
            onClick={onOpenSearch}
            className="flex flex-col items-center justify-center flex-1 py-1 text-gray-500 hover:text-gray-900 font-medium transition-all"
            aria-label="Search products"
          >
            <div className="w-10 h-10 -mt-5 rounded-full bg-primary-700 text-white flex items-center justify-center shadow-lg shadow-primary-700/30 hover:scale-110 active:scale-95 transition-transform">
              <Search className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Search</span>
          </a>
        </Link>

        {/* Cart */}
        <button
          type="button"
          onClick={toggleCart}
          className="relative flex flex-col items-center justify-center flex-1 py-1 text-gray-500 hover:text-gray-900 font-medium transition-all"
          aria-label={`Open shopping cart with ${state.itemCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {state.itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-amber-600 text-white text-[10px] font-extrabold rounded-full h-4 min-w-[1rem] px-1 flex items-center justify-center shadow-sm animate-scaleUp">
                {state.itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </button>

        {/* Menu / Categories */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center flex-1 py-1 text-gray-500 hover:text-gray-900 font-medium transition-all"
          aria-label="Open main menu"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Menu</span>
        </button>
      </div>
    </div>
  )
}
