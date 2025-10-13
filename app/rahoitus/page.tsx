'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, CreditCard, Calculator, Shield, Award, Clock, CheckCircle2, TrendingUp, Euro, Phone, ArrowRight, Percent, Calendar } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '../lib/siteConfig'
import FinancingCalculator from '../components/FinancingCalculator'

export default function RahoitusPage() {
  const [loanAmount, setLoanAmount] = useState(15000)
  const [loanTerm, setLoanTerm] = useState(60)
  const [interestRate] = useState(4.9)

  const monthlyPayment = (loanAmount * (interestRate / 100 / 12)) / (1 - Math.pow(1 + (interestRate / 100 / 12), -loanTerm))
  const totalPayment = monthlyPayment * loanTerm
  const totalInterest = totalPayment - loanAmount

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Metadata */}
      <title>Autorahoitus - Joustavat Rahoitusvaihtoehdot | Kroi Auto Center</title>
      <meta name="description" content="Saat meiltä kilpailukykyisen autorahoituksen korolla alkaen 2.9%. Pikapäätös 60 sekunnissa. Jopa 84 kuukauden maksuaika. Hae ennakkohyväksyntää nyt!" />

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
              <Link className="text-blue-300 font-semibold border-b-2 border-blue-300 pb-1" href="/rahoitus">Rahoitus</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/tietoa">Tietoa</Link>
              <Link className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg" href="/yhteystiedot">Ota Yhteyttä</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-green-300 font-semibold mb-6">
                <Percent className="h-4 w-4 mr-2" />
                ERIKOISTARJOUS: 0% KORKO SAATAVILLA
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Autorahoitus <span className="text-green-400">Helposti</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Saat meiltä joustavan ja edullisen rahoituksen autollesi. Pikapäätös 60 sekunnissa ja kilpailukykyiset korot alkaen {siteConfig.features.financing.minRate}.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <Clock className="h-8 w-8 text-green-400 mb-2" />
                  <div className="font-bold text-lg">60 sek</div>
                  <div className="text-sm text-blue-200">Pikapäätös</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <Percent className="h-8 w-8 text-blue-400 mb-2" />
                  <div className="font-bold text-lg">{siteConfig.features.financing.minRate}</div>
                  <div className="text-sm text-blue-200">Alkaen</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <Calendar className="h-8 w-8 text-yellow-400 mb-2" />
                  <div className="font-bold text-lg">{siteConfig.features.financing.maxTerm}</div>
                  <div className="text-sm text-blue-200">Maksuaika</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <Shield className="h-8 w-8 text-purple-400 mb-2" />
                  <div className="font-bold text-lg">100%</div>
                  <div className="text-sm text-blue-200">Turvallinen</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Laske Kuukausierä
                </button>
                <Link
                  href="/yhteystiedot"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center"
                >
                  Hae Ennakkohyväksyntää
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <CreditCard className="h-8 w-8 text-green-400 mr-3" />
                  Rahoituksen Edut
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Nopea käsittely</div>
                      <div className="text-sm text-blue-200">Saat päätöksen heti verkossa tai 60 sekunnissa puhelimitse</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Joustavat ehdot</div>
                      <div className="text-sm text-blue-200">Maksuaika 12-84 kuukautta, käsiraha alkaen 0%</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Kilpailukykyiset korot</div>
                      <div className="text-sm text-blue-200">Markkinoiden parhaat korot alkaen {siteConfig.features.financing.minRate}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Ei piilokuluja</div>
                      <div className="text-sm text-blue-200">Läpinäkyvä hinnoittelu ilman yllätyksiä</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Rahoituslaskuri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Laske kuukausierä ja kokonaiskustannukset helposti laskurillamme
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Syötä tiedot</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Lainan määrä: <span className="text-blue-600">{loanAmount.toLocaleString('fi-FI')} €</span>
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>5,000 €</span>
                    <span>50,000 €</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Laina-aika: <span className="text-blue-600">{loanTerm} kuukautta</span>
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="6"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>12 kk</span>
                    <span>84 kk</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Korko: <span className="text-blue-600">{interestRate}%</span>
                  </label>
                  <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-sm">
                    Esimerkkilaskelma perustuu {interestRate}% vuosikorkoon. Todellinen korko määräytyy luottopäätöksen yhteydessä.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Calculator Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">Laskelman tulos</h3>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="text-blue-100 mb-2">Kuukausierä</div>
                  <div className="text-4xl font-bold">{monthlyPayment.toFixed(2)} €</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-blue-100 text-sm mb-1">Lainan määrä</div>
                    <div className="text-xl font-bold">{loanAmount.toLocaleString('fi-FI')} €</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-blue-100 text-sm mb-1">Korot yhteensä</div>
                    <div className="text-xl font-bold">{totalInterest.toFixed(0)} €</div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-blue-100 text-sm mb-1">Takaisinmaksu yhteensä</div>
                  <div className="text-2xl font-bold">{totalPayment.toFixed(0)} €</div>
                </div>

                <Link
                  href="/yhteystiedot"
                  className="block w-full bg-white text-blue-600 text-center py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Hae Rahoitusta Nyt
                </Link>

                <p className="text-xs text-blue-200 text-center">
                  * Laskelma on suuntaa-antava. Todellinen korko ja kuukausierä määräytyvät luottopäätöksen yhteydessä.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financing Options */}
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
              Rahoitusvaihtoehdot
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tarjoamme erilaisia rahoitusvaihtoehtoja tarpeisiisi sopien
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Option 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-xl text-sm font-semibold">
                Suosituin
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Normaali Rahoitus</h3>
                <p className="text-gray-600">Perinteinen autorahoitus joustavilla ehdoilla</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Korot alkaen {siteConfig.features.financing.minRate}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Maksuaika 12-84 kk</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Käsiraha alkaen 0%</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Kiinteä kuukausierä</span>
                </li>
              </ul>
              <Link
                href="/yhteystiedot"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Hae Rahoitusta
              </Link>
            </motion.div>

            {/* Option 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Leasing</h3>
                <p className="text-gray-600">Yritysasiakkaille ja yksityishenkilöille</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Edullinen kuukausivuokra</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Ei käsirahaa</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Huoltopalvelut sisältyvät</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Verovähennysoikeus yrityksille</span>
                </li>
              </ul>
              <Link
                href="/yhteystiedot"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Kysy Leasingista
              </Link>
            </motion.div>

            {/* Option 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Vaihtoautorahoitus</h3>
                <p className="text-gray-600">Vaihda vanha uuteen helposti</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Vanha auto käsirahaksi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Ilmainen arviointi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Nopea käsittely</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Paras hintatakuu</span>
                </li>
              </ul>
              <Link
                href="/yhteystiedot"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Arvioi Autosi
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Näin Helppoa Se On
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rahoituksen hakeminen on nopeaa ja vaivatonta
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Valitse Auto',
                description: 'Selaa valikoimaamme ja löydä unelmiesi auto',
                icon: Car
              },
              {
                step: '2',
                title: 'Täytä Hakemus',
                description: 'Täytä rahoitushakemus verkossa tai liikkeessämme',
                icon: CreditCard
              },
              {
                step: '3',
                title: 'Saa Päätös',
                description: 'Rahoituspäätös 60 sekunnissa',
                icon: Clock
              },
              {
                step: '4',
                title: 'Aja Pois',
                description: 'Allekirjoita sopimus ja aja uudella autollasi',
                icon: CheckCircle2
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Valmis Hakemaan Rahoitusta?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Täytä hakemus verkossa tai soita meille. Auttoamme sinua löytämään parhaan rahoitusratkaisun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/yhteystiedot"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Hae Rahoitusta Nyt
            </Link>
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Soita Meille
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}