'use client'

export default function VehicleDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          BMW 318
        </h1>
        <p className="text-xl text-gray-600">2017 • 235000 km • Diesel • Automaatti</p>
        <div className="text-4xl font-bold text-blue-600 mb-2">€14,100</div>
      </div>
    </div>
  )
}