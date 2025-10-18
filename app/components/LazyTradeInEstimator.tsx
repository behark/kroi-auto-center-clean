'use client';

import { lazy, Suspense } from 'react';
import { Car, TrendingUp } from 'lucide-react';

// Lazy load the trade-in estimator if it exists
// For now, we'll create a placeholder component
const TradeInEstimator = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-500 rounded-xl">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Vaihtoauton Arvio</h3>
            <p className="text-gray-600">Saa arvio autosi vaihtoarvosta</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auton merkki
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Valitse merkki</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Audi</option>
                <option>Volkswagen</option>
                <option>Skoda</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Malli
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Esim. X5, E-Class"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vuosimalli
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="2020"
                min="1990"
                max="2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kilometrit
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="150000"
              />
            </div>

            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              Laske arvio
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-800">Arvioitu arvo</h4>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-800 mb-2">
                € 0
              </div>
              <p className="text-green-600 text-sm">
                Täytä tiedot saadaksesi arvion
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Markkinahinta:</span>
                <span className="font-medium">€ 0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Vaihtoarvo:</span>
                <span className="font-medium">€ 0</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-gray-600">Lopullinen tarjous:</span>
                <span className="font-bold text-green-600">€ 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
);

// Loading skeleton for trade-in estimator
const TradeInSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-green-500 rounded-xl">
        <Car className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-32 mt-2 animate-pulse"></div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        ))}
        <div className="h-12 bg-green-100 rounded-lg animate-pulse"></div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <div className="h-5 bg-green-200 rounded w-32 animate-pulse"></div>
        </div>

        <div className="text-center">
          <div className="h-8 bg-green-200 rounded w-20 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-green-100 rounded w-32 mx-auto animate-pulse"></div>
        </div>

        <div className="mt-6 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

interface LazyTradeInEstimatorProps {
  className?: string;
}

export default function LazyTradeInEstimator({ className = '' }: LazyTradeInEstimatorProps) {
  return (
    <div className={className}>
      <Suspense fallback={<TradeInSkeleton />}>
        <TradeInEstimator />
      </Suspense>
    </div>
  );
}