// TypeScript types for Sanity content

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface Product {
  _id: string
  _type: 'product'
  name: string
  slug: SanitySlug
  images?: SanityImage[]
  imageUrl?: string // From query with asset->url
  description?: string
  price: number
  compareAtPrice?: number
  category?: Category
  colors?: string[]
  dimensions?: {
    height?: number
    width?: number
    depth?: number
  }
  weight?: number
  inStock: boolean
  featured: boolean
  bestSeller: boolean
  limitedEdition: boolean
  _createdAt?: string
  _updatedAt?: string
}

export interface Category {
  _id: string
  _type: 'category'
  name: string
  slug: SanitySlug
  description?: string
  image?: SanityImage
  imageUrl?: string
}

export interface Artisan {
  _id: string
  _type: 'artisan'
  name: string
  slug: SanitySlug
  location?: string
  image?: SanityImage
  imageUrl?: string
  story?: any[] // Portable Text
  specialty?: string
  yearsOfExperience?: number
  featured: boolean
  _createdAt?: string
  _updatedAt?: string
}

// For use in components
export interface ProductCardProps {
  product: Product
}

export interface CategoryCardProps {
  category: Category
}

export interface ArtisanCardProps {
  artisan: Artisan
}
