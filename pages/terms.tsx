import Head from 'next/head'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function Terms() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('termsOfService')} - GAAKA</title>
        <meta name="description" content="Read GAAKA's terms of service to understand the conditions for using our website and purchasing our products." />
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
                Terms of Service
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Please read these terms carefully before using our website or purchasing our products.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto prose prose-lg">
            <p className="text-sm text-gray-600 mb-8">Last updated: October 30, 2025</p>
            
            <h2>Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

            <h2>Products and Services</h2>
            <p>GAAKA offers handcrafted African baskets and home accessories. All products are subject to availability and we reserve the right to limit quantities.</p>

            <h2>Orders and Payment</h2>
            <p>All orders are subject to acceptance by GAAKA. We reserve the right to refuse or cancel any order for any reason.</p>

            <h2>Shipping and Delivery</h2>
            <p>Shipping times are estimates and may vary. GAAKA is not responsible for delays caused by shipping carriers or customs.</p>

            <h2>Returns and Refunds</h2>
            <p>Items may be returned within 30 days of purchase in original condition. Return shipping costs may apply unless the item is defective.</p>

            <h2>Limitation of Liability</h2>
            <p>GAAKA shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our products or services.</p>

            <h2>Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at legal@gaaka.de or through our contact page.</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}