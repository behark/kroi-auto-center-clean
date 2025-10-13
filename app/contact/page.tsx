import { Metadata } from 'next'
import { Car, MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us - Kroi Auto Center',
  description: 'Get in touch with Kroi Auto Center. Visit our showroom in Helsinki, call us, or send a message. We\'re here to help you find your perfect vehicle.',
}

export default function ContactPage() {
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
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-blue-600 font-medium">Contact</Link>
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
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Ready to find your perfect vehicle? Our team is here to help you every step of the way.
              Visit us, call, or send a message - we'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Visit Our Showroom</h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Address</h3>
                  <p className="text-gray-700">
                    Kroi Auto Center<br />
                    Autokauppakatu 25<br />
                    00180 Helsinki, Finland
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Phone</h3>
                  <p className="text-gray-700">
                    <a href="tel:+358401234567" className="hover:text-blue-600">+358 40 123 4567</a><br />
                    <span className="text-sm text-gray-500">Monday - Saturday, 9:00 - 18:00</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
                  <p className="text-gray-700">
                    <a href="mailto:info@kroiauto.fi" className="hover:text-blue-600">info@kroiauto.fi</a><br />
                    <span className="text-sm text-gray-500">We respond within 2 hours</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Opening Hours</h3>
                  <div className="text-gray-700">
                    <p>Monday - Friday: 9:00 - 18:00</p>
                    <p>Saturday: 10:00 - 16:00</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">WhatsApp</h3>
                  <p className="text-gray-700">
                    <a href="https://wa.me/358401234567" className="hover:text-blue-600">+358 40 123 4567</a><br />
                    <span className="text-sm text-gray-500">Quick questions and appointments</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+358401234567"
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/358401234567"
                  className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="+358 XX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select a subject...</option>
                  <option value="inquiry">General Inquiry</option>
                  <option value="vehicle">Vehicle Information</option>
                  <option value="financing">Financing Options</option>
                  <option value="trade-in">Trade-In Valuation</option>
                  <option value="service">After-Sale Service</option>
                  <option value="appointment">Schedule Appointment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-900 mb-2">
                  Budget Range (Optional)
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select budget range...</option>
                  <option value="under-10k">Under €10,000</option>
                  <option value="10k-20k">€10,000 - €20,000</option>
                  <option value="20k-30k">€20,000 - €30,000</option>
                  <option value="30k-50k">€30,000 - €50,000</option>
                  <option value="over-50k">Over €50,000</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Tell us about your vehicle needs, questions, or how we can help you..."
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="consent" className="ml-2 text-sm text-gray-700">
                  I agree to be contacted regarding my inquiry and understand that my information will be handled according to the privacy policy. *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>

              <p className="text-sm text-gray-500 text-center">
                We typically respond within 2 hours during business hours.
              </p>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us</h2>
          <div className="bg-gray-100 rounded-2xl p-8">
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                <p className="mb-4">Autokauppakatu 25, 00180 Helsinki</p>
                <p className="text-sm">
                  Easily accessible by public transport<br />
                  Free parking available for customers
                </p>
              </div>
            </div>
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