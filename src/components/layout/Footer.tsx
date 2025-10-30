import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail, Heart, Sparkles, Star, Globe } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/gaaka', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/gaaka', icon: Instagram },
  { name: 'Twitter', href: 'https://twitter.com/gaaka', icon: Twitter },
]

export default function Footer() {
  const { t } = useLanguage()
  
  const footerLinks = {
    shop: [
      { name: t('storageBaskets'), href: '/collections/storage-baskets' },
      { name: t('kitchenDining'), href: '/collections/kitchen-dining' },
      { name: t('wallBaskets'), href: '/collections/wall-baskets' },
      { name: t('giftCards'), href: '/gift-cards' },
    ],
    company: [
      { name: t('about'), href: '/about' },
      { name: t('mission'), href: '/mission' },
      { name: t('blog'), href: '/blog' },
      { name: t('artisanStories'), href: '/artisan-stories' },
    ],
    support: [
      { name: t('contact'), href: '/contact' },
      { name: t('faq'), href: '/faq' },
      { name: t('shipping'), href: '/shipping' },
      { name: t('returns'), href: '/returns' },
    ],
    legal: [
      { name: t('privacyPolicy'), href: '/privacy-policy' },
      { name: t('termsOfService'), href: '/terms' },
      { name: t('imprint'), href: '/imprint' },
      { name: t('gdpr'), href: '/gdpr' },
    ],
  }
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-orange-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-400 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Artistic Newsletter Section */}
      <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="container-custom py-16 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="w-6 h-6 animate-pulse" />
              <h2 className="text-3xl sm:text-4xl font-bold">{t('joinCommunity')}</h2>
              <Star className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              {t('newsletterDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder={t('enterEmail')}
                className="flex-1 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300"
              />
              <button className="bg-white text-orange-600 font-bold px-8 py-4 rounded-2xl hover:bg-orange-50 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap flex items-center gap-2">
                <Mail className="w-5 h-5" />
                {t('subscribe')}
              </button>
            </div>
            
            {/* Newsletter benefits */}
            <div className="flex items-center justify-center gap-8 mt-8 text-orange-100">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-sm">Exclusive Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">First Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Artisan Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artistic Main Footer Content */}
      <div className="container-custom py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Artistic Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <a className="flex items-center mb-8 group">
                <div className="relative">
                  <div className="w-16 h-16 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                    <Image
                      src="/images/GAAKA.png"
                      alt="GAAKA Logo"
                      width={64}
                      height={64}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                </div>
              </a>
            </Link>
            
            {/* Artistic Description */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3 text-amber-400">Our Story</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Handcrafted Kenyan storage baskets that combine modern design with traditional craftsmanship. 
                    Each piece tells a story and supports artisan communities across Kenya.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Artistic Social Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  const gradients = [
                    'from-blue-500 to-blue-600',
                    'from-pink-500 to-purple-600',
                    'from-blue-400 to-cyan-500'
                  ]
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                    >
                      <a
                        className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl group`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="h-6 w-6 text-white group-hover:animate-pulse" />
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Artistic Shop Links */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h3 className="font-bold text-amber-400 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              {t('shop')}
            </h3>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-300 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artistic Company Links */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h3 className="font-bold text-orange-400 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              {t('company')}
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-300 hover:text-orange-400 transition-all duration-300 flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artistic Support Links */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h3 className="font-bold text-red-400 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              {t('support')}
            </h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-300 hover:text-red-400 transition-all duration-300 flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Artistic Bottom Bar */}
        <div className="border-t border-gray-700 mt-16 pt-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400 fill-current animate-pulse" />
                  <p className="text-gray-300">
                    © 2025 GAAKA. Crafted with love.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Supporting 200+ artisan families</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6 justify-center lg:justify-end">
                {footerLinks.legal.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                  >
                    <a className="text-gray-400 hover:text-amber-400 text-sm transition-all duration-300 flex items-center gap-1 group">
                      <div className={`w-1 h-1 ${
                        index % 4 === 0 ? 'bg-amber-400' :
                        index % 4 === 1 ? 'bg-orange-400' :
                        index % 4 === 2 ? 'bg-red-400' :
                        'bg-pink-400'
                      } rounded-full group-hover:scale-150 transition-transform duration-300`}></div>
                      {link.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Artisan dedication */}
            <div className="text-center mt-8 pt-6 border-t border-gray-600">
              <div className="flex items-center justify-center gap-3 text-gray-400 italic">
                <Globe className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-sm">
                  Every purchase weaves a story of tradition, community, and hope
                </span>
                <Globe className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}