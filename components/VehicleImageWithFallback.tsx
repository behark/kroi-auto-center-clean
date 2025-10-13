'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Car } from 'lucide-react';

interface VehicleImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
  showPlaceholderIcon?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Vehicle Image Component with robust fallback handling
 * Ensures vehicle images always display with proper placeholders
 */
export default function VehicleImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw',
  priority = false,
  fallbackSrc = '/images/placeholder-vehicle.svg',
  showPlaceholderIcon = true,
  onLoad,
  onError
}: VehicleImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
    onError?.();
  }, [hasError, imageSrc, fallbackSrc, onError]);

  const imageProps = fill
    ? { fill: true, sizes }
    : { width: width || 800, height: height || 600 };

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <Car className="h-12 w-12 animate-pulse" />
          </div>
        </div>
      )}

      {/* Image */}
      <Image
        src={imageSrc}
        alt={alt}
        {...imageProps}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${fill ? 'object-cover' : ''}`}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Error state with icon overlay */}
      {hasError && showPlaceholderIcon && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400">
            <Car className="mx-auto h-16 w-16 mb-2" />
            <p className="text-sm">Autojen kuva</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Export utilities for gallery components
export const createVehicleImageSources = (imagePaths: string[]): string[] => {
  return imagePaths.map(path =>
    path && path.length > 0 ? path : '/images/placeholder-vehicle.svg'
  );
};

export const preloadVehicleImages = (imagePaths: string[]): Promise<void>[] => {
  return imagePaths.map(src =>
    new Promise<void>((resolve, reject) => {
      const img = new globalThis.Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve even on error to not block other images
      img.src = src;
    })
  );
};