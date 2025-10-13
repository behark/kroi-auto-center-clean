'use client'

import { useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Loading skeleton component - optimized
const SkeletonCard = memo(() => (
  <div className="loading-skeleton bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-96">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-5 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  </div>
))

SkeletonCard.displayName = 'SkeletonCard'

// Optimized car card with better performance
interface CarCardProps {
  car: {
    id: string
    name: string
    year: string
    price: string
    image: string
    fuel: string
    description: string
    km: string
    transmission: string
    slug: string
  }
  index: number
  isLoading: boolean
  priority?: boolean
}

const CarCard = memo(({ car, index, isLoading, priority = false }: CarCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
  }, [])

  const handleLikeClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(prev => !prev)
  }, [])

  if (isLoading) return <SkeletonCard />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.25, 0.25, 0, 1] // Optimized easing
      }}
      viewport={{ once: true, margin: "50px" }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 will-change-transform"
    >
      {/* Car Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}

        {!imageError && (
          <Image
            src={car.image}
            alt={car.name}
            fill
            className={`object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-2">🚗</div>
              <div className="text-sm">Kuvaa ei voitu ladata</div>
            </div>
          </div>
        )}

        {/* Enhanced overlays */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {car.year}
        </div>
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {car.price}
        </div>

        {/* Like button */}
        <button
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform"
          onClick={handleLikeClick}
          aria-label={`${isLiked ? 'Poista' : 'Lisää'} suosikkeihin`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`} />
        </button>

        {/* Quick view button */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 shadow-lg transition-colors">
            <Eye className="h-4 w-4" />
            <span>Pikatarkastelu</span>
          </button>
        </div>
      </div>

      {/* Car Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {car.name}
          </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors flex-shrink-0 ml-2">
            {car.fuel}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{car.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>{car.km}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>{car.transmission}</span>
          </div>
        </div>

        <Link
          href={`/autot/${car.slug}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg active:scale-95"
        >
          <span className="flex items-center justify-center">
            Näytä Lisätiedot
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>
      </div>
    </motion.div>
  )
})

CarCard.displayName = 'CarCard'

export { CarCard, SkeletonCard }
export default CarCard