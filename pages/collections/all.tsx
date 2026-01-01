import Head from 'next/head'
import Header from '../../src/components/layout/Header'
import Footer from '../../src/components/layout/Footer'
import ProductGrid from '../../src/components/sections/ProductGrid'
import { useLanguage } from '../../src/lib/i18n'
import { GetStaticProps, NextPage } from 'next'
import { fetchGraphQL } from '../../src/lib/wordpress/client'
import { GET_ALL_PRODUCTS } from '../../src/lib/wordpress/queries'
import { transformProduct } from '../../src/lib/wordpress/utils'
import { Product } from '../../src/lib/wordpress/types'

interface AllCollectionsProps {
  products: Product[]
}

const AllCollections: NextPage<AllCollectionsProps> = ({ products }) => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('allProducts')} - GAAKA</title>
        <meta name="description" content={t('allProductsDescription')} />
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
                {t('allProducts')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('allProductsDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <ProductGrid products={products} />
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<AllCollectionsProps> = async () => {
  try {
    const data = await fetchGraphQL(GET_ALL_PRODUCTS, { first: 100 })
    const products = data.products.nodes.map(transformProduct)

    return {
      props: {
        products,
      },
      revalidate: 60, // Re-generate the page every 60 seconds
    }
  } catch (error) {
    console.error('Error fetching all products:', error)
    return {
      props: {
        products: [],
      },
    }
  }
}

export default AllCollections