import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Award } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function About() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('about')} - GAAKA</title>
        <meta name="description" content="Learn about GAAKA's mission to support African artisans and preserve traditional craftsmanship while creating beautiful, functional home accessories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                GAAKA was born from a simple belief: that beautiful, functional art should empower the communities that create it. We bridge continents to bring you authentic African craftsmanship while supporting the artisans behind every piece.
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
                What Drives Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every decision we make is guided by our core values of authenticity, sustainability, and community empowerment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart className="h-8 w-8" />,
                  title: 'Authentic Craftsmanship',
                  description: 'We work exclusively with skilled artisans who have mastered traditional weaving techniques passed down through generations, ensuring each piece carries authentic cultural heritage.'
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: 'Community First',
                  description: 'Our partnerships create sustainable employment opportunities, providing fair wages and supporting education initiatives that strengthen entire communities across Africa.'
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: 'Sustainable Practices',
                  description: 'From sourcing natural materials responsibly to supporting eco-friendly production methods, sustainability is woven into every aspect of our business.'
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
                  From Germany to Africa
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Founded in Germany by a team passionate about African culture and craftsmanship, GAAKA began as a mission to create meaningful connections between European consumers and African artisans.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our founders traveled extensively across West and East Africa, building relationships with artisan communities and learning about traditional basket-making techniques that have been refined over centuries.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Today, we work with over 200 artisans across multiple African countries, providing them with steady income and helping preserve cultural traditions that might otherwise be lost to modernization.
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
        <section className="section-padding bg-primary-600 text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                Our Impact Together
              </h2>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Thanks to customers like you, we're making a real difference in artisan communities across Africa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '200+', label: t('artisansSupported'), description: t('creatingEmployment') },
                { number: '15%', label: t('profitsToEducation'), description: t('fundingEducation') },
                { number: '5000+', label: t('happyCustomers'), description: t('bringingBeauty') },
                { number: '8', label: 'Countries', description: 'Across West and East Africa' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl sm:text-5xl font-heading font-bold text-secondary-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-white mb-2">
                    {stat.label}
                  </div>
                  <div className="text-primary-100 text-sm">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Every purchase you make supports artisan families and helps preserve traditional African craftsmanship for future generations.
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
                  Read Artisan Stories
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