// Example: How to use Sanity in a Next.js page
// This shows how to fetch and display products from Sanity

import { GetStaticProps } from 'next'
import { sanityClient, urlFor } from '../src/lib/sanity/client'
import { allProductsQuery } from '../src/lib/sanity/queries'

interface Product {
  _id: string
  name: string
  slug: { current: string }
  imageUrl: string
  price: number
  compareAtPrice?: number
  description: string
  inStock: boolean
  bestSeller: boolean
  category: {
    name: string
    slug: { current: string }
  }
}

interface Props {
  products: Product[]
}

export default function SanityProductsExample({ products }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products from Sanity CMS</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4">
            {product.imageUrl && (
              <img 
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-primary-600">
                €{product.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-gray-500 line-through">
                  €{product.compareAtPrice}
                </span>
              )}
            </div>
            
            {product.bestSeller && (
              <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
                Best Seller
              </span>
            )}
            
            <p className="text-gray-600 mt-2">{product.description}</p>
            
            <button 
              className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await sanityClient.fetch(allProductsQuery)
  
  return {
    props: {
      products,
    },
    revalidate: 60, // Revalidate every 60 seconds
  }
}
