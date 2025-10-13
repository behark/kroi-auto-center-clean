/**
 * Image Fallback Test Utilities for Kroi Auto Center
 * These utilities help test and validate the vehicle image fallback system
 */

export interface ImageTestResult {
  src: string;
  isValid: boolean;
  loadTime?: number;
  error?: string;
}

/**
 * Test if an image URL loads successfully
 */
export const testImageLoad = (src: string): Promise<ImageTestResult> => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const img = new Image();

    img.onload = () => {
      resolve({
        src,
        isValid: true,
        loadTime: Date.now() - startTime
      });
    };

    img.onerror = (error) => {
      resolve({
        src,
        isValid: false,
        error: error.toString()
      });
    };

    img.src = src;
  });
};

/**
 * Test multiple vehicle images and their fallback behavior
 */
export const testVehicleImages = async (
  imagePaths: string[]
): Promise<ImageTestResult[]> => {
  const tests = imagePaths.map(path => testImageLoad(path));
  return Promise.all(tests);
};

/**
 * Simulate image loading failures to test fallback system
 */
export const createTestImages = (count: number = 5): string[] => {
  return [
    '/images/valid-car-1.jpg', // This might not exist - should fallback
    'https://example.com/invalid-image.jpg', // External invalid - should fallback
    '/images/placeholder-vehicle.svg', // This should exist
    '', // Empty string - should fallback
    '/images/nonexistent-car.png', // Doesn't exist - should fallback
    ...Array(count - 5).fill('/images/placeholder-vehicle.svg')
  ].slice(0, count);
};

/**
 * Generate report on image fallback system performance
 */
export const generateImageFallbackReport = async (
  testImages: string[]
): Promise<{
  totalImages: number;
  validImages: number;
  invalidImages: number;
  averageLoadTime: number;
  fallbackRate: number;
  recommendations: string[];
}> => {
  const results = await testVehicleImages(testImages);
  const validResults = results.filter(r => r.isValid);
  const invalidResults = results.filter(r => !r.isValid);

  const averageLoadTime = validResults.length > 0
    ? validResults.reduce((sum, r) => sum + (r.loadTime || 0), 0) / validResults.length
    : 0;

  const fallbackRate = (invalidResults.length / results.length) * 100;

  const recommendations: string[] = [];

  if (fallbackRate > 50) {
    recommendations.push('High fallback rate detected. Consider optimizing image sources.');
  }

  if (averageLoadTime > 2000) {
    recommendations.push('Slow image loading detected. Consider image optimization.');
  }

  if (invalidResults.some(r => r.src.startsWith('http'))) {
    recommendations.push('External image failures detected. Consider hosting images locally.');
  }

  return {
    totalImages: results.length,
    validImages: validResults.length,
    invalidImages: invalidResults.length,
    averageLoadTime,
    fallbackRate,
    recommendations
  };
};

/**
 * Console logger for development debugging
 */
export const logImageFallback = (
  originalSrc: string,
  fallbackSrc: string,
  reason: string
): void => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🖼️ Image Fallback');
    console.warn('Original:', originalSrc);
    console.info('Fallback:', fallbackSrc);
    console.log('Reason:', reason);
    console.groupEnd();
  }
};

/**
 * Preload critical vehicle images
 */
export const preloadCriticalImages = (imagePaths: string[]): Promise<void> => {
  const preloadPromises = imagePaths.slice(0, 3).map(src =>
    new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Don't block on errors
      img.src = src;
    })
  );

  return Promise.all(preloadPromises).then(() => {});
};