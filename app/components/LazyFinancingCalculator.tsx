'use client';

import { lazy, Suspense } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

// Lazy load the heavy FinancingCalculator component
const FinancingCalculator = lazy(() => import('./FinancingCalculator'));

// Loading component for better UX
const CalculatorSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-blue-500 rounded-xl">
        <Calculator className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-32 mt-2 animate-pulse"></div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Input fields skeleton */}
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        ))}
        <div className="h-12 bg-blue-100 rounded-lg animate-pulse"></div>
      </div>

      {/* Results skeleton */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <div className="h-5 bg-blue-200 rounded w-32 animate-pulse"></div>
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Error boundary component
const CalculatorError = () => (
  <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
    <Calculator className="w-12 h-12 text-red-500 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-red-800 mb-2">
      Laskuri ei latautunut
    </h3>
    <p className="text-red-600">
      Yritä päivittää sivu tai ota yhteyttä asiakaspalveluun.
    </p>
  </div>
);

interface LazyFinancingCalculatorProps {
  className?: string;
}

export default function LazyFinancingCalculator({ className = '' }: LazyFinancingCalculatorProps) {
  return (
    <div className={className}>
      <Suspense fallback={<CalculatorSkeleton />}>
        <ErrorBoundary fallback={<CalculatorError />}>
          <FinancingCalculator />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

// Simple error boundary
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('FinancingCalculator error:', error);
    return <>{fallback}</>;
  }
}