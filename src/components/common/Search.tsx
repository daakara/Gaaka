import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search as SearchIcon, X, Loader } from 'lucide-react'
import { useProductSearch } from '../../hooks/useWordPress'

// Debounce hook to limit API calls while typing
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default function Search() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const { results, loading, search, error } = useProductSearch()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (debouncedQuery.trim()) {
      search(debouncedQuery)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [debouncedQuery, search])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchRef])

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        {query && !loading && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
        {loading && (
           <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
             <Loader className="w-5 h-5 text-gray-400 animate-spin" />
           </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl z-50 overflow-hidden border">
          {error && <div className="p-4 text-center text-red-500">{error.message}</div>}
          
          {!loading && results.length === 0 && debouncedQuery && !error && (
            <div className="p-4 text-center text-gray-500">
              No results found for "{debouncedQuery}"
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul className="max-h-[60vh] overflow-y-auto divide-y">
              {results.map((product) => (
                <li key={product.id}>
                  <Link href={`/products/${product.slug}`}>
                    <a
                      className="flex items-center p-3 hover:bg-amber-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                        <Image
                          src={product.image ?? '/images/placeholder.png'}
                          alt={product.imageAlt ?? product.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600">€{product.price}</p>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
