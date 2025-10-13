'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Car, Sparkles } from 'lucide-react'

// Premium loading spinner with Finnish branding
export const PremiumLoader = ({ size = 'md', text = 'Ladataan...' }: { size?: 'sm' | 'md' | 'lg' | 'xl', text?: string }) => {
  const sizes: Record<string, string> = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className={`${sizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full`} />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Car className="h-4 w-4 text-blue-600" />
        </motion.div>
      </motion.div>

      {text && (
        <motion.p
          className="text-sm text-gray-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Car dealership themed skeleton loader
export const CarCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
    {/* Image skeleton */}
    <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer">
      <div className="absolute top-4 left-4 bg-gray-300 rounded-full h-6 w-16"></div>
      <div className="absolute top-4 right-4 bg-gray-300 rounded-full h-6 w-20"></div>
    </div>

    {/* Content skeleton */}
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-5 bg-gray-200 rounded w-16"></div>
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>

      <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-xl"></div>
    </div>
  </div>
)

// Hero section skeleton
export const HeroSkeleton = () => (
  <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          {/* Trust badges skeleton */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/10 px-3 py-2 rounded-full h-8 w-32"></div>
            ))}
          </div>

          {/* Title skeleton */}
          <div className="space-y-4">
            <div className="h-16 bg-white/10 rounded w-3/4"></div>
            <div className="h-16 bg-white/10 rounded w-4/5"></div>
            <div className="h-6 bg-white/10 rounded w-full mt-4"></div>
            <div className="h-6 bg-white/10 rounded w-3/4"></div>
          </div>

          {/* Feature cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/5 p-4 rounded-lg h-20"></div>
            ))}
          </div>

          {/* CTA buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white/10 h-14 rounded-xl w-48"></div>
            <div className="bg-white/10 h-14 rounded-xl w-56"></div>
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="lg:pl-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white/10 p-6 rounded-xl h-24"></div>
            ))}
          </div>
          <div className="bg-white/15 p-6 rounded-xl h-40"></div>
        </div>
      </div>
    </div>
  </div>
)

// Success animation component
export const SuccessAnimation = ({ message = 'Onnistui!' }: { message?: string }) => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 text-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
  >
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    >
      <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
        <motion.svg
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </div>

      <motion.div
        className="absolute inset-0 rounded-full border-4 border-green-200"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </motion.div>

    <motion.p
      className="text-lg font-semibold text-green-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {message}
    </motion.p>
  </motion.div>
)

// Error animation component
export const ErrorAnimation = ({ message = 'Jokin meni vikaan' }: { message?: string }) => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 text-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
  >
    <motion.div
      className="h-16 w-16 bg-red-500 rounded-full flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    >
      <motion.svg
        className="h-8 w-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
      </motion.svg>
    </motion.div>

    <motion.p
      className="text-lg font-semibold text-red-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      {message}
    </motion.p>
  </motion.div>
)

// Loading overlay for forms and interactions
export const LoadingOverlay = ({ message = 'Käsitellään pyyntöä...' }: { message?: string }) => (
  <motion.div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4"
      initial={{ scale: 0.8, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.8, y: 20 }}
    >
      <PremiumLoader size="lg" text={message} />
    </motion.div>
  </motion.div>
)

// Shimmer effect component for better loading states
export const ShimmerCard = ({ className = '', children }: { className?: string, children: React.ReactNode }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
    {children}
  </div>
)

// Progressive image loader with Finnish text
export const ProgressiveImage = ({ src, alt, className = '', ...props }: { src: string, alt: string, className?: string, [key: string]: any }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="text-xs text-gray-600">Ladataan kuvaa...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
              <Car className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Kuva ei latautunut</span>
          </div>
        </div>
      )}

      <motion.img
        src={src}
        alt={alt}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        initial={{ scale: 1.1 }}
        animate={{ scale: loaded ? 1 : 1.1 }}
        transition={{ duration: 0.5 }}
        {...props}
      />
    </div>
  )
}