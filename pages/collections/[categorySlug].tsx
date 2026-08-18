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
import { getFallbackProductsByCategory } from '../../src/lib/wordpress/fallbackProducts'

interface CategoryPageProps {
  products: Product[]
  category: Collection
}

interface IParams extends ParsedUrlQuery {
  categorySlug: string
}

const FALLBACK_CATEGORIES: Record<string, Collection> = {
  'storage-baskets': {
    id: 'cat-storage-baskets',
    databaseId: 1,
    name: 'Storage Baskets',
    slug: 'storage-baskets',
    description: 'Handcrafted lidded baskets that double as functional art',
    count: 4,
  },
  'kitchen-dining': {
    id: 'cat-kitchen-dining',
    databaseId: 2,
    name: 'Kitchen & Dining',
    slug: 'kitchen-dining',
    description: 'Art and function combined for endless uses for your kitchen & dining space',
    count: 3,
  },
  'wall-baskets': {
    id: 'cat-wall-baskets',
    databaseId: 3,
    name: 'Wall Baskets',
    slug: 'wall-baskets',
    description: 'Decorative wall baskets that transform any space into a work of art',
    count: 3,
  },
}

const CategoryPage: NextPage<CategoryPageProps> = ({ products, category }) => {
  const { t } = useLanguage()

  const safeCategory = category || {
    name: t('allProducts'),
    description: t('allProductsDescription'),
    slug: 'all',
  }
  const safeProducts = products && products.length > 0 ? products : getFallbackProductsByCategory(safeCategory.slug)

  return (
    <>
      <Head>
        <title>{safeCategory.name} - GAAKA</title>
        <meta name="description" content={safeCategory.description || `Explore our collection of ${safeCategory.name}.`} />
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
                {safeCategory.name}
              </h1>
              {safeCategory.description && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {safeCategory.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <ProductGrid products={safeProducts} />
      </main>

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fallbackPaths = Object.keys(FALLBACK_CATEGORIES).map((slug) => ({
    params: { categorySlug: slug },
  }))

  try {
    const data = await fetchGraphQL(GET_ALL_CATEGORIES, {})
    
    if (!data || !data.productCategories || !data.productCategories.nodes || data.productCategories.nodes.length === 0) {
      return {
        paths: fallbackPaths,
        fallback: 'blocking',
      }
    }
    
    const paths = data.productCategories.nodes.map((category: { slug: string }) => ({
      params: { categorySlug: category.slug },
    }))

    return {
      paths: [...fallbackPaths, ...paths],
      fallback: 'blocking',
    }
  } catch (error) {
    console.warn('Error fetching categories for static paths, using fallback paths:', error)
    return {
      paths: fallbackPaths,
      fallback: 'blocking',
    }
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps, IParams> = async (context) => {
  const { categorySlug } = context.params!
  const fallbackCategory = FALLBACK_CATEGORIES[categorySlug]
  const fallbackProducts = getFallbackProductsByCategory(categorySlug)

  try {
    const categoryData = await fetchGraphQL(GET_CATEGORY_DETAILS, { id: categorySlug })
    const productsData = await fetchGraphQL(GET_PRODUCTS_BY_CATEGORY, { category: categorySlug, first: 100 })
    
    if (categoryData?.productCategory) {
      const category = transformCategory(categoryData.productCategory)
      const products = productsData?.products?.nodes ? productsData.products.nodes.map(transformProduct) : fallbackProducts

      return {
        props: {
          products: products.length > 0 ? products : fallbackProducts,
          category,
        },
        revalidate: 60,
      }
    }

    if (fallbackCategory) {
      return {
        props: {
          products: fallbackProducts,
          category: fallbackCategory,
        },
        revalidate: 60,
      }
    }

    return {
      notFound: true,
    }
  } catch (error) {
    if (fallbackCategory) {
      return {
        props: {
          products: fallbackProducts,
          category: fallbackCategory,
        },
        revalidate: 60,
      }
    }
    return {
      notFound: true,
    }
  }
}

export default CategoryPage
