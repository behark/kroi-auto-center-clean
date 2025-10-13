import { Metadata } from 'next'
import { Car, Users, Shield, Award, Clock, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - Kroi Auto Center',
  description: 'Learn about Kroi Auto Center - your trusted partner for premium used cars in Finland. Quality vehicles, transparent pricing, exceptional service.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/cars" className="text-gray-700 hover:text-blue-600">Vehicles</Link>
              <Link href="/about" className="text-blue-600 font-medium">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Trusted Auto Partner
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              For over a decade, Kroi Auto Center has been Finland's premier destination for
              quality pre-owned vehicles, exceptional service, and transparent pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2010, Kroi Auto Center began with a simple mission: to provide
              Finnish car buyers with access to premium used vehicles at transparent prices,
              backed by exceptional customer service.
            </p>
            <p className="text-gray-700 mb-6">
              What started as a small family business has grown into one of Finland's most
              trusted automotive dealerships. We've sold over 3,000 vehicles and built lasting
              relationships with customers who return to us again and again.
            </p>
            <p className="text-gray-700">
              Today, we continue to uphold the values that founded our company: honesty,
              quality, and customer satisfaction above all else.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl">
              <div className="flex items-center justify-center text-white">
                <div className="text-center">
                  <Car className="h-24 w-24 mx-auto mb-4 opacity-80" />
                  <p className="text-lg">Since 2010</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape every interaction with our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Transparency</h3>
              <p className="text-gray-600">
                Every vehicle comes with a detailed history report and honest condition assessment.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600">
                We carefully inspect every vehicle and only offer cars that meet our high standards.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're here to help you find the perfect vehicle.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Long-term Support</h3>
              <p className="text-gray-600">
                Our relationship doesn't end at purchase. We provide ongoing support and service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Track Record</h2>
            <p className="text-lg text-gray-600">
              Numbers that reflect our commitment to excellence and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3,000+</div>
              <p className="text-gray-700 font-medium">Vehicles Sold</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">14+</div>
              <p className="text-gray-700 font-medium">Years in Business</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <p className="text-gray-700 font-medium">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-700 font-medium">5-Star Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Kroi Auto Center?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure you have the best car buying experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Inspections</h3>
              <p className="text-gray-700">
                Every vehicle undergoes a thorough 120-point inspection by our certified technicians
                before being offered for sale.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Financing Options</h3>
              <p className="text-gray-700">
                We work with multiple lenders to offer competitive financing rates and flexible
                payment terms to fit your budget.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trade-In Program</h3>
              <p className="text-gray-700">
                Get the best value for your current vehicle with our fair and transparent
                trade-in evaluation process.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Extended Warranties</h3>
              <p className="text-gray-700">
                Optional extended warranty coverage available for additional peace of mind
                and protection of your investment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">After-Sale Support</h3>
              <p className="text-gray-700">
                Our commitment to you continues after the sale with ongoing support,
                maintenance reminders, and service recommendations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Return Policy</h3>
              <p className="text-gray-700">
                5-day money-back guarantee if you're not completely satisfied with your purchase.
                Your confidence is our priority.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Vehicle?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our inventory or contact us today. Our team is ready to help you find
            the ideal car for your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cars"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Browse Vehicles
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
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