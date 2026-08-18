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
import { FALLBACK_STORAGE_BASKETS } from '../../src/lib/wordpress/fallbackProducts'

interface StorageBasketsPageProps {
  products: Product[]
}

const StorageBasketsPage: NextPage<StorageBasketsPageProps> = ({ products }) => {
  const { t } = useLanguage()
  const displayProducts = products && products.length > 0 ? products : FALLBACK_STORAGE_BASKETS

  return (
    <>
      <Head>
        <title>{t('storageBaskets')} - GAAKA</title>
        <meta name="description" content={t('storageBasketsDescription')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-amber-50/50 py-16 border-b border-amber-100/80">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                {t('storageBaskets')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('storageBasketsDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <ProductGrid products={displayProducts} />
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<StorageBasketsPageProps> = async () => {
  try {
    const data = await fetchGraphQL(GET_PRODUCTS_BY_CATEGORY, {
      category: 'storage-baskets',
      first: 100,
    })
    
    if (data?.products?.nodes && data.products.nodes.length > 0) {
      const products = data.products.nodes.map(transformProduct)
      return {
        props: {
          products,
        },
        revalidate: 60,
      }
    }

    return {
      props: {
        products: FALLBACK_STORAGE_BASKETS,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.warn('Error fetching storage baskets, using fallbacks:', error)
    return {
      props: {
        products: FALLBACK_STORAGE_BASKETS,
      },
      revalidate: 60,
    }
  }
}

export default StorageBasketsPage