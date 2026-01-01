# WordPress Integration - Quick Start

## ✅ What's Implemented

The GAAKA e-commerce site now has a complete WordPress/WooCommerce headless CMS integration:

### 📁 File Structure
```
src/lib/wordpress/
├── client.ts          # GraphQL client with error handling
├── config.ts          # Configuration and environment validation
├── types.ts           # TypeScript interfaces for WooCommerce
├── queries.ts         # All GraphQL queries
├── fragments.ts       # Reusable query fragments
└── utils.ts           # Data transformation utilities

src/hooks/
└── useWordPress.ts    # React hooks for data fetching
    ├── useProducts()
    ├── useProduct(slug)
    ├── useCategories()
    ├── useArtisans()
    └── useProductSearch()

pages/
└── wordpress-example.tsx  # Live example showing integration
```

## 🚀 Getting Started

### 1. Set Up WordPress (Required)

Follow **[WORDPRESS_SETUP.md](./WORDPRESS_SETUP.md)** for complete WordPress configuration.

**Quick checklist:**
- ✅ WordPress 6.0+ installed
- ✅ WPGraphQL plugin activated
- ✅ WooCommerce installed (recommended)
- ✅ WPGraphQL for WooCommerce plugin
- ✅ ACF PRO + WPGraphQL for ACF
- ✅ Products created in WordPress

### 2. Configure Environment Variables

```bash
# Copy example file
cp .env.local.example .env.local

# Edit .env.local and add:
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
WORDPRESS_SITE_URL=https://your-wordpress-site.com
REVALIDATE_TIME=60
```

### 3. Install Dependencies (Already Done)

```bash
npm install
```

### 4. Test the Integration

```bash
# Start development server
npm run dev

# Visit example page
open http://localhost:3000/wordpress-example
```

## 💻 Usage Examples

### Fetch Products in a Page

```typescript
import { GetStaticProps } from 'next'
import { fetchGraphQL } from '@/lib/wordpress/client'
import { GET_ALL_PRODUCTS } from '@/lib/wordpress/queries'
import { ProductsResponse } from '@/lib/wordpress/types'
import { transformProduct } from '@/lib/wordpress/utils'

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchGraphQL<ProductsResponse>(GET_ALL_PRODUCTS, {
    first: 20
  })

  const products = data?.products?.nodes.map(transformProduct) || []

  return {
    props: { products },
    revalidate: 60, // ISR - revalidate every 60 seconds
  }
}
```

### Use Hook in Component

```typescript
import { useProducts } from '@/hooks/useWordPress'

function ProductList() {
  const { products, loading, error } = useProducts({ 
    category: 'storage-baskets',
    limit: 12 
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Fetch Single Product

```typescript
import { useProduct } from '@/hooks/useWordPress'

function ProductPage({ slug }: { slug: string }) {
  const { product, loading, error } = useProduct(slug)

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Product not found</div>

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>€{product.price}</span>
    </div>
  )
}
```

### Search Products

```typescript
import { useProductSearch } from '@/hooks/useWordPress'

function SearchBar() {
  const { results, loading, search } = useProductSearch()

  return (
    <div>
      <input 
        type="text"
        onChange={(e) => search(e.target.value)}
        placeholder="Search products..."
      />
      {loading && <div>Searching...</div>}
      {results.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

## 📊 Available Data

### Product Fields
```typescript
{
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number  // Original price if on sale
  onSale: boolean
  image: string
  images: string[]
  category: { name, slug }
  inStock: boolean
  stockQuantity?: number
  colors?: string[]
  dimensions?: { height, width, depth }
  weight?: number
  materials?: string
  featured: boolean
  bestSeller: boolean
  limitedEdition: boolean
  badge?: 'best-seller' | 'limited-edition' | 'sold-out' | 'on-sale'
  rating?: number
  reviewCount?: number
}
```

## 🎯 Next Steps to Complete Integration

### Update Existing Components

Replace hardcoded data in these files:

1. **ProductGrid.tsx** → Use `useProducts({ featured: true })`
2. **ProductSections.tsx** → Use `useCategories()`
3. **Collection pages** → Use `useProducts({ category: 'slug' })`
4. **Artisan stories** → Use `useArtisans()`

### Example: Update ProductGrid

```typescript
// src/components/sections/ProductGrid.tsx
import { useProducts } from '@/hooks/useWordPress'

export default function ProductGrid() {
  const { products, loading, error } = useProducts({ 
    featured: true,
    limit: 12 
  })

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

## ⚡ Performance Tips

### 1. Use ISR for Product Pages

```typescript
export async function getStaticPaths() {
  const data = await fetchGraphQL(GET_ALL_PRODUCT_SLUGS)
  
  return {
    paths: data.products.nodes.map(p => ({ params: { slug: p.slug } })),
    fallback: 'blocking' // Generate missing pages on-demand
  }
}
```

### 2. Optimize Images

```typescript
import Image from 'next/image'

<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  loading="lazy"
/>
```

### 3. Cache GraphQL Responses

Already implemented in `client.ts` - errors are handled gracefully.

## 🔧 Troubleshooting

### "WordPress client not initialized"
- Check `.env.local` has `WORDPRESS_API_URL`
- Verify WordPress GraphQL endpoint is accessible
- Test: `curl https://your-site.com/graphql`

### CORS Errors
- Install WPGraphQL CORS plugin
- Add your domain to allowed origins
- Or add CORS headers to WordPress

### No Products Returned
- Check products are published in WordPress
- Verify WPGraphQL is activated
- Test query in GraphiQL: `/wp-admin/admin.php?page=graphiql-ide`

### Images Not Loading
- Add WordPress domain to `next.config.js` images.domains
- Check image URLs are absolute
- Verify WordPress site is accessible

## 📖 GraphQL Queries Available

```typescript
GET_ALL_PRODUCTS          // All products with filtering
GET_FEATURED_PRODUCTS     // Featured products only
GET_PRODUCTS_BY_CATEGORY  // Products in specific category
GET_PRODUCT_BY_SLUG       // Single product details
GET_SALE_PRODUCTS         // Products on sale
GET_ALL_CATEGORIES        // All product categories
GET_ALL_ARTISANS          // Artisan stories
SEARCH_PRODUCTS           // Search functionality
```

## 🎨 WooCommerce Benefits

**Why WooCommerce is recommended:**

✅ **Stock Management** - Real-time inventory tracking
✅ **Product Variations** - Colors, sizes built-in
✅ **Type Safety** - Well-documented GraphQL schema
✅ **Image Gallery** - Multiple images per product
✅ **Categories & Tags** - Organize products easily
✅ **Reviews & Ratings** - Customer feedback
✅ **SEO** - Built-in product schema
✅ **Admin UX** - Familiar interface

**You keep:**
- ✅ Custom cart (CartContext)
- ✅ Custom checkout (CheckoutForm)
- ✅ Custom payment processing
- ✅ Custom shipping calculator

**WooCommerce only manages product data**, not transactions.

## 📚 Additional Resources

- **[WORDPRESS_SETUP.md](./WORDPRESS_SETUP.md)** - Complete WordPress setup guide
- **[WPGraphQL Docs](https://www.wpgraphql.com/)** - GraphQL API documentation
- **[WooCommerce GraphQL](https://woographql.com/)** - WooCommerce specific docs
- **Example Page**: `/pages/wordpress-example.tsx`

---

**Questions?** Check the documentation or create an issue on GitHub.
