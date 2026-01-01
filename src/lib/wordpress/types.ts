// TypeScript types for WordPress/WooCommerce data
// Based on WPGraphQL and WooCommerce GraphQL schema

// Common WordPress types
export interface WPImage {
  id: string
  sourceUrl: string
  altText?: string
  title?: string
  mediaDetails?: {
    width: number
    height: number
  }
}

export interface WPNode {
  id: string
  databaseId: number
}

// WooCommerce Product types
export interface WooCommerceProduct extends WPNode {
  name: string
  slug: string
  type: 'SIMPLE' | 'VARIABLE' | 'GROUPED' | 'EXTERNAL'
  description?: string
  shortDescription?: string
  sku?: string
  
  // Pricing
  price?: string
  regularPrice?: string
  salePrice?: string
  onSale: boolean
  
  // Images
  image?: WPImage
  galleryImages?: {
    nodes: WPImage[]
  }
  
  // Categories
  productCategories?: {
    nodes: ProductCategory[]
  }
  
  // Tags
  productTags?: {
    nodes: ProductTag[]
  }
  
  // Inventory
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_BACKORDER'
  stockQuantity?: number
  manageStock: boolean
  
  // Attributes (for variations like colors, sizes)
  attributes?: {
    nodes: ProductAttribute[]
  }
  
  // Variations (for variable products)
  variations?: {
    nodes: ProductVariation[]
  }
  
  // Meta data
  featured: boolean
  averageRating?: number
  reviewCount?: number
  
  // Custom fields (ACF)
  productFields?: ProductCustomFields
  
  // SEO
  seo?: {
    title?: string
    metaDesc?: string
    canonical?: string
  }
  
  // Dates
  date: string
  modified: string
}

// Simplified Product type for frontend use
export interface Product {
  id: string
  databaseId: number
  name: string
  slug: string
  description?: string
  excerpt?: string
  
  // Pricing in EUR
  price: number
  compareAtPrice?: number
  onSale: boolean
  
  // Images
  image: string
  images: string[]
  imageAlt?: string
  
  // Categories
  category?: {
    name: string
    slug: string
  }
  categories: string[]
  
  // Stock
  inStock: boolean
  stockQuantity?: number
  
  // Product details
  colors?: string[]
  dimensions?: {
    height?: number
    width?: number
    depth?: number
  }
  weight?: number
  materials?: string
  
  // Badges/flags
  featured: boolean
  bestSeller: boolean
  limitedEdition: boolean
  badge?: 'best-seller' | 'limited-edition' | 'sold-out' | 'on-sale'
  
  // Rating
  rating?: number
  reviewCount?: number
  
  // Dates
  createdAt: string
  updatedAt: string
}

// Product Category
export interface ProductCategory extends WPNode {
  name: string
  slug: string
  description?: string
  image?: WPImage
  count?: number
  parent?: {
    node: ProductCategory
  }
}

// Product Tag
export interface ProductTag extends WPNode {
  name: string
  slug: string
  description?: string
}

// Product Attribute (colors, sizes, etc.)
export interface ProductAttribute {
  id: string
  name: string
  options?: string[]
  variation: boolean
  visible: boolean
}

// Product Variation
export interface ProductVariation extends WPNode {
  name: string
  price?: string
  regularPrice?: string
  salePrice?: string
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_BACKORDER'
  image?: WPImage
  attributes?: {
    nodes: {
      name: string
      value: string
    }[]
  }
}

// Custom ACF fields for products
export interface ProductCustomFields {
  // Dimensions
  dimensions?: {
    height?: number
    width?: number
    depth?: number
    unit?: 'cm' | 'inch'
  }
  
  // Weight
  weight?: number
  weightUnit?: 'kg' | 'lb'
  
  // Materials
  materials?: string
  
  // Colors (if not using WooCommerce variations)
  availableColors?: string[]
  
  // Badges
  bestSeller?: boolean
  limitedEdition?: boolean
  
  // Artisan info
  artisan?: {
    name: string
    location: string
    story?: string
  }
  
  // Care instructions
  careInstructions?: string
}

// Artisan Story type
export interface ArtisanStory extends WPNode {
  title: string
  slug: string
  content?: string
  excerpt?: string
  
  featuredImage?: WPImage
  
  // Custom fields
  artisanFields?: {
    name: string
    location: string
    specialty?: string
    yearsOfExperience?: number
    story?: string
    featured?: boolean
  }
  
  date: string
}

// Collection/Category for frontend
export interface Collection {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  productCount: number
}

// GraphQL response wrappers
export interface ProductsResponse {
  products: {
    nodes: WooCommerceProduct[]
    pageInfo?: PageInfo
  }
}

export interface ProductResponse {
  product: WooCommerceProduct | null
}

export interface CategoriesResponse {
  productCategories: {
    nodes: ProductCategory[]
  }
}

export interface ArtisansResponse {
  artisans: {
    nodes: ArtisanStory[]
  }
}

// Pagination
export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
  total?: number
}

// Query variables
export interface ProductQueryVariables {
  first?: number
  after?: string
  where?: {
    category?: string
    categoryId?: number
    categoryIn?: number[]
    featured?: boolean
    onSale?: boolean
    search?: string
    stockStatus?: 'IN_STOCK' | 'OUT_OF_STOCK'
  }
}
