import { useState, useEffect, useRef, useId } from 'react'
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
  const listboxId = useId()

  useEffect(() => {
    if (debouncedQuery.trim()) {
      search(debouncedQuery)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [debouncedQuery, search])

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [searchRef])

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div 
        className="relative"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-owns={listboxId}
      >
        <input
          type="search"
          placeholder="Search handcrafted baskets..."
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls={listboxId}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 hover:bg-white focus:bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all text-sm shadow-inner"
        />
        <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
          <SearchIcon className="w-4 h-4" />
        </div>
        {query && !loading && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 rounded-full"
            aria-label="Clear search query"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {loading && (
          <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2" aria-label="Searching...">
            <Loader className="w-4 h-4 text-primary-600 animate-spin" />
          </div>
        )}
      </div>

      {isOpen && (
        <div 
          id={listboxId}
          role="listbox"
          className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl z-50 overflow-hidden border border-amber-100 animate-fadeIn"
        >
          {error && <div className="p-4 text-center text-sm text-red-600">{error.message}</div>}
          
          {!loading && results.length === 0 && debouncedQuery && !error && (
            <div className="p-5 text-center text-sm text-gray-500">
              No baskets found for &ldquo;<span className="font-semibold text-gray-700">{debouncedQuery}</span>&rdquo;
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
              {results.map((product) => (
                <li key={product.id} role="option" aria-selected="false">
                  <Link href={`/products/${product.slug}`}>
                    <a
                      className="flex items-center p-3.5 hover:bg-amber-50/80 transition-colors group"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden mr-3.5 flex-shrink-0 bg-gray-100 border border-gray-100">
                        <Image
                          src={product.image ?? '/images/placeholder.png'}
                          alt={product.imageAlt ?? product.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold text-sm text-gray-900 group-hover:text-primary-700 transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-xs font-bold text-primary-800 mt-0.5">€{product.price}</p>
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
