import Link from 'next/link'
import Image from 'next/image'
import { Heart, Users, GraduationCap, ArrowRight } from 'lucide-react'
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
    <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
                {t('empoweringCommunities')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t('missionDescription1')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('missionDescription2')}
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {impactStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="font-semibold text-gray-800 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </div>
                )
              })}
            </div>

            <Link href="/mission">
              <a className="btn-primary group inline-flex items-center">
                {t('learnAboutMission')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Link>
          </div>

          {/* Image Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Large image */}
              <div className="col-span-2">
                <Image
                  src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80"
                  alt="Artisan weaving traditional African basket"
                  width={600}
                  height={300}
                  className="rounded-xl object-cover shadow-lg"
                />
              </div>
              
              {/* Two smaller images */}
              <div>
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="African students in classroom"
                  width={290}
                  height={200}
                  className="rounded-xl object-cover shadow-lg"
                />
              </div>
              <div>
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Community workshop"
                  width={290}
                  height={200}
                  className="rounded-xl object-cover shadow-lg"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-primary-100">
              <div className="text-center">
                <div className="text-lg font-bold text-primary-600">Fair Trade</div>
                <div className="text-sm text-gray-600">Certified</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent-200 rounded-full opacity-60 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}