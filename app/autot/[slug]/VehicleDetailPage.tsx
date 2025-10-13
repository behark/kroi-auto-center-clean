'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft, Car, Phone, Mail, MapPin, Calendar, Fuel, Gauge,
  Settings, Shield, Star, ChevronRight, ChevronLeft, Check,
  BadgeCheck, Award, Clock, Euro, Heart, Share2, Download,
  Wrench, Users, TrendingUp, CircleCheckBig, Calculator,
  FileText, MessageSquare, Play, X, ZoomIn
} from 'lucide-react'
import { Car as CarType } from '../../data/cars'
import { siteConfig } from '../../lib/siteConfig'

interface Props {
  car: CarType
  relatedCars: CarType[]
}

const tabConfig = [
  { id: 'overview', label: 'Yleiskatsaus', iconName: 'car' },
  { id: 'features', label: 'Varusteet', iconName: 'settings' },
  { id: 'specs', label: 'Tekniset tiedot', iconName: 'fileText' },
  { id: 'condition', label: 'Kunto', iconName: 'shield' }
] as const

const getTabIcon = (iconName: string) => {
  switch (iconName) {
    case 'car':
      return <Car className="h-5 w-5" />
    case 'settings':
      return <Settings className="h-5 w-5" />
    case 'fileText':
      return <FileText className="h-5 w-5" />
    case 'shield':
      return <Shield className="h-5 w-5" />
    default:
      return <Car className="h-5 w-5" />
  }
}

export default function VehicleDetailPage({ car, relatedCars }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'specs' | 'condition'>('overview')
  const [showFinanceCalculator, setShowFinanceCalculator] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showTestDriveForm, setShowTestDriveForm] = useState(false)
  const [liked, setLiked] = useState(false)

  // Finance calculator state
  const [downPayment, setDownPayment] = useState(Math.round(car.priceEur * 0.2))
  const [loanTerm, setLoanTerm] = useState(60)
  const [interestRate] = useState(4.9)

  // Related vehicles are passed as prop from server component

  // For demo, we'll use the main image and create a gallery
  const imageGallery = [
    car.image,
    car.image, // In production, these would be different images
    car.image,
    car.image,
    car.image
  ]

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = car.priceEur - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm

    if (principal <= 0) return 0

    const monthlyPayment = principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return Math.round(monthlyPayment)
  }

  const monthlyPayment = calculateMonthlyPayment()

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: `${car.name} ${car.year}`,
        text: car.description,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/autot" className="text-gray-500 hover:text-blue-600 transition-colors">
              Autot
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{car.name} {car.year}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/autot"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Takaisin autoihin
        </Link>

        {/* Vehicle Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {car.category === 'premium' && (
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Premium
                  </span>
                )}
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <CircleCheckBig className="h-4 w-4 mr-1" />
                  Tarkastettu
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  12kk Takuu
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-xl text-gray-600">{car.year} • {car.km} • {car.fuel} • {car.transmission}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-4xl font-bold text-blue-600 mb-2">{car.price}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-2 rounded-lg border transition-all ${
                    liked
                      ? 'bg-red-50 border-red-300 text-red-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="relative h-96 lg:h-[500px] overflow-hidden">
                  <div
                    className="relative w-full h-full cursor-zoom-in"
                    onClick={() => setShowImageModal(true)}
                  >
                    <Image
                      src={imageGallery[currentImageIndex]}
                      alt={`${car.name} - kuva ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>

                  {/* Navigation Arrows */}
                  {imageGallery.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(prev => prev === 0 ? imageGallery.length - 1 : prev - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(prev => prev === imageGallery.length - 1 ? 0 : prev + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-2 p-4 bg-gray-50">
                  {imageGallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 w-20 lg:h-24 lg:w-24 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="border-b">
                <div className="flex space-x-1 p-1">
                  {tabConfig.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getTabIcon(tab.iconName)}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* <AnimatePresence mode="wait"> */}
                  {activeTab === 'overview' && (
                    <div
                      key="overview"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <Car className="h-5 w-5 mr-2 text-blue-600" />
                          Auton esittely
                        </h3>
                        <div className="space-y-3 text-gray-600">
                          {car.detailedDescription.map((paragraph, index) => (
                            <p key={index} className="leading-relaxed">{paragraph}</p>
                          ))}
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                          <div className="flex items-center text-blue-600 mb-2">
                            <TrendingUp className="h-5 w-5 mr-2" />
                            <span className="font-semibold">Taloudellinen</span>
                          </div>
                          <p className="text-sm text-gray-600">Erinomainen polttoainetalous dieselmoottorilla</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                          <div className="flex items-center text-green-600 mb-2">
                            <BadgeCheck className="h-5 w-5 mr-2" />
                            <span className="font-semibold">Huollettu</span>
                          </div>
                          <p className="text-sm text-gray-600">Säännöllisesti huollettu, huoltohistoria tallella</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                          <div className="flex items-center text-purple-600 mb-2">
                            <Shield className="h-5 w-5 mr-2" />
                            <span className="font-semibold">Takuu</span>
                          </div>
                          <p className="text-sm text-gray-600">12 kuukauden kattava takuu sisältyy</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                          <div className="flex items-center text-orange-600 mb-2">
                            <Award className="h-5 w-5 mr-2" />
                            <span className="font-semibold">Premium laatu</span>
                          </div>
                          <p className="text-sm text-gray-600">Tarkastettu ja valmis toimitukseen</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div
                      key="features"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <Settings className="h-5 w-5 mr-2 text-blue-600" />
                          Varusteet ja ominaisuudet
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {car.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                                <Check className="h-4 w-4 text-green-600" />
                              </div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Feature Categories */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-blue-600" />
                            Turvallisuus
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center">
                              <Check className="h-3 w-3 mr-2 text-green-500" />
                              ABS-jarrut
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 mr-2 text-green-500" />
                              Vakautusvalvonta (ESP)
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 mr-2 text-green-500" />
                              Turvatyynyt (6 kpl)
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 mr-2 text-green-500" />
                              Kaistavahti
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-blue-600" />
                            Mukavuus
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center">
                              <Check className="h-3 w-3 mr-2 text-green-500" />
                              Automaattivaihteisto
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 mr-2 text-green-500" />
                              Ilmastointi
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 mr-2 text-green-500" />
                              Lämmitettävät istuimet
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 mr-2 text-green-500" />
                              Cruise control
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div
                      key="specs"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-blue-600" />
                          Tekniset tiedot
                        </h3>
                        <div className="space-y-3">
                          {car.specifications.map((spec, index) => (
                            <div key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                              <span className="text-gray-600">{spec.label}</span>
                              <span className="font-medium text-gray-900">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Technical Info */}
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-4">Lisätiedot</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">CO2-päästöt:</span>
                            <p className="font-medium">120 g/km</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Kulutus (yhdistetty):</span>
                            <p className="font-medium">4.5 l/100km</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Teho:</span>
                            <p className="font-medium">150 hv</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Vääntö:</span>
                            <p className="font-medium">340 Nm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'condition' && (
                    <div
                      key="condition"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-blue-600" />
                          Kunto ja huoltohistoria
                        </h3>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                          <p className="text-green-800 font-medium">{car.condition}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                              <Wrench className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Huoltohistoria</h4>
                              <p className="text-gray-600 text-sm mt-1">
                                Kaikki huollot tehty valtuutetussa huollossa. Huoltokirja ja kuitit tallella.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="bg-green-100 p-2 rounded-lg mr-3">
                              <BadgeCheck className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Katsastus</h4>
                              <p className="text-gray-600 text-sm mt-1">
                                Katsastettu ja valmis toimitukseen. Seuraava katsastus 12 kuukauden päästä.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="bg-purple-100 p-2 rounded-lg mr-3">
                              <Shield className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Takuu</h4>
                              <p className="text-gray-600 text-sm mt-1">
                                12 kuukauden kattava takuu sisältyy kauppaan. Mahdollisuus laajentaa takuuta 36 kuukauteen.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Inspection Checklist */}
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-4">Tarkastuslista</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {[
                            'Moottori tarkastettu',
                            'Vaihteisto tarkastettu',
                            'Jarrut tarkastettu',
                            'Alusta tarkastettu',
                            'Sähköjärjestelmät OK',
                            'Ilmastointi toimii',
                            'Renkaat hyvässä kunnossa',
                            'Sisusta siisti'
                          ].map((item, index) => (
                            <div key={index} className="flex items-center">
                              <CircleCheckBig className="h-4 w-4 mr-2 text-green-500" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                {/* </AnimatePresence> */}
              </div>
            </div>
          </div>

          {/* Right Column - Actions and Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Kiinnostunut?</h3>

              <div className="space-y-3">
                <button
                  onClick={() => setShowTestDriveForm(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                >
                  <Car className="h-5 w-5 mr-2" />
                  Varaa Koeajo
                </button>

                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Kysy Lisätietoja
                </button>

                <button
                  onClick={() => setShowFinanceCalculator(!showFinanceCalculator)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Rahoituslaskin
                </button>

                <a
                  href={`tel:${siteConfig.phone.primary.tel}`}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Soita Meille
                </a>
              </div>

              <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  {siteConfig.address.full}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  Ma-Pe 09:00-18:00
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  {siteConfig.phone.primary.display}
                </div>
              </div>
            </div>

            {/* Finance Calculator (Expandable) */}
            {/* <AnimatePresence> */}
              {showFinanceCalculator && (
                <div
                  className="bg-white rounded-2xl shadow-lg p-6 overflow-hidden"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-green-600" />
                    Rahoituslaskin
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Käsiraha
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max={car.priceEur}
                          step="500"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="flex-1"
                        />
                        <div className="w-24 text-right font-medium">
                          €{downPayment.toLocaleString('fi-FI')}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Laina-aika
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="12"
                          max="84"
                          step="12"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="flex-1"
                        />
                        <div className="w-24 text-right font-medium">
                          {loanTerm} kk
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-600 mb-1">Arvioitu kuukausierä</div>
                      <div className="text-3xl font-bold text-blue-600">
                        €{monthlyPayment.toLocaleString('fi-FI')} / kk
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Korko {interestRate}% • Luottosumma €{(car.priceEur - downPayment).toLocaleString('fi-FI')}
                      </div>
                    </div>

                    <Link
                      href="/rahoitus"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold transition-colors"
                    >
                      Hae Rahoitusta
                    </Link>
                  </div>
                </div>
              )}
            {/* </AnimatePresence> */}

            {/* Why Choose This Car */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Miksi valita tämä auto?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <BadgeCheck className="h-5 w-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Huolellisesti tarkastettu</p>
                    <p className="text-sm text-gray-600">150 kohdan tarkastuslista käyty läpi</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">12kk takuu</p>
                    <p className="text-sm text-gray-600">Kattava takuu sisältyy kauppaan</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 mr-3 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Erinomainen arvo</p>
                    <p className="text-sm text-gray-600">Kilpailukykyinen hinnoittelu</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-3 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Luotettu kumppani</p>
                    <p className="text-sm text-gray-600">Yli 15 vuoden kokemus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Vehicles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Samankaltaisia autoja</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCars.map((relatedCar) => (
              <Link
                key={relatedCar.id}
                href={`/autot/${relatedCar.slug}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={relatedCar.image}
                    alt={relatedCar.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {relatedCar.category === 'premium' && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Premium
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    {relatedCar.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1">{relatedCar.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{relatedCar.year} • {relatedCar.km} • {relatedCar.fuel}</p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                    Näytä lisätiedot
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {/* <AnimatePresence> */}
        {showImageModal && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/20 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
              <div
                className="relative w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={imageGallery[currentImageIndex]}
                  alt={`${car.name} - kuva ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Modal Navigation */}
              {imageGallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex(prev => prev === 0 ? imageGallery.length - 1 : prev - 1)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex(prev => prev === imageGallery.length - 1 ? 0 : prev + 1)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      {/* </AnimatePresence> */}

      {/* Contact Form Modal */}
      {/* <AnimatePresence> */}
        {showContactForm && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowContactForm(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Kysy lisätietoja</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <p className="font-semibold text-gray-900">{car.name} {car.year}</p>
                <p className="text-sm text-gray-600">{car.price} • {car.km}</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nimi *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sähköposti *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Puhelinnumero</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Viesti *</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Kirjoita viestisi tähän..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Lähetä viesti
                </button>
              </form>
            </div>
          </div>
        )}
      {/* </AnimatePresence> */}

      {/* Test Drive Form Modal */}
      {/* <AnimatePresence> */}
        {showTestDriveForm && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowTestDriveForm(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Varaa koeajo</h3>
                <button
                  onClick={() => setShowTestDriveForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <p className="font-semibold text-gray-900">{car.name} {car.year}</p>
                <p className="text-sm text-gray-600">{car.price} • {car.km}</p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Etunimi *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sukunimi *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sähköposti *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Puhelinnumero *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Toivottu päivämäärä *</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Toivottu aika *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Valitse aika</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lisätiedot</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Esim. vaihtoauto, rahoitustarve..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Varaa koeajo
                </button>
              </form>
            </div>
          </div>
        )}
      {/* </AnimatePresence> */}
    </div>
  )
}