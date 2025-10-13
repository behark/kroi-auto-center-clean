import Link from 'next/link'
import { Car, ArrowLeft, Search, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car className="h-10 w-10 text-red-600" />
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Autoa ei löytynyt
          </h1>
          <p className="text-gray-600 mb-8">
            Valitettavasti etsimääsi autoa ei löytynyt valikoimastamme. Auto on saatettu jo myydä tai linkki voi olla virheellinen.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/autot"
              className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              <Search className="h-5 w-5 mr-2" />
              Selaa autoja
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Etusivulle
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center w-full text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Takaisin
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Tarvitsetko apua?
            </p>
            <a
              href="tel:+383XXXXXXX"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Soita meille
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}