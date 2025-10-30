import Head from 'next/head'
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('contact')} - GAAKA</title>
        <meta name="description" content="Get in touch with GAAKA. We're here to help with your questions about our handcrafted African baskets and home accessories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We'd love to hear from you. Whether you have questions about our products, want to learn more about our mission, or need assistance with your order, we're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  icon: <Mail className="h-8 w-8" />,
                  title: 'Email Us',
                  content: 'hello@gaaka.de',
                  description: 'Send us an email anytime',
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  icon: <Phone className="h-8 w-8" />,
                  title: 'Call Us',
                  content: '+49 30 1234 5678',
                  description: 'Mon-Fri, 9AM-6PM CET',
                  color: 'bg-green-100 text-green-600'
                },
                {
                  icon: <MessageCircle className="h-8 w-8" />,
                  title: 'Live Chat',
                  content: 'Chat with us',
                  description: 'Available during business hours',
                  color: 'bg-purple-100 text-purple-600'
                },
                {
                  icon: <MapPin className="h-8 w-8" />,
                  title: 'Visit Us',
                  content: 'Berlin, Germany',
                  description: 'By appointment only',
                  color: 'bg-orange-100 text-orange-600'
                }
              ].map((option, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <div className="text-primary-600 font-medium mb-1">{option.content}</div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>

            {/* Contact Form and Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                      placeholder="+49 30 1234 5678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Question</option>
                      <option value="product">Product Information</option>
                      <option value="shipping">Shipping & Returns</option>
                      <option value="wholesale">Wholesale Inquiries</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                      I would like to receive updates about new products and special offers
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Company Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                    Company Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                        <p className="text-gray-600">
                          GAAKA GmbH<br />
                          Friedrichstraße 123<br />
                          10117 Berlin, Germany
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM CET<br />
                          Saturday: 10:00 AM - 4:00 PM CET<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Email Departments</h4>
                        <div className="text-gray-600 space-y-1">
                          <p>General: hello@gaaka.de</p>
                          <p>Orders: orders@gaaka.de</p>
                          <p>Press: press@gaaka.de</p>
                          <p>Wholesale: wholesale@gaaka.de</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Quick Links */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Quick Help
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Looking for quick answers? Check out our frequently asked questions.
                  </p>
                  <div className="space-y-3">
                    <a href="/faq#shipping" className="block text-primary-600 hover:text-primary-700 transition-colors duration-200">
                      → Shipping & Delivery Information
                    </a>
                    <a href="/faq#returns" className="block text-primary-600 hover:text-primary-700 transition-colors duration-200">
                      → Returns & Exchange Policy
                    </a>
                    <a href="/faq#care" className="block text-primary-600 hover:text-primary-700 transition-colors duration-200">
                      → Product Care Instructions
                    </a>
                    <a href="/faq#wholesale" className="block text-primary-600 hover:text-primary-700 transition-colors duration-200">
                      → Wholesale & Bulk Orders
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Follow Our Journey
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Stay connected with us on social media for artisan stories, behind-the-scenes content, and new product launches.
                  </p>
                  <div className="flex gap-4">
                    {['Instagram', 'Facebook', 'Pinterest', 'LinkedIn'].map((social) => (
                      <a
                        key={social}
                        href={`#${social.toLowerCase()}`}
                        className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-300"
                      >
                        <span className="text-xs font-semibold">{social[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}