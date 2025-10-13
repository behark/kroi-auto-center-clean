'use client'

import { motion } from 'framer-motion'
import { Award, Shield, Users, Clock } from 'lucide-react'
import { siteConfig } from '../lib/siteConfig'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container-responsive">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Tietoa Meistä</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              {siteConfig.description}
            </p>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {siteConfig.business.experience} Kokemusta Autoalalta
              </h2>
              <p className="text-gray-600 mb-6">
                Perustettiin {siteConfig.business.established} ja olemme kasvaneet yhdeksi alueen luotetuimmista autoliikkeistä.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{siteConfig.business.vehiclesSold}</div>
                  <div className="text-gray-600">Myytyä Autoa</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{siteConfig.business.satisfactionRate}</div>
                  <div className="text-gray-600">Tyytyväisyys</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Laatutakuu</h3>
                <p className="text-sm text-gray-600">Kaikille autoille</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Luotettava</h3>
                <p className="text-sm text-gray-600">Sertifioitu jälleenmyyjä</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Asiantunteva</h3>
                <p className="text-sm text-gray-600">{siteConfig.business.employeeCount} henkilöä</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">24/7 Tuki</h3>
                <p className="text-sm text-gray-600">Aina saatavilla</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
