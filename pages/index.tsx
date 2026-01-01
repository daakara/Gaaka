import Head from 'next/head'
import { GetStaticProps } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ProductSections from '@/components/sections/ProductSections'
import MissionSection from '@/components/sections/MissionSection'
import ProductGrid from '@/components/sections/ProductGrid'
import { generateOrganizationData, generateWebSiteData } from '@/lib/seo/structured-data'
import { fetchSiteContent } from '@/lib/wordpress/content-queries'

interface HomePageProps {
  heroContent?: {
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
  };
}

export default function HomePage({ heroContent }: HomePageProps) {
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
        <HeroSection content={heroContent} />
        <ProductSections />
        <MissionSection />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Fetch hero content from WordPress with fallback
  const heroContent = await fetchSiteContent('hero', {
    headline: 'handcrafted african artistry',
    subheadline: 'where every basket tells a story',
    ctaText: 'discover the collection',
    ctaLink: '/collections/all',
  });

  return {
    props: {
      heroContent,
    },
    revalidate: 3600, // Revalidate every hour
  };
};