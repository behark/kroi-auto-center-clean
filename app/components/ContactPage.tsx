'use client'

import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'
import { siteConfig } from '../lib/siteConfig'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container-responsive">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Yhteystiedot</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Ota yhteyttä ja tutustu valikoimaamme. Olemme täällä auttamassa sinua löytämään täydellisen auton.
            </p>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Ota Yhteyttä</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Puhelin</h3>
                    <p className="text-gray-600">{siteConfig.phone.primary.display}</p>
                    <p className="text-sm text-gray-500">Ma-Pe 9:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sähköposti</h3>
                    <p className="text-gray-600">{siteConfig.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Osoite</h3>
                    <p className="text-gray-600">{siteConfig.address.full}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Aukioloajat</h3>
                    <div className="space-y-1">
                      {siteConfig.hours.map((hour, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600 min-w-[120px]">{hour.label}</span>
                          <span className="text-gray-900 font-medium">{hour.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Lähetä Viesti</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Etunimi</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Etunimi" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sukunimi</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Sukunimi" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sähköposti</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="sahkoposti@esimerkki.fi" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Viesti</label>
                  <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Kerro meille kuinka voimme auttaa..."></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">Lähetä Viesti</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
