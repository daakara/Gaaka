import Link from 'next/link'
import Image from 'next/image'
import { Heart, Users, GraduationCap, ArrowRight, Star, Globe } from 'lucide-react'
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
    <section className="section-padding bg-white overflow-hidden border-b border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission Details & Impact */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-primary-700" />
                {t('sustainablePurpose')}
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {t('empoweringCommunities')}
              </h2>
              
              <p className="text-base sm:text-lg text-gray-600 italic">
                {t('weavingHope')}
              </p>
            </div>

            {/* Story Text */}
            <div className="space-y-4 border-l-4 border-primary-500 pl-5">
              <p className="text-base text-gray-700 leading-relaxed">
                {t('missionDescription1')}
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                {t('missionDescription2')}
              </p>
            </div>
            
            {/* Our Promise Callout */}
            <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200/80">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{t('ethicalPromise')}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t('ethicalPromiseBody')}
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {impactStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="font-semibold text-gray-800 text-sm mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div>
              <Link href="/mission">
                <a className="btn-primary inline-flex items-center gap-2">
                  <span>{t('learnAboutMission')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Collage */}
          <div className="relative">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <Image
                  src="https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-34copy_800x.jpg"
                  alt="Artisan weaving traditional African Taya basket"
                  width={600}
                  height={340}
                  className="object-cover w-full"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 rounded-lg px-3 py-1.5 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-primary-600 fill-current" />
                    <span className="text-xs font-bold text-gray-900">{t('masterArtisanAtWork')}</span>
                  </div>
                </div>
              </div>
              
              {/* Two Column Sub Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="African students in classroom funded by education initiative"
                    width={300}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-primary-800 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    {t('educationLabel')}
                  </div>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-200">
                  <Image
                    src="https://expeditionsubsahara.com/cdn/shop/products/ES_Oct_Product-32copy_800x.jpg"
                    alt="Handwoven African Natty storage basket close up"
                    width={300}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-amber-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    {t('handcrafted')}
                  </div>
                </div>
              </div>
            </div>

            {/* Fair Trade Badge */}
            <div className="absolute -top-3 -right-3 bg-emerald-700 text-white rounded-2xl shadow-lg px-4 py-2.5 text-center">
              <span className="text-sm font-black block">{t('fairTrade')}</span>
              <span className="text-xs opacity-90 block">{t('certifiedEthical')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}