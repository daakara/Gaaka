import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ProductSections from '@/components/sections/ProductSections'
import MissionSection from '@/components/sections/MissionSection'
import ProductGrid from '@/components/sections/ProductGrid'
import { generateOrganizationData, generateWebSiteData } from '@/lib/seo/structured-data'

export default function HomePage() {
  const organizationData = generateOrganizationData()
  const webSiteData = generateWebSiteData()

  return (
    <div className="min-h-screen">
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
      
      <Header />
      <main>
        <HeroSection />
        <ProductSections />
        <MissionSection />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}