import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Footer from '../../src/components/layout/Footer'
import Header from '../../src/components/layout/Header'
import ProductGrid from '../../src/components/sections/ProductGrid'
import { useLanguage } from '../../src/lib/i18n'
import { fetchGraphQL } from '../../src/lib/wordpress/client'
import { GET_PRODUCTS_BY_CATEGORY } from '../../src/lib/wordpress/queries'
import { Product } from '../../src/lib/wordpress/types'
import { transformProduct } from '../../src/lib/wordpress/utils'

interface KitchenDiningPageProps {
  products: Product[]
}

const KitchenDiningPage: NextPage<KitchenDiningPageProps> = ({ products }) => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('kitchenDining')} - GAAKA</title>
        <meta name="description" content={t('kitchenDiningDescription')} />
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
                {t('kitchenDining')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('kitchenDiningDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <ProductGrid products={products} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<KitchenDiningPageProps> = async () => {
  try {
    const data = await fetchGraphQL(GET_PRODUCTS_BY_CATEGORY, {
      category: 'kitchen-dining',
      first: 100,
    })
    const products = data.products.nodes.map(transformProduct)

    return {
      props: {
        products,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching kitchen & dining products:', error)
    return {
      props: {
        products: [],
      },
    }
  }
}

export default KitchenDiningPage