import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'

export default function ProductSections() {
  const { t } = useLanguage()
  
  const productCategories = [
    {
      id: 'storage-baskets',
      title: t('storageBasketsTitle'),
      description: t('storageBasketsDescription'),
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      href: '/collections/storage-baskets',
      cta: t('shopLiddedBaskets')
    },
    {
      id: 'kitchen-dining',
      title: t('kitchenDiningTitle'),
      description: t('kitchenDiningDescription'),
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
      href: '/collections/kitchen-dining',
      cta: t('shopKitchenEssentials')
    }
  ]
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="space-y-20">
          {productCategories.map((category, index) => (
            <div 
              key={category.id} 
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
                    {category.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>{t('handwovenByArtisans')}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>{t('sustainableMaterials')}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>{t('uniquePatterns')}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>{t('fairTradeCertified')}</span>
                    </li>
                  </ul>
                </div>
                
                <Link href={category.href}>
                  <a className="btn-primary group inline-flex items-center">
                    {category.cta}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Link>
              </div>
              
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={category.image}
                    alt={`${category.title} collection`}
                    width={600}
                    height={500}
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-sm font-semibold text-gray-900">Handcrafted</span>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className={`absolute w-24 h-24 rounded-full opacity-60 -z-10 ${
                  index % 2 === 0 
                    ? '-top-6 -right-6 bg-accent-200' 
                    : '-bottom-6 -left-6 bg-primary-200'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}