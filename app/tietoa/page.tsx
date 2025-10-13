'use client'

import { motion } from 'framer-motion'
import { Car, Award, Users, Clock, Target, Heart, Handshake, Shield, Star, TrendingUp, MapPin, Phone, Calendar, CheckCircle2, Building } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '../lib/siteConfig'

export default function TietoaPage() {
  const milestones = [
    { year: '2008', title: 'Perustaminen', description: 'Kroi Auto Center perustettiin Pristinassa' },
    { year: '2012', title: 'Laajennus', description: 'Avasimme uuden, suuremman myyntinäyttelyn' },
    { year: '2015', title: 'ISO-sertifiointi', description: 'Saimme ISO 9001 laatusertifikaatin' },
    { year: '2018', title: '1000 autoa', description: 'Saavutimme 1000 myydyn auton rajapyykin' },
    { year: '2020', title: 'Digitalisointi', description: 'Lanseerasimme verkkopalvelumme' },
    { year: '2024', title: 'Markkinajohtaja', description: 'Olemme alueen luotetuin autoliike' }
  ]

  const teamMembers = [
    { name: 'Behar Kroi', role: 'Toimitusjohtaja', experience: '20+ vuotta' },
    { name: 'Arben Kroi', role: 'Myyntijohtaja', experience: '15+ vuotta' },
    { name: 'Faton Berisha', role: 'Huoltopäällikkö', experience: '18+ vuotta' },
    { name: 'Liridona Hoxha', role: 'Rahoituspäällikkö', experience: '12+ vuotta' }
  ]

  const values = [
    { icon: Heart, title: 'Asiakaslähtöisyys', description: 'Asiakas on aina toimintamme keskipisteessä' },
    { icon: Shield, title: 'Luotettavuus', description: 'Pidämme lupauksemme ja toimimme rehellisesti' },
    { icon: Award, title: 'Laatu', description: 'Tarjoamme vain parasta laatua ja palvelua' },
    { icon: Handshake, title: 'Kumppanuus', description: 'Rakennamme pitkäaikaisia asiakassuhteita' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Metadata */}
      <title>Tietoa Meistä - Kroi Auto Center | Yli 15 Vuoden Kokemus</title>
      <meta name="description" content="Kroi Auto Center on Kosovon luotetuin autoliike. Yli 15 vuoden kokemus, 2500+ myytyä autoa ja 98% asiakastyytyväisyys. Tutustu tarinamme!" />

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
              <Link className="text-blue-300 font-semibold border-b-2 border-blue-300 pb-1" href="/tietoa">Tietoa</Link>
              <Link className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg" href="/yhteystiedot">Ota Yhteyttä</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-indigo-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-indigo-300 font-semibold mb-6">
              <Building className="h-4 w-4 mr-2" />
              PERUSTETTU {siteConfig.business.established}
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Tarina <span className="text-indigo-400">Menestyksestä</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Kroi Auto Center on kasvanut pienestä perheyrityksestä Kosovon johtavaksi autoliikkeeksi. Tarinaamme määrittävät intohimo autoihin, sitoutuminen laatuun ja asiakkaiden luottamus.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              >
                <div className="text-4xl font-bold text-white mb-2">{siteConfig.business.experience}</div>
                <div className="text-blue-200">Kokemusta</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              >
                <div className="text-4xl font-bold text-white mb-2">{siteConfig.business.vehiclesSold}</div>
                <div className="text-blue-200">Myytyä Autoa</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              >
                <div className="text-4xl font-bold text-white mb-2">{siteConfig.business.satisfactionRate}</div>
                <div className="text-blue-200">Tyytyväisyys</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              >
                <div className="text-4xl font-bold text-white mb-2">{siteConfig.business.employeeCount}+</div>
                <div className="text-blue-200">Työntekijää</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Meidän Tarinamme
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Kroi Auto Center perustettiin vuonna {siteConfig.business.established} perheyrityksenä, jonka tavoitteena oli mullistaa autokaupan toimintaa Kosovossa. Alusta asti olemme uskoneet, että autakaupan ei tarvitse olla monimutkaista tai epäluotettavaa.
                </p>
                <p>
                  Vuosien varrella olemme kasvaneet pienestä autoliikkeestä yhdeksi alueen suurimmista ja luotetuimmista toimijoista. Tämä kasvu ei ole ollut sattumaa – se on tulosta jatkuvasta panostuksesta laatuun, asiakaspalveluun ja innovaatioon.
                </p>
                <p>
                  Tänään palvelemme tuhansia tyytyväisiä asiakkaita vuosittain ja olemme ylpeitä siitä, että monet heistä palaavat luoksemme uudestaan ja suosittelevat meitä ystävilleen ja perheenjäsenilleen.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/autot"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Selaa Autoja
                </Link>
                <Link
                  href="/yhteystiedot"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Ota Yhteyttä
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Target className="h-8 w-8 text-blue-600 mb-2" />
                    <h4 className="font-bold text-gray-900">Missio</h4>
                    <p className="text-sm text-gray-600 mt-1">Tarjota luotettavia autoja ja erinomaista palvelua</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                    <h4 className="font-bold text-gray-900">Visio</h4>
                    <p className="text-sm text-gray-600 mt-1">Olla Kosovon luotetuin autoliike</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Users className="h-8 w-8 text-purple-600 mb-2" />
                    <h4 className="font-bold text-gray-900">Tiimi</h4>
                    <p className="text-sm text-gray-600 mt-1">Ammattitaitoinen ja omistautunut henkilökunta</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Star className="h-8 w-8 text-yellow-600 mb-2" />
                    <h4 className="font-bold text-gray-900">Laatu</h4>
                    <p className="text-sm text-gray-600 mt-1">Kompromissitonta laatua kaikessa</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Matka Menestykseen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tärkeimmät virstanpylväät historiassamme
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-blue-600 font-bold text-2xl mb-2">{milestone.year}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{milestone.title}</h3>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Arvomme
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nämä arvot ohjaavat kaikkea toimintaamme
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Johtoryhmä
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kokenut tiimimme varmistaa parhaan palvelun
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.experience} kokemusta</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Haluatko Tietää Lisää?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Tule käymään liikkeessämme tai ota yhteyttä. Kerromme mielellämme lisää toiminnastamme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/yhteystiedot"
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Ota Yhteyttä
            </Link>
            <Link
              href="/autot"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              Selaa Autoja
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}