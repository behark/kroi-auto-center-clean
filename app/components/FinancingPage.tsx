'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, CreditCard, CheckCircle, Award, Phone, Clock, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '../lib/siteConfig'
import FinancingCalculator from './FinancingCalculator'

export default function FinancingPage() {
  const [activeTab, setActiveTab] = useState('calculator')

  const financingFeatures = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "60 Sekunnin Hyväksyntä",
      description: "Nopea ennakkohyväksyntä ilman paperityötä"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Kilpailukykyiset Korot", 
      description: `Korot alkaen ${siteConfig.features.financing.minRate}`
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Turvallinen Prosessi",
      description: "SSL-suojattu hakemus ja tietoturva"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Joustava Laina-aika",
      description: `Jopa ${siteConfig.features.financing.maxTerm} maksuaikaa`
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container-responsive">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Autorahoitus</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Joustavat rahoitusvaihtoehdot unelmiesi autolle. Korot alkaen {siteConfig.features.financing.minRate}.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {financingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <div className="text-blue-300 mr-3">{feature.icon}</div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{feature.title}</div>
                    <div className="text-xs text-blue-200">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Rahoituslaskin</h2>
                <p className="text-gray-600">
                  Laske kuukausierä ja kokonaiskustannukset helposti.
                </p>
              </div>
              <FinancingCalculator />
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-4">Aloita Hakemuksesi Tänään</h2>
              <p className="text-xl text-blue-100 mb-6">
                Saat ennakkohyväksynnän 60 sekunnissa
              </p>
              <Link href="/yhteystiedot" className="btn-gradient mr-4">
                Aloita Hakemus
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
