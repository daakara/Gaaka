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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
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
                Our Mission Pillars
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Four key areas where we focus our efforts to create lasting positive impact in artisan communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Handshake className="h-8 w-8" />,
                  title: 'Fair Employment',
                  description: 'We provide steady, well-paid work that allows artisans to support their families while practicing their traditional crafts.',
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  icon: <GraduationCap className="h-8 w-8" />,
                  title: 'Education Support',
                  description: '15% of our profits fund educational programs, with a focus on girls\' education and literacy in rural communities.',
                  color: 'bg-green-100 text-green-600'
                },
                {
                  icon: <Globe className="h-8 w-8" />,
                  title: 'Cultural Preservation',
                  description: 'We help preserve traditional weaving techniques and patterns that have been passed down for generations.',
                  color: 'bg-purple-100 text-purple-600'
                },
                {
                  icon: <Target className="h-8 w-8" />,
                  title: 'Sustainable Growth',
                  description: 'Our partnerships are built for long-term success, creating sustainable economic opportunities in remote areas.',
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
                  <div className="text-sm text-gray-600">Artisans Supported</div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
                  Real Stories, Real Impact
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Meet Amina, a master weaver from Senegal who has been creating baskets for over 20 years. Through our partnership, she now employs 8 women in her village and has been able to send all three of her daughters to university.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    "Before GAAKA, I could only make baskets when there were tourists. Now I have steady work all year, and my daughters have opportunities I never had," says Amina.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Stories like Amina's are happening across all our partner communities. When you choose GAAKA, you become part of these success stories.
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/artisan-stories">
                    <a className="btn-primary group inline-flex items-center">
                      Read More Stories
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
                  Investing in Education
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Education is the key to breaking cycles of poverty. That's why 15% of every purchase goes directly to educational initiatives in our partner communities.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Girls' Education Program</h4>
                        <p className="text-gray-600">Scholarships and school supplies for girls in rural communities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Adult Literacy Classes</h4>
                        <p className="text-gray-600">Reading and writing programs for artisan parents</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Skill Development</h4>
                        <p className="text-gray-600">Training in business skills and modern weaving techniques</p>
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
                  <div className="text-sm text-gray-600">Students Supported</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability */}
        <section className="section-padding bg-primary-50">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
              Sustainable by Design
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              We believe in creating beautiful products that don't compromise our planet's future. Every aspect of our business is designed with sustainability in mind.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Natural Materials',
                  description: 'All our baskets are made from sustainably harvested grasses, reeds, and natural dyes.',
                  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                },
                {
                  title: 'Zero Waste Production',
                  description: 'Traditional techniques use every part of the plant, creating no manufacturing waste.',
                  image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                },
                {
                  title: 'Carbon Neutral Shipping',
                  description: 'We offset all shipping emissions and use recycled packaging materials.',
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
              Be Part of the Change
            </h2>
            <p className="text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl mx-auto">
              Every basket you purchase creates ripple effects of positive change across African communities. Join us in building a more equitable world, one handcrafted piece at a time.
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
                  Partner with Us
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