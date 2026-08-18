import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'

export default function ProductSections() {
  const { t } = useLanguage()
  
  const productCategories = [
    {
      id: 'storage-baskets',
      title: t('storageBasketsTitle'),
      description: t('storageBasketsDescription'),
      image: 'https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-35copy_800x.jpg',
      href: '/collections/storage-baskets',
      cta: t('shopLiddedBaskets')
    },
    {
      id: 'kitchen-dining',
      title: t('kitchenDiningTitle'),
      description: t('kitchenDiningDescription'),
      image: 'https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-32copy_800x.jpg',
      href: '/collections/kitchen-dining',
      cta: t('shopKitchenEssentials')
    }
  ]

  return (
    <section className="section-padding bg-amber-50/40 overflow-hidden border-b border-gray-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-3">
            {t('curatedCollections')}
          </h2>
          <div className="flex items-center justify-center gap-2 text-primary-700">
            <Star className="w-4 h-4 fill-current" />
            <p className="text-base sm:text-lg italic font-medium">{t('eachPieceStory')}</p>
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>
        
        <div className="space-y-20">
          {productCategories.map((category, index) => (
            <div 
              key={category.id} 
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}
            >
              {/* Content Column */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-3">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                    {category.title}
                  </h3>
                  
                  <div className="border-l-4 border-primary-500 pl-4">
                    <p className="text-base text-gray-700 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Heart className="w-4 h-4 text-primary-600 fill-current" />
                      <p className="text-sm text-gray-600 italic">
                        {t('handcraftedInKenya')}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Features Grid */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{t('handwovenByArtisans')}</p>
                        <p className="text-[11px] text-gray-500">{t('authenticCraft')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{t('sustainableMaterials')}</p>
                        <p className="text-[11px] text-gray-500">{t('ecoFriendly')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary-100 text-primary-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{t('uniquePatterns')}</p>
                        <p className="text-[11px] text-gray-500">{t('oneOfAKind')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 text-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{t('fairTradeCertified')}</p>
                        <p className="text-[11px] text-gray-500">{t('fairWages')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTA */}
                <div>
                  <Link href={category.href}>
                    <a className="btn-primary inline-flex items-center gap-2">
                      <span>{category.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Link>
                </div>
              </div>
              
              {/* Image Column */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={`${category.title} collection`}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Handcrafted Badge */}
                  <div className="absolute top-4 left-4 bg-primary-700 text-white px-3.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('handwoven')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}