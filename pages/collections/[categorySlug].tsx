import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'

import { fetchGraphQL } from '../../src/lib/wordpress/client'
import { GET_ALL_CATEGORIES, GET_PRODUCTS_BY_CATEGORY, GET_CATEGORY_DETAILS } from '../../src/lib/wordpress/queries'
import { transformProduct, transformCategory } from '../../src/lib/wordpress/utils'
import { Product, Collection } from '../../src/lib/wordpress/types'
import { useLanguage } from '../../src/lib/i18n'
import Header from '../../src/components/layout/Header'
import Footer from '../../src/components/layout/Footer'
import ProductGrid from '../../src/components/sections/ProductGrid'

interface CategoryPageProps {
  products: Product[]
  category: Collection
}

interface IParams extends ParsedUrlQuery {
  categorySlug: string
}

const CategoryPage: NextPage<CategoryPageProps> = ({ products, category }) => {
  const { t } = useLanguage()

  if (!category) {
    return <div>Loading...</div> // Or a proper 404 component
  }

  return (
    <>
      <Head>
        <title>{category.name} - GAAKA</title>
        <meta name="description" content={category.description || `Explore our collection of ${category.name}.`} />
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
                {category.name}
              </h1>
              {category.description && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h2>
                <p className="text-gray-600">There are currently no products available in this collection.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchGraphQL(GET_ALL_CATEGORIES, {})
  const paths = data.productCategories.nodes.map((category: { slug: string }) => ({
    params: { categorySlug: category.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps, IParams> = async (context) => {
  const { categorySlug } = context.params!
  
  try {
    const categoryData = await fetchGraphQL(GET_CATEGORY_DETAILS, { id: categorySlug })
    const productsData = await fetchGraphQL(GET_PRODUCTS_BY_CATEGORY, { category: categorySlug, first: 100 })
    
    if (!categoryData.productCategory) {
      return {
        notFound: true,
      }
    }

    const category = transformCategory(categoryData.productCategory)
    const products = productsData.products.nodes.map(transformProduct)

    return {
      props: {
        products,
        category,
      },
      revalidate: 60, // In seconds
    }
  } catch (error) {
    console.error(`Error fetching data for category ${categorySlug}:`, error)
    return {
      notFound: true,
    }
  }
}

export default CategoryPage
