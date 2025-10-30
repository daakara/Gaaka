import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'
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
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-600">
        <div className="container-custom py-12">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">{t('joinCommunity')}</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('newsletterDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('enterEmail')}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="btn-secondary whitespace-nowrap">
                {t('subscribe')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-heading font-bold">GAAKA</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Handcrafted African storage baskets that combine modern design with traditional craftsmanship. 
              Each piece tells a story and supports artisan communities across Africa.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">{t('shop')}</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">{t('support')}</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 GAAKA. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}