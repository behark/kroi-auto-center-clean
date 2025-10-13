'use client'

import { useEffect } from 'react'

// Core Web Vitals monitoring component
const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and on client side
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return

    // Import web vitals library dynamically to reduce bundle size
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // Send vitals to analytics (replace with your analytics service)
      function sendToAnalytics(metric: any) {
        // Example: Google Analytics 4
        if (typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', metric.name, {
            event_category: 'Web Vitals',
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_label: metric.id,
            non_interaction: true,
          })
        }

        // Example: Console logging for development
        if (process.env.NODE_ENV === 'development') {
          console.log('Web Vital:', metric)
        }

        // You could also send to your own analytics service
        // fetch('/api/analytics', {
        //   method: 'POST',
        //   body: JSON.stringify(metric),
        //   headers: { 'Content-Type': 'application/json' }
        // })
      }

      // Monitor all Core Web Vitals
      onCLS(sendToAnalytics)
      onINP(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
    }).catch(err => {
      console.warn('Failed to load web-vitals:', err)
    })

    // Performance observer for other metrics
    if ('PerformanceObserver' in window) {
      try {
        // Monitor Long Tasks
        const longTaskObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            // Log tasks longer than 50ms
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration + 'ms')
            }
          }
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })

        // Monitor Navigation Timing
        const navigationObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming

              // Log key navigation metrics
              console.log('Navigation Timing:', {
                'DNS Lookup': navEntry.domainLookupEnd - navEntry.domainLookupStart,
                'TCP Connect': navEntry.connectEnd - navEntry.connectStart,
                'Request': navEntry.responseStart - navEntry.requestStart,
                'Response': navEntry.responseEnd - navEntry.responseStart,
                'DOM Processing': navEntry.domContentLoadedEventStart - navEntry.responseEnd,
                'Load Complete': navEntry.loadEventEnd - navEntry.startTime,
              })
            }
          }
        })
        navigationObserver.observe({ entryTypes: ['navigation'] })

        // Monitor Resource Loading
        const resourceObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const resourceEntry = entry as PerformanceResourceTiming

            // Warn about slow resources
            if (resourceEntry.duration > 1000) {
              console.warn('Slow resource:', resourceEntry.name, resourceEntry.duration + 'ms')
            }
          }
        })
        resourceObserver.observe({ entryTypes: ['resource'] })
      } catch (error) {
        console.warn('PerformanceObserver not supported or failed:', error)
      }
    }

    // Memory usage monitoring (if available)
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory
        if (memory) {
          console.log('Memory Usage:', {
            'Used': Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
            'Total': Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
            'Limit': Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB',
          })
        }
      }

      // Check memory every 30 seconds
      const memoryInterval = setInterval(checkMemory, 30000)
      return () => clearInterval(memoryInterval)
    }
  }, [])

  return null // This component doesn't render anything
}

export default PerformanceMonitor