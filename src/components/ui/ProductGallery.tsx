import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
  badge?: string
  priority?: boolean
}

export function ProductGallery({
  images,
  productName,
  badge,
  priority = true
}: ProductGalleryProps) {
  const safeImages = images && images.length > 0 ? images : ['/images/placeholder.png']
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false
  })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="space-y-4">
      {/* Main Viewport / Mobile Swipeable Carousel */}
      <div className="relative rounded-3xl overflow-hidden bg-white shadow-md border border-amber-100/80 group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {safeImages.map((src, index) => (
              <div key={index} className="relative flex-[0_0_100%] aspect-square min-w-0 bg-amber-50/40">
                <Image
                  src={src}
                  alt={`${productName} - View ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority={priority && index === 0}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-primary-700 text-white shadow-md z-10">
            {badge.replace('-', ' ')}
          </div>
        )}

        {/* Navigation Arrows (Desktop / Hover) */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              disabled={selectedIndex === 0}
              aria-label="Previous product image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-all hover:bg-white hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={selectedIndex === safeImages.length - 1}
              aria-label="Next product image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-all hover:bg-white hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Mobile Swipe Pagination Dots */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-black/30 backdrop-blur-md rounded-full sm:hidden z-10">
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === idx ? 'bg-white w-5' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails (Desktop & Tablet) */}
      {safeImages.length > 1 && (
        <div className="hidden sm:flex gap-3 overflow-x-auto pb-2 scrollbar-hide" role="group" aria-label="Product image thumbnails">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              type="button"
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                selectedIndex === idx
                  ? 'border-primary-700 ring-2 ring-primary-700/30 shadow-md scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300 opacity-75 hover:opacity-100'
              }`}
              aria-label={`View product image ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
