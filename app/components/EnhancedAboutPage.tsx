'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Shield, Users, Clock, MapPin, Phone, Mail, Star, CheckCircle } from 'lucide-react'
import { getBusinessInfo, getTeamMembers } from '../lib/sanityDataService'

interface BusinessInfo {
  name: string
  type: string
  description: string
  established: number
  address: {
    street: string
    city: string
    country: string
    zipCode: string
  }
  contact: {
    phone: string
    email: string
    website: string
  }
  hours: any
  certifications: string[]
  languages: string[]
  social: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
}

interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  phone: string
  experience: string
  languages: string[]
  specialties: string[]
  image?: any
  bio: string
}

export default function EnhancedAboutPage() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [business, team] = await Promise.all([
          getBusinessInfo(),
          getTeamMembers()
        ])

        if (business) {
          setBusinessInfo(business)
        }
        setTeamMembers(team)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load business information')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  // Fallback to static data if no Sanity data
  const currentYear = new Date().getFullYear()
  const experienceYears = businessInfo?.established
    ? currentYear - businessInfo.established
    : 15

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Tietoa Meistä
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {businessInfo?.description || 'Luotettava autoalan ammattilainen yli 15 vuoden kokemuksella'}
            </motion.p>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Company Story */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {experienceYears}+ Vuotta Kokemusta Autoalalta
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {businessInfo?.name || 'Kroi Auto Center'} perustettiin vuonna {businessInfo?.established || 2008}
                ja olemme kasvaneet yhdeksi alueen luotetuimmista autoliikkeistä.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Tarjoamme laadukkaita autopalveluita ja autoja asiakkaillemme.
                Ammattitaitoiset työntekijämme huolehtivat siitä, että saat parhaan mahdollisen palvelun.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2,500+</div>
                  <div className="text-gray-600">Myytyä Autoa</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-gray-600">Tyytyväisyys</div>
                </div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
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
                <p className="text-sm text-gray-600">{teamMembers.length || 12} henkilöä</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">24/7 Tuki</h3>
                <p className="text-sm text-gray-600">Aina saatavilla</p>
              </div>
            </motion.div>
          </div>

          {/* Business Information */}
          {businessInfo && (
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Yhteystiedot</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Osoite</h3>
                    <p className="text-gray-600">
                      {businessInfo.address.street}<br />
                      {businessInfo.address.city}, {businessInfo.address.country}
                      {businessInfo.address.zipCode && <><br />{businessInfo.address.zipCode}</>}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Puhelin</h3>
                    <p className="text-gray-600">{businessInfo.contact.phone}</p>
                    <p className="text-sm text-gray-500">Ma-Pe 8:00-17:00</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sähköposti</h3>
                    <p className="text-gray-600">{businessInfo.contact.email}</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              {businessInfo.certifications && businessInfo.certifications.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-2" />
                    Sertifioinnit
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {businessInfo.certifications.map((cert, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {businessInfo.languages && businessInfo.languages.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    Kielet
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {businessInfo.languages.map((language, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Team Members */}
          {teamMembers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tiimimme</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="bg-white rounded-xl shadow-lg p-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>

                    {member.experience && (
                      <p className="text-sm text-gray-600 mb-3">{member.experience}</p>
                    )}

                    {member.specialties && member.specialties.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.specialties.slice(0, 3).map((specialty, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {member.languages && member.languages.length > 0 && (
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Kielet: </span>
                        {member.languages.join(', ')}
                      </div>
                    )}

                    {member.email && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <a
                          href={`mailto:${member.email}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Ota yhteyttä
                        </a>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Values Section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Arvomme</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">Laatu</h3>
                <p className="text-gray-600">Tarjoamme vain parhaita autoja ja palveluita asiakkaillemme.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">Luotettavuus</h3>
                <p className="text-gray-600">Pitkäaikaiset asiakassuhteet perustuvat luottamukseen ja rehellisyyteen.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">Asiakaspalvelu</h3>
                <p className="text-gray-600">Asiakkaiden tyytyväisyys on meille tärkeintä kaikessa toiminnassamme.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}