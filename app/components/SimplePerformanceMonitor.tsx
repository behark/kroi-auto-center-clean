'use client'

import { useEffect } from 'react'

// Simple performance monitoring for the enhanced components
export default function SimplePerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            console.log('🚀 Page Load Metrics:', {
              'DOM Content Loaded': Math.round(navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart),
              'Load Complete': Math.round(navEntry.loadEventEnd - navEntry.loadEventStart),
              'First Paint': navEntry.responseEnd - navEntry.responseStart,
            })
          }

          if (entry.entryType === 'largest-contentful-paint') {
            console.log('🎯 LCP:', Math.round(entry.startTime), 'ms')
          }

          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any
            console.log('⚡ FID:', Math.round(fidEntry.processingStart - fidEntry.startTime), 'ms')
          }
        })
      })

      try {
        observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input'] })
      } catch (error) {
        console.log('Performance Observer not fully supported')
      }

      // Monitor animation performance
      let frameCount = 0
      let lastTime = performance.now()

      function measureFPS() {
        frameCount++
        const currentTime = performance.now()

        if (currentTime >= lastTime + 1000) {
          const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
          if (fps < 55) {
            console.warn('⚠️ Low FPS detected:', fps)
          }
          frameCount = 0
          lastTime = currentTime
        }

        requestAnimationFrame(measureFPS)
      }

      // Start FPS monitoring only in development
      if (process.env.NODE_ENV === 'development') {
        requestAnimationFrame(measureFPS)
      }

      // Clean up
      return () => {
        try {
          observer.disconnect()
        } catch (error) {
          // Observer might not be supported
        }
      }
    }
  }, [])

  return null
}