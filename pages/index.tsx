import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ProductSections from '@/components/sections/ProductSections'
import MissionSection from '@/components/sections/MissionSection'
import ProductGrid from '@/components/sections/ProductGrid'
import { generateOrganizationData, generateWebSiteData } from '@/lib/seo/structured-data'
import { getAllProducts, getAllProductCategories } from '@/lib/wordpress'
import { Product } from '@/components/sections/ProductGrid'

interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
}

export default function HomePage({ products, productCategories }: { products: Product[], productCategories: ProductCategory[] }) {
  const organizationData = generateOrganizationData()
  const webSiteData = generateWebSiteData()

  return (
    <div className="min-h-screen">
      <Head>
        <title>GAAKA - Handcrafted Kenyan Storage Baskets</title>
        <meta name="description" content="Discover beautiful handwoven Kenyan storage baskets that combine modern design with traditional craftsmanship. Ethically sourced and artisan-made." />
        <meta name="keywords" content="handcrafted baskets, Kenyan baskets, storage solutions, home decor, artisan made, sustainable" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GAAKA.png" />
        
        {/* Open Graph */}
        <meta property="og:title" content="GAAKA - Handcrafted Kenyan Storage Baskets" />
        <meta property="og:description" content="Modern design meets traditional craftsmanship. Discover our collection of handwoven Kenyan storage baskets." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://gaaka.com" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GAAKA - Handcrafted African Storage Baskets" />
        <meta name="twitter:description" content="Modern design meets traditional craftsmanship" />
        <meta name="twitter:image" content="/twitter-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteData)
          }}
        />
      </Head>
      
      <Header />
      <main>
        <HeroSection />
        <ProductSections productCategories={productCategories} />
        <MissionSection />
        <ProductGrid products={products} />
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getAllProducts()
  const productCategories = await getAllProductCategories()

  return {
    props: {
      products: products.nodes.map(node => ({
        id: node.id,
        name: node.title,
        price: node.productFields.price,
        image: node.productFields.images[0]?.mediaItemUrl,
        rating: node.productFields.rating,
        reviewCount: node.productFields.reviewCount,
        badge: node.productFields.badge,
        colors: node.productFields.colors ? node.productFields.colors.split(',').map(color => color.trim()) : [],
      })),
      productCategories: productCategories.nodes.map(node => ({
        id: node.id,
        title: node.name,
        description: node.description,
        image: node.image.mediaItemUrl,
        href: `/collections/${node.slug}`,
        cta: `Shop ${node.name}`
      })),
    },
  }
}