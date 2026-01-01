// Helper utilities for transforming WordPress/WooCommerce data to frontend format
import { WooCommerceProduct, Product, ProductCategory, Collection } from './types'

/**
 * Parse price string to number (removes currency symbols)
 */
export function parsePrice(priceString?: string | null): number {
  if (!priceString) return 0
  // Remove currency symbols and convert to number
  const cleaned = priceString.replace(/[^0-9.]/g, '')
  return parseFloat(cleaned) || 0
}

/**
 * Transform WooCommerce product to simplified Product type
 */
export function transformProduct(wpProduct: WooCommerceProduct): Product {
  const price = parsePrice(wpProduct.price)
  const regularPrice = parsePrice(wpProduct.regularPrice)
  const salePrice = parsePrice(wpProduct.salePrice)
  
  // Determine compare at price
  const compareAtPrice = wpProduct.onSale && regularPrice > salePrice 
    ? regularPrice 
    : null
  
  // Extract images - use placeholder if no image
  const mainImage = wpProduct.image?.sourceUrl || '/images/placeholder-basket.jpg'
  const galleryImages = wpProduct.galleryImages?.nodes.map(img => img.sourceUrl) || []
  const allImages = [mainImage, ...galleryImages].filter(Boolean)
  
  // Extract category
  const categories = wpProduct.productCategories?.nodes || []
  const primaryCategory = categories[0]
  
  // Determine badge
  let badge: Product['badge'] = null
  if (wpProduct.stockStatus !== 'IN_STOCK') {
    badge = 'sold-out'
  } else if (wpProduct.productFields?.bestSeller) {
    badge = 'best-seller'
  } else if (wpProduct.productFields?.limitedEdition) {
    badge = 'limited-edition'
  } else if (wpProduct.onSale) {
    badge = 'on-sale'
  }
  
  return {
    id: wpProduct.id,
    databaseId: wpProduct.databaseId,
    name: wpProduct.name,
    slug: wpProduct.slug,
    description: wpProduct.description || '',
    excerpt: wpProduct.shortDescription || '',
    
    price: wpProduct.onSale ? salePrice : price,
    compareAtPrice,
    onSale: wpProduct.onSale || false,
    
    image: mainImage,
    images: allImages,
    imageAlt: wpProduct.image?.altText || wpProduct.name,
    
    category: primaryCategory ? {
      name: primaryCategory.name,
      slug: primaryCategory.slug,
    } : null,
    categories: categories.map(cat => cat.name),
    
    inStock: wpProduct.stockStatus === 'IN_STOCK',
    stockQuantity: wpProduct.stockQuantity || null,
    
    colors: wpProduct.productFields?.availableColors || [],
    dimensions: wpProduct.productFields?.dimensions || null,
    weight: wpProduct.productFields?.weight || null,
    materials: wpProduct.productFields?.materials || null,
    
    featured: wpProduct.featured || false,
    bestSeller: wpProduct.productFields?.bestSeller || false,
    limitedEdition: wpProduct.productFields?.limitedEdition || false,
    badge,
    
    rating: wpProduct.averageRating || 0,
    reviewCount: wpProduct.reviewCount || 0,
    
    createdAt: wpProduct.date,
    updatedAt: wpProduct.modified,
  }
}

/**
 * Transform WordPress category to simplified Collection type
 */
export function transformCategory(wpCategory: ProductCategory): Collection {
  return {
    id: wpCategory.id,
    name: wpCategory.name,
    slug: wpCategory.slug,
    description: wpCategory.description,
    image: wpCategory.image?.sourceUrl,
    productCount: wpCategory.count || 0,
  }
}

/**
 * Get badge style based on badge type (replicating ProductGrid logic)
 */
export function getBadgeStyles(badge: Product['badge']) {
  switch (badge) {
    case 'best-seller':
      return 'bg-red-500 text-white'
    case 'limited-edition':
      return 'bg-purple-500 text-white'
    case 'sold-out':
      return 'bg-gray-500 text-white'
    case 'on-sale':
      return 'bg-green-500 text-white'
    default:
      return ''
  }
}

/**
 * Get badge label based on badge type
 */
export function getBadgeLabel(badge: Product['badge']): string {
  switch (badge) {
    case 'best-seller':
      return 'Best Seller'
    case 'limited-edition':
      return 'Limited Edition'
    case 'sold-out':
      return 'Sold Out'
    case 'on-sale':
      return 'On Sale'
    default:
      return ''
  }
}

/**
 * Format price for display (EUR)
 */
export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(price)
}
