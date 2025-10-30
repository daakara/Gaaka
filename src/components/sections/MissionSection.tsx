import Link from 'next/link'
import Image from 'next/image'
import { Heart, Users, GraduationCap, ArrowRight, Sparkles, Star, Globe } from 'lucide-react'
import { useLanguage } from '../../lib/i18n'

export default function MissionSection() {
  const { t } = useLanguage()
  
  const impactStats = [
    {
      icon: Users,
      number: '200+',
      label: t('artisansSupported'),
      description: t('creatingEmployment')
    },
    {
      icon: GraduationCap,
      number: '15%',
      label: t('profitsToEducation'),
      description: t('fundingEducation')
    },
    {
      icon: Heart,
      number: '5000+',
      label: t('happyCustomers'),
      description: t('bringingBeauty')
    }
  ]
  return (
    <section className="relative section-padding bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-amber-400 rounded-full blur-2xl animate-pulse delay-1500"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-red-400 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Artistic Content */}
          <div className="space-y-12">
            {/* Creative Mission Header */}
            <div className="relative">
              <div className="absolute -top-8 -left-8 text-6xl opacity-15 font-bold text-orange-600">🌍</div>
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-gray-900 mb-2">empowering</span>
                  <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent font-black">
                    communities
                  </span>
                </h2>
                
                {/* Artistic subtitle */}
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-orange-500 animate-pulse" />
                  <p className="text-xl text-gray-700 italic font-light">
                    weaving hope across continents
                  </p>
                </div>
              </div>
            </div>

            {/* Storytelling Content */}
            <div className="space-y-6">
              <div className="border-l-4 border-orange-400 pl-6">
                <p className="text-xl text-gray-700 leading-relaxed font-light mb-4">
                  {t('missionDescription1')}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('missionDescription2')}
                </p>
              </div>
              
              {/* Impact Story */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-orange-200 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Our Promise</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Every purchase creates ripples of change—from the artisan's hands to the child's education, 
                      from tradition preserved to futures built.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Artistic Impact Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {impactStats.map((stat, index) => {
                const Icon = stat.icon
                const gradients = [
                  'from-amber-500 to-orange-600',
                  'from-orange-500 to-red-600', 
                  'from-red-500 to-pink-600'
                ]
                return (
                  <div key={index} className="group text-center">
                    {/* Artistic Card */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-orange-100">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-4xl font-black text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {stat.number}
                      </div>
                      <div className="font-bold text-gray-800 mb-2 text-lg">{stat.label}</div>
                      <div className="text-sm text-gray-600 leading-relaxed">{stat.description}</div>
                      
                      {/* Artistic accent */}
                      <div className="mt-4 flex justify-center">
                        <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Artistic CTA */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/mission">
                <a className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center">
                  <span className="relative z-10 flex items-center">
                    {t('learnAboutMission')}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </Link>
            </div>
          </div>

          {/* Artistic Image Collage */}
          <div className="relative group">
            {/* Creative Decorative Elements */}
            <div className="absolute -top-16 -right-16 w-40 h-40 border-4 border-orange-300 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-gradient-to-br from-red-400 to-pink-400 rounded-lg rotate-12 opacity-60 group-hover:rotate-45 transition-transform duration-700"></div>
            
            {/* Artistic Grid Layout */}
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-6">
                {/* Large featured image */}
                <div className="col-span-2 relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                  <Image
                    src="https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-34copy_800x.jpg"
                    alt="Artisan weaving traditional African Taya basket"
                    width={600}
                    height={300}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Artistic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Story label */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-orange-500 fill-current" />
                      <span className="text-sm font-bold text-gray-900">Master Artisan at Work</span>
                    </div>
                  </div>
                </div>
                
                {/* Two artistic smaller images */}
                <div className="relative overflow-hidden rounded-3xl shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="African students in classroom"
                    width={290}
                    height={200}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Education badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full shadow-lg">
                    <span className="text-xs font-bold">Education</span>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-3xl shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src="https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-32copy_800x.jpg"
                    alt="Handwoven African Natty storage basket"
                    width={290}
                    height={200}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Craft badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg">
                    <span className="text-xs font-bold">Handcrafted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Artistic Fair Trade Badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl shadow-2xl p-6 transform rotate-3 group-hover:rotate-6 transition-transform duration-500">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-lg font-black">Fair Trade</span>
                </div>
                <div className="text-sm font-medium opacity-90">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}