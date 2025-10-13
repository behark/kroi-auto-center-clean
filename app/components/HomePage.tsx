'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { Car, Phone, Award, Shield, Star, CircleCheckBig, CreditCard, TrendingUp, Clock, Menu, X, ArrowRight, Calendar, BadgeCheck, Handshake, DollarSign, Loader2, Eye, Heart, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '../lib/siteConfig'
import { cars } from '../data/cars'

// Loading skeleton component
const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-5 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  </div>
)

// Enhanced car card with loading states
const CarCard = ({ car, index, isLoading }: { car: any, index: number, isLoading: boolean }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  if (isLoading) return <SkeletonCard />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
      whileHover={{ scale: 1.02 }}
    >
      {/* Car Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
        <Image
          src={car.image}
          alt={car.name}
          fill
          className={`object-cover group-hover:scale-110 transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Enhanced overlays */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {car.year}
        </div>
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {car.price}
        </div>

        {/* Like button */}
        <motion.button
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`} />
        </motion.button>

        {/* Quick view button */}
        <motion.div
          className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -20 }}
          whileHover={{ x: 0 }}
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1 shadow-lg">
            <Eye className="h-4 w-4" />
            <span>Pikatarkastelu</span>
          </button>
        </motion.div>
      </div>

      {/* Car Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {car.name}
          </h3>
          <motion.span
            className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {car.fuel}
          </motion.span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{car.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>{car.km}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>{car.transmission}</span>
          </div>
        </div>

        <Link
          href={`/autot/${car.slug}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-xl transform group-hover:scale-105 active:scale-95"
        >
          <motion.span
            className="flex items-center justify-center"
            whileHover={{ x: 2 }}
          >
            Näytä Lisätiedot
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [carsLoading, setCarsLoading] = useState(true)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95])
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98])

  // Get featured cars (first 6)
  const featuredCars = cars.slice(0, 6)

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setCarsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Enhanced Header */}
      <motion.header
        className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl border-b-4 border-blue-500 sticky top-0 z-50 backdrop-blur-sm"
        style={{ opacity: headerOpacity, scale: headerScale }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Section - Enhanced */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex items-center bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-6 w-6 sm:h-8 sm:w-8">
                  <Image
                    src={siteConfig.logoPath}
                    alt={siteConfig.logoAlt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-wide">{siteConfig.name}</span>
                <span className="hidden sm:block text-xs text-blue-200 font-medium">{siteConfig.subtitle}</span>
              </div>
            </motion.div>

            {/* Contact Info - Desktop Enhanced */}
            <motion.div
              className="hidden lg:flex items-center space-x-6 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <Phone className="h-4 w-4 text-blue-300" />
                <span className="text-sm font-medium">{siteConfig.phone.primary.display}</span>
              </motion.div>
              <div className="h-6 w-px bg-blue-300/50"></div>
            </motion.div>

            {/* Enhanced Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {[
                { href: "/autot", label: "Autot" },
                { href: "/palvelut", label: "Palvelut" },
                { href: "/rahoitus", label: "Rahoitus" },
                { href: "/tietoa", label: "Tietoa" }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    className="relative text-white hover:text-blue-300 font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-800/30 group"
                    href={link.href}
                  >
                    {link.label}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ml-4"
                  href="/yhteystiedot"
                >
                  Ota Yhteyttä
                </Link>
              </motion.div>
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg text-white hover:bg-blue-800/30 transition-all duration-200 relative"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Avaa mobiilimenu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence>
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-slate-900/95 backdrop-blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                className="relative h-full bg-gradient-to-b from-slate-900 to-blue-900 border-r border-blue-800/50"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: "min(85vw, 320px)" }}
              >
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center p-6 border-b border-blue-800/30 bg-white/5 backdrop-blur-sm">
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                      <div className="relative h-6 w-6">
                        <Image
                          src={siteConfig.logoPath}
                          alt={siteConfig.logoAlt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-lg font-bold text-white">{siteConfig.name}</span>
                      <div className="text-xs text-blue-200">{siteConfig.subtitle}</div>
                    </div>
                  </motion.div>

                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-800/30"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-8">
                  <div className="space-y-2 px-6">
                    {[
                      { href: "/autot", label: "Autot", icon: Car },
                      { href: "/palvelut", label: "Palvelut", icon: Award },
                      { href: "/rahoitus", label: "Rahoitus", icon: CreditCard },
                      { href: "/tietoa", label: "Tietoa", icon: Shield },
                      { href: "/yhteystiedot", label: "Ota Yhteyttä", icon: Phone }
                    ].map((link, index) => {
                      const IconComponent = link.icon
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.1 }}
                        >
                          <Link
                            className="flex items-center space-x-4 py-4 px-4 text-lg font-semibold text-white hover:text-blue-300 hover:bg-blue-800/20 rounded-xl transition-all duration-300 group"
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <IconComponent className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                            <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                            <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <motion.div
                  className="p-6 border-t border-blue-800/30 bg-white/5 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-center">
                    <div className="text-blue-200 text-sm mb-2">Ota yhteyttä</div>
                    <a
                      href={`tel:${siteConfig.phone.primary.tel}`}
                      className="text-white font-semibold text-lg hover:text-blue-300 transition-colors"
                    >
                      {siteConfig.phone.primary.display}
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-4 mb-6"
              >
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
                  <Award className="h-4 w-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium">Sertifioitu Jälleenmyyjä</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
                  <Shield className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-sm font-medium">Laatutakuu</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
                  <Star className="h-4 w-4 text-yellow-400 mr-2 fill-current" />
                  <span className="text-sm font-medium">{siteConfig.business.satisfactionRate} Tyytyväisyys</span>
                </div>
              </motion.div>

              {/* Hero Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white">Kroi</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Auto Center</span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 max-w-xl leading-relaxed">
                  Luotettavin autoliike Kosovossa yli <span className="font-bold text-white">{siteConfig.business.experience}</span> kokemuksella
                </p>
              </motion.div>

              {/* Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  <CreditCard className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Rahoitus</div>
                    <div className="text-sm text-blue-200">Saatavilla</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  <Shield className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Takuu</div>
                    <div className="text-sm text-blue-200">Sisältyy</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  <TrendingUp className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Vaihtoautot</div>
                    <div className="text-sm text-blue-200">Hyväksytään</div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center group" href="/autot">
                  Selaa Valikoimaa
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center" href="/rahoitus">
                  Hae Ennakkohyväksyntää
                </Link>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-4 pt-4"
              >
                <div className="flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>Soita nyt: {siteConfig.phone.primary.display}</span>
                </div>
                <Link className="text-blue-200 hover:text-white font-medium flex items-center group" href="/yhteystiedot">
                  <Calendar className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Varaa Koeajo
                </Link>
              </motion.div>
            </div>

            {/* Stats & Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pl-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
                  <div className="text-3xl font-bold text-white mb-2">{siteConfig.business.vehiclesSold}</div>
                  <div className="text-blue-200 font-medium">Myytyä Autoa</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
                  <div className="text-3xl font-bold text-white mb-2">{siteConfig.business.experience.replace(' vuotta', '+')}</div>
                  <div className="text-blue-200 font-medium">Vuotta Kokemusta</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
                  <div className="text-3xl font-bold text-white mb-2">{siteConfig.business.satisfactionRate}</div>
                  <div className="text-blue-200 font-medium">Tyytyväisyysaste</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
                  <div className="text-3xl font-bold text-white mb-2">{siteConfig.features.support.availability}</div>
                  <div className="text-blue-200 font-medium">Asiakastuki</div>
                </div>
              </div>

              {/* Premium Services */}
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <CircleCheckBig className="h-6 w-6 text-green-400 mr-2" />
                  Premium-palvelut Sisältyvät
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-blue-100">
                    <CircleCheckBig className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                    <span>Monivaiheinen tarkastus jokaiselle autolle</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <CircleCheckBig className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                    <span>Kattava takuuturva</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <CircleCheckBig className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                    <span>Rahoitusvaihtoehdot {siteConfig.features.financing.minRate} alkaen</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <CircleCheckBig className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                    <span>Ilmainen autohistoriaraportti</span>
                  </div>
                </div>
              </div>

              {/* Special Offer */}
              <div className="mt-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-yellow-300 font-bold text-sm uppercase tracking-wide">Rajoitettu Aika</div>
                    <div className="text-white font-semibold">0% Rahoitus Saatavilla</div>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Featured Cars Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%)', backgroundSize: '30px 30px'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="h-4 w-4 mr-2" />
              SUOSITUT AJONEUVOT
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Valikoidut Laatuautot</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Löydä täydellinen auto laadukkaasta valikoimastamme. Jokainen auto on huolellisesti tarkastettu ja valmis uuteen kotiin.
            </p>
          </motion.div>

          {/* Enhanced Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {carsLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            ) : (
              // Actual car cards
              featuredCars.map((car, index) => (
                <CarCard
                  key={car.id}
                  car={car}
                  index={index}
                  isLoading={false}
                />
              ))
            )}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/autot"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
            >
              Näytä Kaikki Autot
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%)', backgroundSize: '30px 30px'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="h-4 w-4 mr-2" />
              KATTAVAT AUTOPALVELUT
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Täyden Palvelun Autoliike</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Autohankinnasta pitkäaikaiseen huoltoon - tarjoamme kokonaisvaltaiset autopalvelut alan johtavilla takuilla ja ammattitaidolla
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Vehicle Sales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Car className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Automyynti</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Laaja valikoima laadukkaita uusia ja sertifioituja käytettyjä autoja läpinäkyvällä hinnoittelulla</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">150+ autoa varastossa</span>
                  </li>
                  <li className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Kaikki suuret merkit saatavilla</span>
                  </li>
                  <li className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Hintatakuu</span>
                  </li>
                </ul>
                <Link className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 group-hover:shadow-lg" href="/autot">
                  Selaa Valikoimaa
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <BadgeCheck className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-medium">100% Tarkastetut Ajoneuvot</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Financing & Leasing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200"
            >
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <CreditCard className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Rahoitus & Leasing</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Joustavat rahoitusratkaisut kilpailukykyisillä koroilla ja pikahyväksynnällä</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Korot {siteConfig.features.financing.minRate} alkaen</span>
                  </li>
                  <li className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">60 sekunnin ennakkohyväksyntä</span>
                  </li>
                  <li className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Joustavat maksuajat</span>
                  </li>
                </ul>
                <Link className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 group-hover:shadow-lg" href="/rahoitus">
                  Hae Ennakkohyväksyntää
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium">Turvallinen Hakuprosessi</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trade-in & Appraisal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200"
            >
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Handshake className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Vaihto & Arviointi</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Saa parhaan markkinahinnan nykyisestä autostasi pikaarviointityökalullamme</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Pikaarviointi verkossa</span>
                  </li>
                  <li className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Paras hintatakuu</span>
                  </li>
                  <li className="flex items-start">
                    <CircleCheckBig className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Saman päivän maksu</span>
                  </li>
                </ul>
                <Link className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 group-hover:shadow-lg" href="/vaihto">
                  Arvioi Autosi
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="font-medium">Markkinahinnan Yläpuolella</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-lg">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{siteConfig.name}</h3>
                  <p className="text-blue-200 text-sm">{siteConfig.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {siteConfig.description}
              </p>
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Perustettu {siteConfig.business.established}
                </div>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {siteConfig.business.experience}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Yhteystiedot</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{siteConfig.phone.primary.display}</p>
                    <p className="text-sm text-gray-400">Ma-Pe 9:00-18:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <BadgeCheck className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{siteConfig.address.full}</p>
                    <p className="text-sm text-gray-400">Autoliikkeemme</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Aukioloajat</h3>
              <div className="space-y-3">
                {siteConfig.hours.map((hour, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700/30">
                    <span className="text-gray-300">{hour.label}</span>
                    <span className="font-medium">{hour.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Pikalinkit</h3>
              <div className="space-y-3">
                <Link href="/autot" className="block text-gray-300 hover:text-white transition-colors py-1">
                  Autovalikoima
                </Link>
                <Link href="/rahoitus" className="block text-gray-300 hover:text-white transition-colors py-1">
                  Rahoituspalvelut
                </Link>
                <Link href="/palvelut" className="block text-gray-300 hover:text-white transition-colors py-1">
                  Huoltopalvelut
                </Link>
                <Link href="/yhteystiedot" className="block text-gray-300 hover:text-white transition-colors py-1">
                  Ota Yhteyttä
                </Link>
              </div>

              <div className="pt-4 border-t border-gray-700/30">
                <h4 className="text-sm font-semibold mb-3">Sertifioinnit</h4>
                <div className="space-y-2">
                  {siteConfig.business.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <BadgeCheck className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-400">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 {siteConfig.name}. Kaikki oikeudet pidätetään.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <Link href="/tietosuoja" className="text-gray-400 hover:text-white transition-colors">
                  Tietosuoja
                </Link>
                <Link href="/kayttoehdot" className="text-gray-400 hover:text-white transition-colors">
                  Käyttöehdot
                </Link>
                <div className="text-gray-500">
                  Y-tunnus: {siteConfig.legal.businessId}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}