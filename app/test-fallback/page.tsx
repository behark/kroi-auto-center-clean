'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VehicleImageWithFallback from '../../components/VehicleImageWithFallback';
import { testVehicleImages, createTestImages, generateImageFallbackReport, ImageTestResult } from '../../lib/imageTestUtils';
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

/**
 * Test page for vehicle image fallback system
 * This page helps developers verify that the fallback system works correctly
 * Remove this page before production deployment
 */
export default function TestFallbackPage() {
  const [testResults, setTestResults] = useState<ImageTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  // Test images - mix of valid, invalid, and edge cases
  const testImages = [
    '/images/placeholder-vehicle.svg', // Should work
    '/images/nonexistent-car.jpg', // Should fallback
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400', // External - may work
    'https://invalid-domain.com/car.jpg', // Should fallback
    '', // Empty string - should fallback
    '/images/test-car.png', // Likely doesn't exist - should fallback
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="blue"/></svg>', // Data URL - should work
  ];

  const runFallbackTest = async () => {
    setIsLoading(true);
    try {
      const results = await testVehicleImages(testImages);
      setTestResults(results);

      const report = await generateImageFallbackReport(testImages);
      setReportData(report);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runFallbackTest();
  }, []);

  const getStatusIcon = (isValid: boolean) => {
    return isValid ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Page Not Available</h1>
          <p className="text-gray-600">This fallback test page is only available in development mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vehicle Image Fallback Test
          </h1>
          <p className="text-gray-600 mb-4">
            Testing the robustness of vehicle image loading and fallback system
          </p>
          <button
            onClick={runFallbackTest}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Testing...' : 'Run Test'}
          </button>
        </div>

        {/* Test Results Summary */}
        {reportData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{reportData.totalImages}</div>
                <div className="text-sm text-gray-600">Total Images</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{reportData.validImages}</div>
                <div className="text-sm text-gray-600">Valid</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{reportData.invalidImages}</div>
                <div className="text-sm text-gray-600">Invalid (Fallback)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{reportData.fallbackRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Fallback Rate</div>
              </div>
            </div>

            {reportData.recommendations.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Recommendations:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {reportData.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-yellow-700 text-sm">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Image Gallery Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Visual Fallback Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testImages.map((src, index) => (
              <div key={index} className="space-y-2">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <VehicleImageWithFallback
                    src={src}
                    alt={`Test image ${index + 1}`}
                    fill
                    showPlaceholderIcon
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {testResults[index] && getStatusIcon(testResults[index].isValid)}
                  <span className="font-mono text-xs truncate flex-1">
                    {src || '(empty string)'}
                  </span>
                </div>
                {testResults[index] && !testResults[index].isValid && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                    Expected fallback: Will use placeholder-vehicle.svg
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Results */}
        {testResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Source</th>
                    <th className="text-left p-2">Load Time</th>
                    <th className="text-left p-2">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((result, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        {getStatusIcon(result.isValid)}
                      </td>
                      <td className="p-2 font-mono text-xs max-w-xs truncate">
                        {result.src || '(empty)'}
                      </td>
                      <td className="p-2">
                        {result.loadTime ? `${result.loadTime}ms` : 'N/A'}
                      </td>
                      <td className="p-2 text-red-600 text-xs">
                        {result.error || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8"
        >
          <h3 className="font-semibold text-blue-900 mb-2">How to interpret results:</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
            <li><strong>Valid images:</strong> Load successfully without fallback</li>
            <li><strong>Invalid images:</strong> Automatically fallback to placeholder-vehicle.svg</li>
            <li><strong>Fallback rate:</strong> Percentage of images that needed fallback - lower is better</li>
            <li><strong>Load time:</strong> Time to load or determine failure - faster is better</li>
          </ul>
          <p className="text-blue-700 text-sm mt-4">
            <strong>Note:</strong> This test page should be removed before production deployment.
          </p>
        </motion.div>
      </div>
    </div>
  );
}