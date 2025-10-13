import { client } from '../../lib/sanity'
import { Car } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../lib/sanity'
import type { Car as CarType } from '../../types/car'

async function getCars(): Promise<CarType[]> {
  try {
    const cars = await client.fetch(`
      *[_type == "car"] | order(createdAt desc) {
        _id,
        name,
        price,
        year,
        mileage,
        fuel,
        transmission,
        image,
        slug,
        featured,
        description
      }
    `)
    return cars || []
  } catch (error) {
    console.error('Error fetching cars:', error)
    return []
  }
}

export default async function CarsPage() {
  const cars = await getCars()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Kroi Auto Center</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/cars" className="text-blue-600 font-medium">Vehicles</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Vehicle Inventory
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Browse our collection of premium pre-owned vehicles. Each car is carefully inspected and comes with transparent pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option value="">All Makes</option>
              <option value="bmw">BMW</option>
              <option value="mercedes">Mercedes-Benz</option>
              <option value="audi">Audi</option>
              <option value="volkswagen">Volkswagen</option>
              <option value="toyota">Toyota</option>
            </select>

            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option value="">Price Range</option>
              <option value="0-10000">€0 - €10,000</option>
              <option value="10000-20000">€10,000 - €20,000</option>
              <option value="20000-30000">€20,000 - €30,000</option>
              <option value="30000+">€30,000+</option>
            </select>

            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option value="">Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>

            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option value="">Year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cars.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {cars.length} Vehicle{cars.length !== 1 ? 's' : ''} Available
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 relative">
                    {car.image ? (
                      <Image
                        src={urlFor(car.image).width(400).height(250).url()}
                        alt={car.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <Car className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    {car.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.name}</h3>
                    <p className="text-gray-600 mb-4">{car.year} • {car.mileage?.toLocaleString() || 'N/A'} km</p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-blue-600">€{car.price?.toLocaleString() || 'N/A'}</span>
                      <div className="flex space-x-2 text-sm text-gray-500">
                        <span>{car.fuel || 'N/A'}</span>
                        <span>•</span>
                        <span>{car.transmission || 'N/A'}</span>
                      </div>
                    </div>

                    {car.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{car.description}</p>
                    )}

                    <div className="flex space-x-2">
                      <Link
                        href={car.slug?.current ? `/cars/${car.slug.current}` : '#'}
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                      <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Vehicles Available</h3>
            <p className="text-gray-600 mb-8">
              We're currently updating our inventory. Please check back soon or contact us for more information.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We have access to hundreds of vehicles through our network. Let us know what you're looking for and we'll find it for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="tel:+358XXXXXXXX"
                className="border border-gray-300 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Kroi Auto Center</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium used cars with transparent pricing and exceptional service
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Kroi Auto Center. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}