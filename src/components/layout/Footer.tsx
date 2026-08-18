import Link from 'next/link'
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
    <footer className="bg-gray-900 text-white relative">
      {/* Newsletter Section */}
      <div className="bg-primary-800 border-b border-primary-700">
        <div className="container-custom py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-300" />
              <h2 className="text-3xl font-bold text-white tracking-tight">{t('joinCommunity')}</h2>
              <Star className="w-5 h-5 text-amber-300" />
            </div>
            <p className="text-primary-100 mb-8 text-base sm:text-lg leading-relaxed">
              {t('newsletterDescription')}
            </p>
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {t('enterEmail')}
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder={t('enterEmail')}
                className="flex-1 px-5 py-3.5 rounded-xl bg-primary-900/60 border border-primary-600 text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-primary-900"
              />
              <button 
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-6 py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                aria-label={t('subscribe')}
              >
                <Mail className="w-4 h-4" />
                <span>{t('subscribe')}</span>
              </button>
            </form>
            
            {/* Newsletter benefits */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-primary-200 text-sm">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-amber-300 fill-current" />
                <span>{t('exclusiveStories')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t('firstAccess')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-300" />
                <span>{t('artisanUpdates')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/">
              <a className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center font-black text-xl text-white">
                  G
                </div>
                <div>
                  <span className="text-2xl font-black text-white tracking-tight">GAAKA</span>
                  <p className="text-xs text-amber-400 font-medium">african artistry</p>
                </div>
              </a>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('footerTagline')}
            </p>
            
            {/* Social Links */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                {t('connectWithUs')}
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link key={social.name} href={social.href}>
                      <a
                        className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors text-gray-300 hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow GAAKA on ${social.name}`}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">
              {t('shop')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">
              {t('company')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">
              {t('support')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary-500 fill-current" />
            <span>© {new Date().getFullYear()} {t('footerCopyright')}</span>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} href={link.href}>
                <a className="hover:text-gray-300 transition-colors">
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}