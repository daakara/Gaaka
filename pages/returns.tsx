import Head from 'next/head'
import { RefreshCw, Package, CreditCard, Clock } from 'lucide-react'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function Returns() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('returns')} - GAAKA</title>
        <meta name="description" content="Learn about GAAKA's return and exchange policy. Easy 30-day returns on all handcrafted basket purchases." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                Returns & Exchanges
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We want you to love your GAAKA purchase. If you're not completely satisfied, we offer easy returns within 30 days.
              </p>
            </div>
          </div>
        </section>

        {/* Return Process */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                How Returns Work
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our simple 4-step return process makes it easy to return or exchange your items.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  step: '1',
                  icon: <Package className="h-8 w-8" />,
                  title: 'Contact Us',
                  description: 'Email us at returns@gaaka.de with your order number and reason for return.',
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  step: '2',
                  icon: <RefreshCw className="h-8 w-8" />,
                  title: 'Get Authorization',
                  description: 'We will send you a return authorization number and prepaid shipping label.',
                  color: 'bg-green-100 text-green-600'
                },
                {
                  step: '3',
                  icon: <Clock className="h-8 w-8" />,
                  title: 'Ship It Back',
                  description: 'Package your item securely and ship it back using our prepaid label.',
                  color: 'bg-purple-100 text-purple-600'
                },
                {
                  step: '4',
                  icon: <CreditCard className="h-8 w-8" />,
                  title: 'Get Refunded',
                  description: 'Once we receive your return, we will process your refund within 5-7 business days.',
                  color: 'bg-orange-100 text-orange-600'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Return Policy Details */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">
                Return Policy Details
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">✓ What Can Be Returned</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Items in original condition with tags attached</li>
                    <li>• Products returned within 30 days of purchase</li>
                    <li>• Items that haven't been used or damaged</li>
                    <li>• Products in original packaging when applicable</li>
                  </ul>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-6">✓ Refund Information</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Refunds processed to original payment method</li>
                    <li>• Processing time: 5-7 business days</li>
                    <li>• Original shipping costs are non-refundable</li>
                    <li>• Return shipping is free for defective items</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">✗ What Cannot Be Returned</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Gift cards and digital products</li>
                    <li>• Personalized or custom-made items</li>
                    <li>• Items returned after 30 days</li>
                    <li>• Products showing signs of wear or damage</li>
                  </ul>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-6">✓ Exchanges</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Free exchanges for different sizes/colors</li>
                    <li>• Subject to availability</li>
                    <li>• Same return timeframe applies</li>
                    <li>• Price differences may apply</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Defective Items */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mt-8">
              <h3 className="text-xl font-heading font-bold text-red-900 mb-4">
                Defective or Damaged Items
              </h3>
              <p className="text-red-800 mb-4">
                If your item arrived damaged or defective, we'll make it right immediately:
              </p>
              <ul className="space-y-2 text-red-700">
                <li>• Contact us within 48 hours of delivery</li>
                <li>• Include photos of the damage in your email</li>
                <li>• We'll provide a prepaid return label</li>
                <li>• Expedited replacement or full refund</li>
              </ul>
            </div>

            {/* International Returns */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mt-8">
              <h3 className="text-xl font-heading font-bold text-blue-900 mb-4">
                International Returns
              </h3>
              <p className="text-blue-800 mb-4">
                For international orders, the return process is slightly different:
              </p>
              <ul className="space-y-2 text-blue-700">
                <li>• Contact us before returning any items</li>
                <li>• Customer responsible for return shipping costs</li>
                <li>• Items must clear customs to be processed</li>
                <li>• Refunds exclude original shipping and customs fees</li>
              </ul>
            </div>

            {/* Contact for Returns */}
            <div className="text-center mt-12 p-8 bg-primary-50 rounded-2xl">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                Need Help with a Return?
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Our customer service team is here to make your return as smooth as possible. Contact us with any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:returns@gaaka.de"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Email: returns@gaaka.de
                </a>
                <a
                  href="/contact"
                  className="btn-outline inline-flex items-center justify-center"
                >
                  Contact Form
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}