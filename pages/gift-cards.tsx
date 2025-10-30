import Head from 'next/head'
import Image from 'next/image'
import { Gift, Heart, Star } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function GiftCards() {
  const { t } = useLanguage()

  const giftCardAmounts = [
    { amount: 50, popular: false },
    { amount: 100, popular: true },
    { amount: 150, popular: false },
    { amount: 250, popular: false }
  ]

  return (
    <>
      <Head>
        <title>{t('giftCards')} - GAAKA</title>
        <meta name="description" content="Give the gift of authentic African craftsmanship with GAAKA gift cards. Perfect for lovers of handmade home decor and meaningful gifts." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                  Give the Gift of Authentic Craftsmanship
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  GAAKA gift cards are more than just presents – they're invitations to discover beautiful, meaningful pieces that support artisan communities across Africa.
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary-600" />
                    <span>Digital Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary-600" />
                    <span>No Expiration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary-600" />
                    <span>Personalized Message</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-heading font-bold">GAAKA</h3>
                      <p className="text-primary-100">Gift Card</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">€100</div>
                      <div className="text-primary-100 text-sm">Gift Amount</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-primary-100 text-sm">From</div>
                      <div className="font-semibold">Sarah M.</div>
                    </div>
                    <div>
                      <div className="text-primary-100 text-sm">To</div>
                      <div className="font-semibold">Emma K.</div>
                    </div>
                    <div>
                      <div className="text-primary-100 text-sm">Message</div>
                      <div className="text-sm">"Hope you find something beautiful for your new home! ❤️"</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-20">
                    <Image
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                      alt="Basket pattern"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gift Card Selection */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
                Choose Your Gift Amount
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the perfect amount for your gift recipient. All gift cards are delivered digitally and never expire.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {giftCardAmounts.map((card) => (
                <div
                  key={card.amount}
                  className={`relative bg-white border-2 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    card.popular 
                      ? 'border-primary-600 shadow-lg' 
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {card.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    €{card.amount}
                  </div>
                  <div className="text-sm text-gray-600 mb-6">
                    {card.amount === 50 && "Perfect for small accessories"}
                    {card.amount === 100 && "Great for most baskets"}
                    {card.amount === 150 && "Ideal for premium pieces"}
                    {card.amount === 250 && "Perfect for basket sets"}
                  </div>
                  <button className={`w-full py-2 rounded-lg font-medium transition-colors duration-300 ${
                    card.popular 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    Select Amount
                  </button>
                </div>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">Custom Amount</h3>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">€</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    min="25"
                    max="500"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                  />
                  <button className="btn-primary px-6 py-2">
                    Select
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Minimum €25, Maximum €500</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gift Card Form */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">
                  Personalize Your Gift
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recipient's Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter recipient's name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recipient's Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter recipient's email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personal Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write a personal message for your gift recipient..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                    />
                    <p className="text-sm text-gray-600 mt-1">Leave blank to send immediately</p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-lg"
                  >
                    Purchase Gift Card - €100
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose GAAKA Gifts */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
                Why GAAKA Makes the Perfect Gift
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Give more than just beautiful home decor – give the opportunity to support artisan communities and preserve traditional crafts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Meaningful Impact',
                  description: 'Every purchase supports artisan families and educational programs in African communities.',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                },
                {
                  title: 'Unique & Authentic',
                  description: 'Each piece is handcrafted using traditional techniques, making every gift truly one-of-a-kind.',
                  image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                },
                {
                  title: 'Thoughtful Choice',
                  description: 'Perfect for anyone who values sustainability, craftsmanship, and making a positive difference.',
                  image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}