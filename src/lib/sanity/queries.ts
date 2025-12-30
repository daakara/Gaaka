// GROQ queries for fetching data from Sanity

// Get all products
export const allProductsQuery = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    "imageUrl": images[0].asset->url,
    price,
    compareAtPrice,
    description,
    inStock,
    featured,
    bestSeller,
    limitedEdition,
    category->{
      name,
      slug
    }
  }
`

// Get featured products
export const featuredProductsQuery = `
  *[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    name,
    slug,
    "imageUrl": images[0].asset->url,
    price,
    compareAtPrice,
    description,
    inStock,
    bestSeller,
    category->{
      name,
      slug
    }
  }
`

// Get single product by slug
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    images,
    price,
    compareAtPrice,
    description,
    colors,
    dimensions,
    weight,
    inStock,
    category->{
      name,
      slug
    }
  }
`

// Get products by category
export const productsByCategoryQuery = `
  *[_type == "product" && category->slug.current == $category] | order(_createdAt desc) {
    _id,
    name,
    slug,
    "imageUrl": images[0].asset->url,
    price,
    compareAtPrice,
    description,
    inStock,
    bestSeller,
    category->{
      name,
      slug
    }
  }
`

// Get all categories
export const allCategoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "imageUrl": image.asset->url
  }
`

// Get all artisan stories
export const allArtisansQuery = `
  *[_type == "artisan"] | order(name asc) {
    _id,
    name,
    slug,
    location,
    "imageUrl": image.asset->url,
    story,
    specialty,
    yearsOfExperience,
    featured
  }
`

// Get featured artisans
export const featuredArtisansQuery = `
  *[_type == "artisan" && featured == true] | order(_createdAt desc) [0...3] {
    _id,
    name,
    slug,
    location,
    "imageUrl": image.asset->url,
    story,
    specialty,
    yearsOfExperience
  }
`

// Get single artisan by slug
export const artisanBySlugQuery = `
  *[_type == "artisan" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    location,
    "imageUrl": image.asset->url,
    story,
    specialty,
    yearsOfExperience
  }
`
