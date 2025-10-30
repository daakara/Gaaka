import Head from 'next/head'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function Blog() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('blog')} - GAAKA</title>
        <meta name="description" content="Read stories about African craftsmanship, sustainability, and our artisan communities." />
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
                GAAKA Blog
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover stories of craftsmanship, sustainability, and community impact from across Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Coming Soon
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our blog is currently under development. Soon you'll be able to read inspiring stories about our artisan partners, learn about traditional African crafts, and discover the impact of your purchases.
              </p>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What to expect:</h3>
                <ul className="text-left space-y-2 text-gray-600 max-w-md mx-auto">
                  <li>• Artisan spotlights and interviews</li>
                  <li>• Behind-the-scenes craft tutorials</li>
                  <li>• Community impact stories</li>
                  <li>• Sustainable living tips</li>
                  <li>• Home decorating inspiration</li>
                </ul>
              </div>
              <p className="text-gray-600 mt-8">
                Want to be notified when we launch? <a href="/contact" className="text-primary-600 hover:text-primary-700">Contact us</a> to join our mailing list.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}