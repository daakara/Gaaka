import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'
import { getAllProductCategories } from '../../lib/wordpress'

export default function ProductSections({ productCategories }) {
  const { t } = useLanguage()
  
  return (
    <section className="relative section-padding bg-gradient-to-br from-amber-25 via-orange-25 to-red-25 overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-80 h-80 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-orange-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="absolute -top-4 -left-4 text-4xl opacity-20">🎨</div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-gray-900 mb-2">curated</span>
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-black">
                collections
              </span>
            </h2>
          </div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <p className="text-xl text-gray-700 italic">each piece with its own story</p>
            <Star className="w-5 h-5 text-amber-500 fill-current" />
          </div>
        </div>
        
        <div className="space-y-32">
          {productCategories.map((category, index) => (
            <div 
              key={category.id} 
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Artistic Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                {/* Creative Header */}
                <div className="relative">
                  <div className={`absolute -top-8 ${index % 2 === 0 ? '-left-6' : '-right-6'} text-5xl opacity-15 font-bold ${index % 2 === 0 ? 'text-amber-600' : 'text-orange-600'}`}>
                    {index % 2 === 0 ? '🧺' : '🍯'}
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                    <span className="block text-gray-900 mb-2">{category.title.split(' ')[0]}</span>
                    <span className={`block bg-gradient-to-r ${index % 2 === 0 ? 'from-amber-600 to-orange-600' : 'from-orange-600 to-red-600'} bg-clip-text text-transparent font-black`}>
                      {category.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h3>
                  
                  {/* Storytelling Description */}
                  <div className={`border-l-4 ${index % 2 === 0 ? 'border-amber-400' : 'border-orange-400'} pl-6`}>
                    <p className="text-xl text-gray-700 leading-relaxed font-light mb-4">
                      {category.description}
                    </p>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                    <p className="text-lg text-gray-600 italic">
                      handcrafted with love in Kenya
                    </p>
                  </div>
                  </div>
                </div>
                
                {/* Artistic Features */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-amber-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${index % 2 === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-orange-400 to-red-500'} rounded-full flex items-center justify-center`}>
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t('handwovenByArtisans')}</p>
                        <p className="text-xs text-gray-600">authentic craftsmanship</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${index % 2 === 0 ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} rounded-full flex items-center justify-center`}>
                        <Heart className="w-5 h-5 text-white fill-current" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t('sustainableMaterials')}</p>
                        <p className="text-xs text-gray-600">eco-friendly choice</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${index % 2 === 0 ? 'bg-gradient-to-br from-purple-400 to-pink-500' : 'bg-gradient-to-br from-yellow-400 to-orange-500'} rounded-full flex items-center justify-center`}>
                        <Star className="w-5 h-5 text-white fill-current" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t('uniquePatterns')}</p>
                        <p className="text-xs text-gray-600">no two alike</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${index % 2 === 0 ? 'bg-gradient-to-br from-teal-400 to-cyan-500' : 'bg-gradient-to-br from-rose-400 to-pink-500'} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t('fairTradeCertified')}</p>
                        <p className="text-xs text-gray-600">supporting communities</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Artistic CTA */}
                <Link href={category.href}>
                  <a className={`group relative overflow-hidden ${index % 2 === 0 ? 'bg-gradient-to-r from-amber-600 to-orange-600' : 'bg-gradient-to-r from-orange-600 to-red-600'} text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center`}>
                    <span className="relative z-10 flex items-center">
                      {category.cta}
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                    <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gradient-to-r from-red-600 to-pink-600'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </a>
                </Link>
              </div>
              
              {/* Artistic Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative group">
                  {/* Creative Decorative Elements */}
                  <div className={`absolute -top-12 ${index % 2 === 0 ? '-left-12' : '-right-12'} w-32 h-32 border-4 ${index % 2 === 0 ? 'border-amber-300' : 'border-orange-300'} rounded-full opacity-60 group-hover:scale-110 transition-transform duration-700`}></div>
                  <div className={`absolute -bottom-8 ${index % 2 === 0 ? '-right-8' : '-left-8'} w-20 h-20 ${index % 2 === 0 ? 'bg-gradient-to-br from-orange-400 to-red-400' : 'bg-gradient-to-br from-amber-400 to-orange-400'} rounded-lg rotate-45 opacity-70 group-hover:rotate-90 transition-transform duration-700`}></div>
                  
                  {/* Main Image Container */}
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                    <Image
                      src={category.image}
                      alt={`${category.title} collection`}
                      width={600}
                      height={500}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Artistic Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${index % 2 === 0 ? 'from-amber-900/30 via-orange-500/10' : 'from-red-900/30 via-orange-500/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Floating Artistic Badge */}
                    <div className={`absolute top-6 ${index % 2 === 0 ? 'left-6' : 'right-6'} ${index % 2 === 0 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-orange-500 to-red-500'} text-white px-4 py-2 rounded-full shadow-lg transform ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'} group-hover:${index % 2 === 0 ? 'rotate-6' : '-rotate-6'} transition-transform duration-500`}>
                      <span className="text-sm font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Handcrafted
                      </span>
                    </div>
                    
                    {/* Story Badge */}
                    <div className={`absolute bottom-6 ${index % 2 === 0 ? 'right-6' : 'left-6'} bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg`}>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">artisan made</p>
                          <p className="text-xs text-gray-600">from kenya with love</p>
                        </div>
                      </div>
                    </div>
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