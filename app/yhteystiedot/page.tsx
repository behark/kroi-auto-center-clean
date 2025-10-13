'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, Calendar, User, Star, Navigation } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '../lib/siteConfig'

export default function YhteystiedotPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: ''
      })
    }, 5000)
  }

  const contactReasons = [
    { value: 'general', label: 'Yleinen tiedustelu' },
    { value: 'car-inquiry', label: 'Autokysely' },
    { value: 'financing', label: 'Rahoitus' },
    { value: 'service', label: 'Huolto ja korjaus' },
    { value: 'trade-in', label: 'Vaihtoauto' },
    { value: 'test-drive', label: 'Koeajo' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Metadata */}
      <title>Yhteystiedot - Ota Yhteyttä | Kroi Auto Center</title>
      <meta name="description" content="Ota yhteyttä Kroi Auto Centeriin. Olemme avoinna Ma-Pe 9-18, La 9-16. Soita, lähetä viesti tai tule käymään liikkeessämme Pristinassa." />

      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl border-b-4 border-blue-500 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-4">
              <div className="flex items-center bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-lg shadow-lg">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-wide">{siteConfig.name}</span>
                <span className="text-xs text-blue-200 font-medium">{siteConfig.subtitle}</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/autot">Autot</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/palvelut">Palvelut</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/rahoitus">Rahoitus</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/tietoa">Tietoa</Link>
              <Link className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold border-2 border-blue-600" href="/yhteystiedot">Ota Yhteyttä</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-900 via-blue-900 to-slate-900 text-white py-16">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-teal-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-teal-300 font-semibold mb-6">
              <MessageSquare className="h-4 w-4 mr-2" />
              OLEMME TÄÄLLÄ AUTTAAKSEMME
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Ota <span className="text-teal-400">Yhteyttä</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Auttoamme sinua löytämään täydellisen auton. Vastaamme kaikkiin kysymyksiisi nopeasti ja ammattitaidolla.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Puhelin</h3>
              <p className="text-blue-600 font-semibold">{siteConfig.phone.display}</p>
              <p className="text-sm text-gray-600 mt-1">Ma-Pe 9-18, La 9-16</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sähköposti</h3>
              <p className="text-blue-600 font-semibold">{siteConfig.email}</p>
              <p className="text-sm text-gray-600 mt-1">Vastaamme 24h sisällä</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sijainti</h3>
              <p className="text-blue-600 font-semibold">{siteConfig.address.full}</p>
              <p className="text-sm text-gray-600 mt-1">Helppo pääsy</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Aukioloajat</h3>
              <div className="text-sm space-y-1">
                <p className="text-gray-700">Ma-Pe: 09:00 - 18:00</p>
                <p className="text-gray-700">La: 09:00 - 16:00</p>
                <p className="text-gray-700">Su: Suljettu</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Lähetä Viesti
              </h2>
              <p className="text-gray-600 mb-8">
                Täytä lomake niin otamme sinuun yhteyttä mahdollisimman pian.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Kiitos viestistäsi!</h3>
                  <p className="text-gray-600">Otamme sinuun yhteyttä mahdollisimman pian.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Nimi *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nimesi"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                        Puhelin
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+358 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Sähköposti *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="sahkoposti@esimerkki.fi"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                      Aihe *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    >
                      {contactReasons.map(reason => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      Viesti *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Kerro meille, miten voimme auttaa..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Lähetetään...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Lähetä Viesti
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Tervetuloa Käymään
                </h2>
                <p className="text-gray-600 mb-6">
                  Liikkeemme sijaitsee keskeisellä paikalla Pristinassa. Meillä on laaja valikoima autoja esillä ja ammattitaitoinen henkilökunta palvelemassa sinua.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Pikatoiminnot</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${siteConfig.phone.tel}`}
                    className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-green-600 mr-3" />
                      <span className="font-medium text-gray-900">Soita Meille</span>
                    </div>
                    <span className="text-green-600 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <Link
                    href="/autot"
                    className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900">Selaa Autoja</span>
                    </div>
                    <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <Link
                    href="/rahoitus"
                    className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-purple-600 mr-3" />
                      <span className="font-medium text-gray-900">Varaa Koeajo</span>
                    </div>
                    <span className="text-purple-600 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Miksi Ottaa Yhteyttä?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Saat asiantuntevaa neuvontaa autovalinnassa</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Räätälöimme rahoituksen tarpeisiisi</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Varaamme sinulle henkilökohtaisen esittelyn</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vastaamme kaikkiin kysymyksiisi</span>
                  </li>
                </ul>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="italic mb-4">
                  "Erinomainen palvelu! Henkilökunta oli erittäin avulias ja ammattitaitoinen. Sain juuri sellaisen auton kuin halusin."
                </p>
                <p className="font-semibold">- Tyytyväinen Asiakas</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Löydä Meidät
            </h2>
            <p className="text-gray-600">
              Sijaitsemme keskeisellä paikalla Pristinassa, helposti saavutettavissa
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Kartta ladataan...</p>
                <div className="bg-blue-50 text-blue-700 p-4 rounded-lg max-w-md mx-auto">
                  <p className="font-semibold mb-2">📍 {siteConfig.address.full}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address.full)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Avaa Google Mapsissa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}