import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Award, Sparkles } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'
import { StatCounter } from '../src/components/ui/StatCounter'

export default function About() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('about')} - GAAKA</title>
        <meta name="description" content="Learn about GAAKA's mission to support African artisans and preserve traditional craftsmanship while creating beautiful, functional home accessories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
        <link rel="canonical" href="https://gaaka.com/about" />
      </Head>

      <Header />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-amber-50/50 py-20 border-b border-amber-100/80">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
                {t('ourStory')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {t('fromAfricaP1')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/mission">
                  <a className="btn-primary group inline-flex items-center">
                    {t('learnAboutMission')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Link>
                <Link href="/collections/all">
                  <a className="btn-outline">
                    {t('shopCollection')}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
                {t('whatDrivesUs')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('whatDrivesUsDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart className="h-8 w-8" />,
                  title: t('authenticCraftsmanship'),
                  description: t('authenticCraftsmanshipDesc')
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: t('communityFirst'),
                  description: t('communityFirstDesc')
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: t('sustainablePractices'),
                  description: t('sustainablePracticesDesc')
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
                  {t('fromAfricaToGermany')}
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('fromAfricaP1')}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('fromAfricaP2')}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('fromAfricaP3')}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Artisan weaving basket"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Colorful baskets"
                        width={200}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Traditional patterns"
                        width={200}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Finished baskets"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="section-padding bg-[#fcfaf7] border-y border-amber-200/60">
          <div className="container-custom">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-primary-800 border border-amber-200 mb-3">
                <span>Direct Social Impact</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 mb-4 tracking-tight">
                {t('ourImpactTogether')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('ourImpactDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCounter
                number="200+"
                label={t('artisansSupported')}
                description={t('creatingEmployment')}
                badge="100% Fair Pay"
                icon={<Users className="w-6 h-6" />}
              />
              <StatCounter
                number="15%"
                label={t('profitsToEducation')}
                description={t('fundingEducation')}
                badge="Reinvested"
                icon={<Award className="w-6 h-6" />}
              />
              <StatCounter
                number="5,000+"
                label={t('happyCustomers')}
                description={t('bringingBeauty')}
                badge="Verified"
                icon={<Heart className="w-6 h-6" />}
              />
              <StatCounter
                number="8"
                label={t('countriesLabel')}
                description={t('acrossAfricaDesc')}
                badge="Global"
                icon={<Sparkles className="w-6 h-6" />}
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
              {t('joinOurMission')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              {t('joinOurMissionDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collections/all">
                <a className="btn-primary group inline-flex items-center">
                  {t('shopCollection')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Link>
              <Link href="/artisan-stories">
                <a className="btn-outline">
                  {t('readArtisanStories')}
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