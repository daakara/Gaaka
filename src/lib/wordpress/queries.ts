// GraphQL queries for WordPress/WooCommerce
import { 
  PRODUCT_FULL_FRAGMENT, 
  PRODUCT_CORE_FRAGMENT,
  CATEGORY_FRAGMENT,
  IMAGE_FRAGMENT,
  ARTISAN_FRAGMENT 
} from './fragments'

// ==================== PRODUCT QUERIES ====================

/**
 * Get all products with optional filtering
 */
export const GET_ALL_PRODUCTS = `
  ${PRODUCT_FULL_FRAGMENT}
  
  query GetAllProducts($first: Int = 100, $after: String, $where: RootQueryToProductConnectionWhereArgs) {
    products(first: $first, after: $after, where: $where) {
      nodes {
        ...ProductFullFields
        productFields {
          dimensions {
            height
            width
            depth
            unit
          }
          weight
          weightUnit
          materials
          availableColors
          bestSeller
          limitedEdition
          careInstructions
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

/**
 * Get featured products
 */
export const GET_FEATURED_PRODUCTS = `
  ${PRODUCT_FULL_FRAGMENT}
  
  query GetFeaturedProducts($first: Int = 6) {
    products(first: $first, where: { featured: true }) {
      nodes {
        ...ProductFullFields
        productFields {
          bestSeller
          limitedEdition
        }
      }
    }
  }
`

/**
 * Get products by category
 */
export const GET_PRODUCTS_BY_CATEGORY = `
  ${PRODUCT_FULL_FRAGMENT}
  
  query GetProductsByCategory($category: String!, $first: Int = 50) {
    products(first: $first, where: { category: $category }) {
      nodes {
        ...ProductFullFields
        productFields {
          dimensions {
            height
            width
            depth
          }
          weight
          materials
          bestSeller
          limitedEdition
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

/**
 * Get single product by slug
 */
export const GET_PRODUCT_BY_SLUG = `
  ${PRODUCT_FULL_FRAGMENT}
  
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ...ProductFullFields
      productFields {
        dimensions {
          height
          width
          depth
          unit
        }
        weight
        weightUnit
        materials
        availableColors
        bestSeller
        limitedEdition
        artisan {
          name
          location
          story
        }
        careInstructions
      }
      variations {
        nodes {
          id
          databaseId
          name
          price
          regularPrice
          salePrice
          stockStatus
          image {
            ...ImageFields
          }
          attributes {
            nodes {
              name
              value
            }
          }
        }
      }
      seo {
        title
        metaDesc
        canonical
      }
    }
  }
`

/**
 * Get product by database ID
 */
export const GET_PRODUCT_BY_ID = `
  ${PRODUCT_FULL_FRAGMENT}
  
  query GetProductById($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      ...ProductFullFields
      productFields {
        dimensions {
          height
          width
          depth
        }
        weight
        materials
        availableColors
        bestSeller
        limitedEdition
      }
    }
  }
`

/**
 * Get on-sale products
 */
export const GET_SALE_PRODUCTS = `
  ${PRODUCT_CORE_FRAGMENT}
  ${IMAGE_FRAGMENT}
  
  query GetSaleProducts($first: Int = 20) {
    products(first: $first, where: { onSale: true }) {
      nodes {
        ...ProductCoreFields
        image {
          ...ImageFields
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`

// ==================== CATEGORY QUERIES ====================

/**
 * Get single category details by slug or id
 */
export const GET_CATEGORY_DETAILS = `
  ${CATEGORY_FRAGMENT}

  query GetCategoryDetails($id: ID!, $idType: ProductCategoryNodeIdTypeEnum = SLUG) {
    productCategory(id: $id, idType: $idType) {
      ...CategoryFields
    }
  }
`

/**
 * Get all categories
 */
export const GET_ALL_CATEGORIES = `
  ${CATEGORY_FRAGMENT}
  
  query GetAllCategories {
    productCategories(first: 100) {
      nodes {
        ...CategoryFields
      }
    }
  }
`

/**
 * Get category by slug
 */
export const GET_CATEGORY_BY_SLUG = `
  ${CATEGORY_FRAGMENT}
  
  query GetCategoryBySlug($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      ...CategoryFields
      parent {
        node {
          name
          slug
        }
      }
    }
  }
`

// ==================== ARTISAN QUERIES ====================

/**
 * Get all artisan stories
 */
export const GET_ALL_ARTISANS = `
  ${ARTISAN_FRAGMENT}
  
  query GetAllArtisans($first: Int = 50) {
    artisans(first: $first) {
      nodes {
        ...ArtisanFields
      }
    }
  }
`

/**
 * Get featured artisans
 */
export const GET_FEATURED_ARTISANS = `
  ${ARTISAN_FRAGMENT}
  
  query GetFeaturedArtisans($first: Int = 3) {
    artisans(first: $first, where: { metaQuery: { metaArray: [{ key: "featured", value: "1" }] } }) {
      nodes {
        ...ArtisanFields
      }
    }
  }
`

/**
 * Get artisan by slug
 */
export const GET_ARTISAN_BY_SLUG = `
  ${ARTISAN_FRAGMENT}
  
  query GetArtisanBySlug($slug: ID!) {
    artisan(id: $slug, idType: SLUG) {
      ...ArtisanFields
    }
  }
`

// ==================== SEARCH QUERY ====================

/**
 * Search products
 */
export const SEARCH_PRODUCTS = `
  ${PRODUCT_CORE_FRAGMENT}
  ${IMAGE_FRAGMENT}
  
  query SearchProducts($search: String!, $first: Int = 20) {
    products(first: $first, where: { search: $search }) {
      nodes {
        ...ProductCoreFields
        image {
          ...ImageFields
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`

// ==================== UTILITY QUERIES ====================

/**
 * Get product slugs for static generation
 */
export const GET_ALL_PRODUCT_SLUGS = `
  query GetAllProductSlugs {
    products(first: 1000) {
      nodes {
        slug
      }
    }
  }
`

/**
 * Get category slugs for static generation
 */
export const GET_ALL_CATEGORY_SLUGS = `
  query GetAllCategorySlugs {
    productCategories(first: 100) {
      nodes {
        slug
      }
    }
  }
`
