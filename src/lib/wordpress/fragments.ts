// GraphQL fragments for reusable query parts

// Image fragment
export const IMAGE_FRAGMENT = `
  fragment ImageFields on MediaItem {
    id
    sourceUrl
    altText
    title
    mediaDetails {
      width
      height
    }
  }
`

// Product category fragment
export const CATEGORY_FRAGMENT = `
  fragment CategoryFields on ProductCategory {
    id
    databaseId
    name
    slug
    description
    image {
      ...ImageFields
    }
    count
  }
`

// Product tag fragment
export const TAG_FRAGMENT = `
  fragment TagFields on ProductTag {
    id
    name
    slug
  }
`

// Product core fields (without relations)
export const PRODUCT_CORE_FRAGMENT = `
  fragment ProductCoreFields on Product {
    id
    databaseId
    name
    slug
    type
    description
    shortDescription
    sku
    price
    regularPrice
    salePrice
    onSale
    stockStatus
    stockQuantity
    manageStock
    featured
    averageRating
    reviewCount
    date
    modified
  }
`

// Product full fragment (with all relations)
export const PRODUCT_FULL_FRAGMENT = `
  ${IMAGE_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${TAG_FRAGMENT}
  ${PRODUCT_CORE_FRAGMENT}
  
  fragment ProductFullFields on Product {
    ...ProductCoreFields
    image {
      ...ImageFields
    }
    galleryImages {
      nodes {
        ...ImageFields
      }
    }
    productCategories {
      nodes {
        ...CategoryFields
      }
    }
    productTags {
      nodes {
        ...TagFields
      }
    }
  }
`

// Artisan story fragment
export const ARTISAN_FRAGMENT = `
  ${IMAGE_FRAGMENT}
  
  fragment ArtisanFields on Artisan {
    id
    databaseId
    title
    slug
    content
    excerpt
    date
    featuredImage {
      node {
        ...ImageFields
      }
    }
    artisanFields {
      name
      location
      specialty
      yearsOfExperience
      story
      featured
    }
  }
`
