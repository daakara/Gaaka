// React hooks for fetching WordPress/WooCommerce data with graceful fallback
import { useState, useEffect, useCallback } from 'react'
import { fetchGraphQL } from '../lib/wordpress/client'
import { 
  GET_ALL_PRODUCTS, 
  GET_FEATURED_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_BY_SLUG,
  GET_ALL_CATEGORIES,
  GET_ALL_ARTISANS,
  SEARCH_PRODUCTS
} from '../lib/wordpress/queries'
import { 
  Product, 
  Collection,
  ArtisanStory,
  ProductsResponse,
  ProductResponse,
  CategoriesResponse,
  ArtisansResponse
} from '../lib/wordpress/types'
import { transformProduct, transformCategory } from '../lib/wordpress/utils'
import { ALL_FALLBACK_PRODUCTS, getFallbackProductsByCategory } from '../lib/wordpress/fallbackProducts'

interface UseProductsOptions {
  category?: string
  featured?: boolean
  limit?: number
  skip?: boolean
}

interface UseProductsResult {
  products: Product[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Hook to fetch products from WordPress with automatic offline fallback
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsResult {
  const { category, featured, limit = 100, skip = false } = options
  const defaultFallback = category ? getFallbackProductsByCategory(category) : ALL_FALLBACK_PRODUCTS

  const [products, setProducts] = useState<Product[]>(defaultFallback)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  useEffect(() => {
    if (skip) {
      setLoading(false)
      return
    }

    let isMounted = true

    async function fetchProducts() {
      setLoading(true)
      setError(null)

      try {
        let query = GET_ALL_PRODUCTS
        let variables: any = { first: limit }

        if (featured) {
          query = GET_FEATURED_PRODUCTS
          variables = { first: limit }
        } else if (category) {
          query = GET_PRODUCTS_BY_CATEGORY
          variables = { category, first: limit }
        }

        const data = await fetchGraphQL<ProductsResponse>(query, variables)

        if (isMounted && data?.products?.nodes && data.products.nodes.length > 0) {
          const transformedProducts = data.products.nodes.map(transformProduct)
          setProducts(transformedProducts)
        } else if (isMounted) {
          setProducts(defaultFallback)
        }
      } catch (err) {
        if (isMounted) {
          // Gracefully fallback without blocking UI
          setProducts(defaultFallback)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [category, featured, limit, skip, refetchTrigger])

  const refetch = () => setRefetchTrigger(prev => prev + 1)

  return { products, loading, error, refetch }
}

interface UseProductResult {
  product: Product | null
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch a single product by slug
 */
export function useProduct(slug: string): UseProductResult {
  const fallback = ALL_FALLBACK_PRODUCTS.find(p => p.slug === slug) || null
  const [product, setProduct] = useState<Product | null>(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchProduct() {
      if (!slug) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await fetchGraphQL<ProductResponse>(GET_PRODUCT_BY_SLUG, { slug })

        if (isMounted && data?.product) {
          setProduct(transformProduct(data.product))
        } else if (isMounted && fallback) {
          setProduct(fallback)
        }
      } catch (err) {
        if (isMounted) {
          setProduct(fallback)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      isMounted = false
    }
  }, [slug])

  return { product, loading, error }
}

interface UseCategoriesResult {
  categories: Collection[]
  loading: boolean
  error: Error | null
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchCategories() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchGraphQL<CategoriesResponse>(GET_ALL_CATEGORIES)

        if (isMounted && data?.productCategories?.nodes) {
          const transformedCategories = data.productCategories.nodes.map(transformCategory)
          setCategories(transformedCategories)
        }
      } catch (err) {
        // Silent catch for resilience
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCategories()

    return () => {
      isMounted = false
    }
  }, [])

  return { categories, loading, error }
}

interface UseArtisansResult {
  artisans: ArtisanStory[]
  loading: boolean
  error: Error | null
}

export function useArtisans(featured: boolean = false): UseArtisansResult {
  const [artisans, setArtisans] = useState<ArtisanStory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchArtisans() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchGraphQL<ArtisansResponse>(GET_ALL_ARTISANS)

        if (isMounted && data?.artisans?.nodes) {
          setArtisans(data.artisans.nodes)
        }
      } catch (err) {
        // Silent catch for resilience
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchArtisans()

    return () => {
      isMounted = false
    }
  }, [featured])

  return { artisans, loading, error }
}

interface UseSearchResult {
  results: Product[]
  loading: boolean
  error: Error | null
  search: (query: string) => void
}

/**
 * Hook to search products with automatic client-side fallback
 */
export function useProductSearch(): UseSearchResult {
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setResults([])
      return
    }

    const cleanQuery = query.toLowerCase().trim()
    
    // Client-side search through fallback products
    const localMatches = ALL_FALLBACK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(cleanQuery) ||
      p.description?.toLowerCase().includes(cleanQuery) ||
      p.category?.name.toLowerCase().includes(cleanQuery) ||
      p.colors?.some(c => c.toLowerCase().includes(cleanQuery))
    )

    setLoading(true)
    setError(null)

    try {
      const data = await fetchGraphQL<ProductsResponse>(SEARCH_PRODUCTS, { 
        search: query,
        first: 20
      })

      if (data?.products?.nodes && data.products.nodes.length > 0) {
        const transformedProducts = data.products.nodes.map(transformProduct)
        setResults(transformedProducts)
      } else {
        setResults(localMatches)
      }
    } catch (err) {
      // CORS or network failure: seamlessly return local matches
      setResults(localMatches)
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, error, search }
}
