import Head from 'next/head'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import { useLanguage } from '../src/lib/i18n'

export default function ArtisanStories() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('artisanStories')} - GAAKA</title>
        <meta name="description" content="Meet the talented artisans behind GAAKA's beautiful handcrafted baskets and learn their inspiring stories." />
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
                {t('artisanStories')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Meet the talented hands and inspiring hearts behind every GAAKA creation.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Stories Coming Soon
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We're working on bringing you intimate portraits of our artisan partners - their techniques, traditions, and the communities they represent.
              </p>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Featured upcoming stories:</h3>
                <ul className="text-left space-y-2 text-gray-600 max-w-md mx-auto">
                  <li>• Grace from Kenya - Master weaver and teacher</li>
                  <li>• The Basket Weavers of Kenya - A cooperative's journey</li>
                  <li>• Traditional patterns and their meanings</li>
                  <li>• How basket weaving supports education</li>
                  <li>• Preserving crafts for future generations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}