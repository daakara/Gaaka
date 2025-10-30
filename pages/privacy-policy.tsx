import Head from 'next/head'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function PrivacyPolicy() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('privacyPolicy')} - GAAKA</title>
        <meta name="description" content="Read GAAKA's privacy policy to understand how we collect, use, and protect your personal information." />
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
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto prose prose-lg">
            <p className="text-sm text-gray-600 mb-8">Last updated: October 30, 2025</p>
            
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>

            <h2>Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy.</p>

            <h2>Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

            <h2>Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information. Contact us if you wish to exercise these rights.</p>

            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at privacy@gaaka.de or through our contact page.</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}