'use client'

import { motion } from 'framer-motion'
import { Car, Wrench, Shield, CreditCard, Handshake, CheckCircle2, Award, Clock, Users, Settings, FileCheck, Sparkles, Phone, ArrowRight, Star, BadgeCheck } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '../lib/siteConfig'

export default function PalvelutPage() {
  const services = [
    {
      icon: Car,
      title: 'Automyynti',
      description: 'Laaja valikoima laadukkaita käytettyjä autoja',
      features: [
        'Yli 150 autoa varastossa',
        'Kaikki suuret automerkit',
        '100% tarkastetut ajoneuvot',
        'Kilpailukykyiset hinnat',
        'Vaihtoautomahdollisuus'
      ],
      color: 'blue',
      link: '/autot'
    },
    {
      icon: CreditCard,
      title: 'Rahoituspalvelut',
      description: 'Joustavat rahoitusvaihtoehdot kaikkiin tarpeisiin',
      features: [
        'Korot alkaen 2.9%',
        'Pikapäätös 60 sekunnissa',
        'Maksuaika jopa 84 kk',
        'Käsiraha alkaen 0%',
        'Leasing-vaihtoehdot'
      ],
      color: 'green',
      link: '/rahoitus'
    },
    {
      icon: Shield,
      title: 'Takuu & Vakuutus',
      description: 'Kattavat takuut ja vakuutuspalvelut',
      features: [
        '12 kk perus takuu',
        'Laajennettu takuu 36 kk asti',
        'Kattava moottorin takuu',
        'Vakuutusneuvonta',
        'Tiepalveluturva'
      ],
      color: 'purple'
    },
    {
      icon: Wrench,
      title: 'Huolto & Korjaus',
      description: 'Ammattitaitoinen huolto kaikille merkeille',
      features: [
        'Määräaikaishuollot',
        'Ilmastointihuollot',
        'Rengaspalvelut',
        'Katsastuspalvelu',
        'Vikakoodien luku'
      ],
      color: 'orange'
    },
    {
      icon: FileCheck,
      title: 'Tarkastuspalvelut',
      description: 'Perusteellinen kuntotarkastus ennen ostopäätöstä',
      features: [
        '150 kohdan tarkastus',
        'Koeajo asiantuntijan kanssa',
        'Historia tarkastus',
        'Kirjallinen raportti',
        'Ostoneuvonta'
      ],
      color: 'red'
    },
    {
      icon: Handshake,
      title: 'Vaihtoautopalvelu',
      description: 'Vaihda vanha uuteen helposti ja turvallisesti',
      features: [
        'Ilmainen arviointi',
        'Kilpailukykyinen hinta',
        'Nopea käsittely',
        'Käteismaksu heti',
        'Nouto palvelu'
      ],
      color: 'indigo'
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Yhteydenotto',
      description: 'Ota yhteyttä puhelimitse, sähköpostilla tai käy liikkeessämme'
    },
    {
      number: '02',
      title: 'Tarpeiden Kartoitus',
      description: 'Kartoitamme tarpeesi ja löydämme sinulle sopivimman ratkaisun'
    },
    {
      number: '03',
      title: 'Tarjous',
      description: 'Saat selkeän ja läpinäkyvän tarjouksen ilman piilokuluja'
    },
    {
      number: '04',
      title: 'Toteutus',
      description: 'Hoidamme kaiken ammattitaidolla ja sovitussa aikataulussa'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Metadata */}
      <title>Autopalvelut - Kattavat Palvelut Autoilijoille | Kroi Auto Center</title>
      <meta name="description" content="Tarjoamme kattavat autopalvelut: automyynti, rahoitus, takuu, huolto, tarkastus ja vaihtoautopalvelu. Yli 15 vuoden kokemus. Ota yhteyttä!" />

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
              <Link className="text-blue-300 font-semibold border-b-2 border-blue-300 pb-1" href="/palvelut">Palvelut</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/rahoitus">Rahoitus</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/tietoa">Tietoa</Link>
              <Link className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg" href="/yhteystiedot">Ota Yhteyttä</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-purple-300 font-semibold mb-6">
              <Award className="h-4 w-4 mr-2" />
              TÄYDEN PALVELUN AUTOLIIKE
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Kattavat <span className="text-purple-400">Autopalvelut</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Autohankinnasta pitkäaikaiseen huoltoon - tarjoamme kokonaisvaltaiset autopalvelut yli {siteConfig.business.experience} kokemuksella
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">{siteConfig.business.vehiclesSold}</div>
                <div className="text-blue-200 text-sm">Myytyä autoa</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">{siteConfig.business.experience}</div>
                <div className="text-blue-200 text-sm">Kokemusta</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">{siteConfig.business.satisfactionRate}</div>
                <div className="text-blue-200 text-sm">Tyytyväisyys</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-blue-200 text-sm">Asiakastuki</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Palvelumme
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tarjoamme kaikki autoiluun liittyvät palvelut saman katon alta
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="p-8">
                  <div className={`w-14 h-14 bg-gradient-to-br from-${service.color}-500 to-${service.color}-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {service.link && (
                    <Link
                      href={service.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group/link"
                    >
                      Lue lisää
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Näin Toimimme
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Yksinkertainen ja läpinäkyvä prosessi alusta loppuun
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="inline-block mb-4">
                    <div className="text-5xl font-bold text-blue-600/20">{step.number}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Miksi Valita Meidät?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Olemme sitoutuneet tarjoamaan parasta palvelua ja laatua
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Laatutakuu</h3>
              <p className="text-gray-600">Jokainen auto käy läpi perusteellisen tarkastuksen ja saa kattavan takuun</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ammattitaito</h3>
              <p className="text-gray-600">Kokenut henkilökuntamme palvelee sinua ammattitaidolla ja sydämellä</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Turvallisuus</h3>
              <p className="text-gray-600">Kaikki kaupat tehdään turvallisesti ja läpinäkyvästi</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nopea Palvelu</h3>
              <p className="text-gray-600">Saat päätöksen rahoitukseen 60 sekunnissa ja autosi nopeasti</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Yksilöllinen Palvelu</h3>
              <p className="text-gray-600">Räätälöimme palvelun juuri sinun tarpeisiisi sopivaksi</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full mb-4">
                <BadgeCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sertifioitu</h3>
              <p className="text-gray-600">Olemme virallisesti sertifioitu ja luotettava autoliike</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sertifikaatit & Jäsenyydet</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {siteConfig.business.certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white px-6 py-3 rounded-lg shadow-sm flex items-center"
              >
                <Award className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700 font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Miten Voimme Auttaa Sinua?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ota yhteyttä ja kerro tarpeistasi. Löydämme sinulle parhaan ratkaisun!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/yhteystiedot"
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Ota Yhteyttä
            </Link>
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Soita {siteConfig.phone.display}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}