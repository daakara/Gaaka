import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
                <span className="text-gradient">{t('liveColorfully')}</span>
              </h1>
              <p className="text-xl text-gray-700 mt-4 leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              {t('heroDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/collections/all"
                className="btn-primary group inline-flex items-center"
              >
                {t('shopCollection')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link href="/about" className="btn-outline">
                {t('ourStory')}
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{t('handcraftedQuality')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{t('ethicallySourced')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{t('fairTrade')}</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80"
                alt="Beautiful handwoven African storage basket"
                width={600}
                height={700}
                className="rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary-200 rounded-full opacity-60 -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent-200 rounded-full opacity-60 -z-10"></div>
            
            {/* Floating Badge */}
            <div className="absolute top-8 -right-4 bg-white rounded-xl shadow-lg p-4 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t('madeWithLove')}</p>
                  <p className="text-gray-600 text-xs">{t('supporting')} 200+ {t('artisans')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" fillOpacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>
    </section>
  )
}