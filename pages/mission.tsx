import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Target, Globe, GraduationCap, Handshake } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function Mission() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('mission')} - GAAKA</title>
        <meta name="description" content="Discover GAAKA's mission to empower African artisan communities through fair trade, education support, and sustainable employment opportunities." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
        <link rel="canonical" href="https://gaaka.com/mission" />
      </Head>

      <Header />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-amber-50/50 py-20 border-b border-amber-100/80">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
                {t('empoweringCommunities')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {t('missionDescription1')}
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('missionDescription2')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Pillars */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
                {t('ourMissionPillars')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('ourMissionPillarsDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Handshake className="h-8 w-8" />,
                  title: t('fairEmployment'),
                  description: t('fairEmploymentDesc'),
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  icon: <GraduationCap className="h-8 w-8" />,
                  title: t('educationSupport'),
                  description: t('educationSupportDesc'),
                  color: 'bg-green-100 text-green-600'
                },
                {
                  icon: <Globe className="h-8 w-8" />,
                  title: t('culturalPreservation'),
                  description: t('culturalPreservationDesc'),
                  color: 'bg-purple-100 text-purple-600'
                },
                {
                  icon: <Target className="h-8 w-8" />,
                  title: t('sustainableGrowth'),
                  description: t('sustainableGrowthDesc'),
                  color: 'bg-orange-100 text-orange-600'
                }
              ].map((pillar, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${pillar.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">{pillar.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Story */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Artisan at work"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-primary-600">200+</div>
                  <div className="text-sm text-gray-600">{t('artisansSupportedLabel')}</div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
                  {t('realStoriesRealImpact')}
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('graceStoryP1')}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('graceStoryQuote')}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('graceStoryP3')}
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/artisan-stories">
                    <a className="btn-primary group inline-flex items-center">
                      {t('readMoreStories')}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Initiative */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
                  {t('investingInEducation')}
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('investingInEducationP1')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{t('girlsEducationProgram')}</h4>
                        <p className="text-gray-600">{t('girlsEducationProgramDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{t('adultLiteracyClasses')}</h4>
                        <p className="text-gray-600">{t('adultLiteracyClassesDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{t('skillDevelopment')}</h4>
                        <p className="text-gray-600">{t('skillDevelopmentDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Students in classroom"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">{t('studentsSupported')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability */}
        <section className="section-padding bg-primary-50">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
              {t('sustainableByDesign')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              {t('sustainableByDesignDesc')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t('naturalMaterials'),
                  description: t('naturalMaterialsDesc'),
                  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                },
                {
                  title: t('zeroWasteProduction'),
                  description: t('zeroWasteProductionDesc'),
                  image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                },
                {
                  title: t('carbonNeutralShipping'),
                  description: t('carbonNeutralShippingDesc'),
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
              {t('bePartOfChange')}
            </h2>
            <p className="text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl mx-auto">
              {t('bePartOfChangeDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collections/all">
                <a className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300 group inline-flex items-center">
                  {t('shopCollection')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Link>
              <Link href="/contact">
                <a className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                   {t('partnerWithUs')}
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}