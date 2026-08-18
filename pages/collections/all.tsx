import React, { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'
import Header from '../../src/components/layout/Header'
import Footer from '../../src/components/layout/Footer'
import ProductGrid from '../../src/components/sections/ProductGrid'
import { useLanguage } from '../../src/lib/i18n'
import { GetStaticProps, NextPage } from 'next'
import { fetchGraphQL } from '../../src/lib/wordpress/client'
import { GET_ALL_PRODUCTS } from '../../src/lib/wordpress/queries'
import { transformProduct } from '../../src/lib/wordpress/utils'
import { Product } from '../../src/lib/wordpress/types'
import { ALL_FALLBACK_PRODUCTS } from '../../src/lib/wordpress/fallbackProducts'
import { generateBreadcrumbData } from '../../src/lib/seo/structured-data'

interface AllCollectionsProps {
  products: Product[]
}

const CATEGORY_TABS = [
  { name: 'All Pieces', slug: 'all', href: '/collections/all' },
  { name: 'Storage Baskets', slug: 'storage-baskets', href: '/collections/storage-baskets' },
  { name: 'Kitchen & Dining', slug: 'kitchen-dining', href: '/collections/kitchen-dining' },
  { name: 'Wall Baskets', slug: 'wall-baskets', href: '/collections/wall-baskets' },
]

const AllCollections: NextPage<AllCollectionsProps> = ({ products }) => {
  const { t } = useLanguage()
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured')
  const rawProducts = products && products.length > 0 ? products : ALL_FALLBACK_PRODUCTS

  const sortedProducts = useMemo(() => {
    const list = [...rawProducts]
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price)
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price)
    }
    if (sortBy === 'name') {
      return list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [rawProducts, sortBy])

  const breadcrumbsSchema = generateBreadcrumbData([
    { name: 'Home', url: 'https://gaaka.com' },
    { name: 'Collections', url: 'https://gaaka.com/collections/all' }
  ])

  return (
    <>
      <Head>
        <title>All Handcrafted African Baskets - Complete Collection | GAAKA</title>
        <meta name="description" content="Discover all handwoven Kenyan storage baskets, kitchen accessories, and wall decor. Fair trade certified, sustainably sourced." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
        <link rel="canonical" href="https://gaaka.com/collections/all" />

        {/* OpenGraph */}
        <meta property="og:title" content="All Handcrafted African Baskets | GAAKA" />
        <meta property="og:description" content="Explore our full collection of ethical, sustainable handwoven African baskets." />
        <meta property="og:url" content="https://gaaka.com/collections/all" />
        <meta property="og:type" content="website" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
      </Head>

      <Header />
      
      <main id="main-content" className="bg-[#faf8f5]">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-amber-50/80 to-[#faf8f5] py-14 sm:py-20 border-b border-amber-100/70">
          <div className="container-custom">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center text-xs text-gray-500 mb-6 justify-center">
              <Link href="/"><a className="hover:text-primary-700 font-medium">Home</a></Link>
              <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
              <span className="font-semibold text-gray-900">All Collections</span>
            </nav>

            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                {t('allProducts')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 font-serif italic max-w-2xl mx-auto leading-relaxed">
                {t('allProductsDescription')}
              </p>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10" role="navigation" aria-label="Collections categories">
              {CATEGORY_TABS.map((tab) => {
                const isActive = tab.slug === 'all'
                return (
                  <Link key={tab.slug} href={tab.href}>
                    <a className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                      isActive
                        ? 'bg-primary-700 text-white shadow-primary-700/20 shadow-md'
                        : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-primary-700 border border-gray-200'
                    }`}>
                      {tab.name}
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Filter and Sort Toolbar */}
        <div className="container-custom pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-200/80">
            <p className="text-xs sm:text-sm font-semibold text-gray-600">
              Showing <span className="text-gray-900 font-bold">{sortedProducts.length}</span> handcrafted baskets
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <label htmlFor="all-sort-dropdown" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Sort by:</span>
              </label>
              <select
                id="all-sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 shadow-sm"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={sortedProducts} />
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<AllCollectionsProps> = async () => {
  try {
    const data = await fetchGraphQL(GET_ALL_PRODUCTS, { first: 100 })
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
        products: ALL_FALLBACK_PRODUCTS,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.warn('Error fetching all products, using fallbacks:', error)
    return {
      props: {
        products: ALL_FALLBACK_PRODUCTS,
      },
      revalidate: 60,
    }
  }
}

export default AllCollections