'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Car, Phone, Menu, X, ArrowRight, Award, Shield, Clock, Wrench,
  Settings, Search, FileCheck, CreditCard, Handshake, TrendingUp,
  CheckCircle, Battery, Gauge, Zap, Droplet, Wind,
  AlertTriangle, Users, Star, Calendar, DollarSign, BadgeCheck,
  CircleCheckBig, Heart, Sparkles
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getServices, getBusinessInfo } from '../lib/sanityDataService'

interface Service {
  id: string
  title: string
  description: string
  price?: number
  duration?: string
  features: string[]
  category: string
  businessTypes: string[]
  popular?: boolean
}

interface BusinessInfo {
  name: string
  description: string
  established: number
  certifications: string[]
}

export default function EnhancedServicesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [servicesData, businessData] = await Promise.all([
          getServices(),
          getBusinessInfo()
        ])

        setServices(servicesData)
        setBusinessInfo(businessData)
      } catch (error) {
        console.error('Error fetching services:', error)
        // Fallback to default services if API fails
        setServices([
          {
            id: 'sales',
            title: 'Automyynti',
            description: 'Laaja valikoima laadukkaita käytettyjä autoja',
            features: [
              'Yli 150 autoa varastossa',
              'Kaikki autot tarkastettu',
              'Rahoitusmahdollisuus',
              '12-36 kuukauden takuu',
              'Vaihtoautopalvelu',
              'Ilmainen toimitus'
            ],
            price: 7500,
            category: 'sales',
            businessTypes: ['service-center']
          },
          {
            id: 'service',
            title: 'Huolto ja Korjaus',
            description: 'Ammattitaitoista huoltoa kaikille automerkeille',
            features: [
              'Merkkihuollot',
              'Määräaikaishuollot',
              'Ilmastointihuollot',
              'Jarrujen huolto',
              'Öljynvaihdot',
              'Rengaspalvelut'
            ],
            price: 99,
            category: 'maintenance',
            businessTypes: ['service-center']
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'sales': return Car
      case 'maintenance': return Wrench
      case 'repair': return Settings
      case 'inspection': return FileCheck
      case 'financing': return CreditCard
      default: return Wrench
    }
  }

  const getServiceColor = (category: string) => {
    switch (category) {
      case 'sales': return 'from-blue-500 to-blue-600'
      case 'maintenance': return 'from-orange-500 to-orange-600'
      case 'repair': return 'from-red-500 to-red-600'
      case 'inspection': return 'from-purple-500 to-purple-600'
      case 'financing': return 'from-green-500 to-green-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const formatPrice = (price?: number) => {
    if (!price) return 'Pyydä tarjousta'
    if (price < 1000) return `€${price}`
    return `€${(price / 1000).toFixed(1)}k`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl border-b-4 border-blue-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-4">
                <div className="flex items-center bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-lg shadow-lg">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white tracking-wide">
                    {businessInfo?.name || 'Kroi Auto Center'}
                  </span>
                  <span className="text-xs text-blue-200 font-medium">Luotettavat Käytetyt Autot & Autopalvelut</span>
                </div>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-800/30" href="/autot">Autot</Link>
              <Link className="text-blue-300 font-semibold px-3 py-2 rounded-md bg-blue-800/30" href="/palvelut">Palvelut</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-800/30" href="/rahoitus">Rahoitus</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-800/30" href="/tietoa">Tietoa</Link>
              <Link className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" href="/yhteystiedot">Ota Yhteyttä</Link>
            </nav>

            <button
              className="lg:hidden p-2 rounded-md text-white hover:bg-blue-800/30 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Award className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Täyden Palvelun Autoliike</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Kattavat Autopalvelut</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Tarjoamme kokonaisvaltaisen palvelupaketin automyynnnistä huoltoon. Yli 15+ vuoden kokemuksella palvelemme asiakkaitamme ammattitaidolla.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
              >
                <div className="text-3xl font-bold text-white">2,500+</div>
                <div className="text-sm text-blue-200">Myytyä autoa</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
              >
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-blue-200">Tyytyväisyys</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
              >
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-sm text-blue-200">Asiantuntijaa</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
              >
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-blue-200">Asiakastuki</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Palvelumme</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Valitse alla olevista palveluistamme tai ota yhteyttä saadaksesi räätälöidyn ratkaisun
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = getServiceIcon(service.category)
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getServiceColor(service.category)} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    <ul className="space-y-3 mb-6">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <span className="text-sm font-semibold text-gray-600">
                        {formatPrice(service.price)}
                      </span>
                      <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        Lue lisää
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedService(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{selectedService.title}</h3>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedService.description}</p>

              <h4 className="font-semibold text-gray-900 mb-4">Palvelu sisältää:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {selectedService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Hinta</span>
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(selectedService.price)}</span>
                </div>
                <p className="text-sm text-gray-600">Kysy tarjousta saadaksesi tarkka hinta-arvio</p>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/yhteystiedot"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Ota Yhteyttä
                </Link>
                <Link
                  href="/yhteystiedot"
                  className="flex-1 border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Varaa Aika
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Valmis Aloittamaan?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Ota yhteyttä ja kerro tarpeistasi. Autamme sinua löytämään parhaan ratkaisun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/yhteystiedot"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Ota Yhteyttä
            </Link>
            <Link
              href="/autot"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 transition-colors inline-flex items-center justify-center"
            >
              Selaa Autoja
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}