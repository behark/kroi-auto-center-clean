'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Car, Search, Filter, ChevronDown, MapPin, Phone, Calendar, Fuel, Settings, Gauge, Euro, Star, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '../lib/siteConfig'
import { cars as allCars } from '../data/cars'

export default function AutotPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedFuel, setSelectedFuel] = useState('all')
  const [selectedTransmission, setSelectedTransmission] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(allCars.map(car => car.brand))]
    return uniqueBrands.sort()
  }, [])

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let filtered = allCars

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(car => car.brand === selectedBrand)
    }

    // Fuel filter
    if (selectedFuel !== 'all') {
      filtered = filtered.filter(car => car.fuel === selectedFuel)
    }

    // Transmission filter
    if (selectedTransmission !== 'all') {
      filtered = filtered.filter(car => car.transmission === selectedTransmission)
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      filtered = filtered.filter(car => {
        if (max) {
          return car.priceEur >= min && car.priceEur <= max
        } else {
          return car.priceEur >= min
        }
      })
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceEur - b.priceEur)
        break
      case 'price-high':
        filtered.sort((a, b) => b.priceEur - a.priceEur)
        break
      case 'year-new':
        filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year))
        break
      case 'year-old':
        filtered.sort((a, b) => parseInt(a.year) - parseInt(b.year))
        break
      case 'km-low':
        filtered.sort((a, b) => a.kmNumber - b.kmNumber)
        break
      case 'km-high':
        filtered.sort((a, b) => b.kmNumber - a.kmNumber)
        break
      default:
        // Featured/default sorting
        break
    }

    return filtered
  }, [searchQuery, selectedBrand, selectedFuel, selectedTransmission, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Metadata */}
      <title>Autot - Laadukkaita Käytettyjä Autoja | Kroi Auto Center</title>
      <meta name="description" content="Selaa laajaa valikoimaamme laadukkaita käytettyjä autoja. BMW, Mercedes-Benz, Audi, Volkswagen ja muita tunnettuja merkkejä. Kilpailukykyiset hinnat ja kattava takuu." />

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
              <Link className="text-blue-300 font-semibold border-b-2 border-blue-300 pb-1" href="/autot">Autot</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/palvelut">Palvelut</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/rahoitus">Rahoitus</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300" href="/tietoa">Tietoa</Link>
              <Link className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg" href="/yhteystiedot">Ota Yhteyttä</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Autovalikoima
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Löydä unelmiesi auto laajasta valikoimastamme. Jokainen auto on huolellisesti tarkastettu ja valmis uuteen kotiin.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">{filteredCars.length}</div>
                <div className="text-blue-200">Autoa valikoimassa</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">{brands.length}</div>
                <div className="text-blue-200">Eri merkkiä</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-blue-200">Tarkastettuja</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">12kk</div>
                <div className="text-blue-200">Takuu</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="bg-white shadow-md sticky top-20 z-30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Etsi merkki, malli tai avainsana..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Suodattimet
              <ChevronDown className={`h-5 w-5 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Desktop Filters */}
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Kaikki merkit</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Polttoaine</option>
              <option value="Diesel">Diesel</option>
              <option value="Bensiini">Bensiini</option>
              <option value="Hybridi">Hybridi</option>
              <option value="Sähkö">Sähkö</option>
            </select>

            <select
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Vaihteisto</option>
              <option value="Automaatti">Automaatti</option>
              <option value="Manuaali">Manuaali</option>
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Hintahaarukka</option>
              <option value="0-10000">0 - 10,000€</option>
              <option value="10000-15000">10,000 - 15,000€</option>
              <option value="15000-20000">15,000 - 20,000€</option>
              <option value="20000-30000">20,000 - 30,000€</option>
              <option value="30000-999999">Yli 30,000€</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="featured">Suositellut</option>
              <option value="price-low">Hinta (halvin ensin)</option>
              <option value="price-high">Hinta (kallein ensin)</option>
              <option value="year-new">Vuosimalli (uusin)</option>
              <option value="year-old">Vuosimalli (vanhin)</option>
              <option value="km-low">Kilometrit (vähiten)</option>
              <option value="km-high">Kilometrit (eniten)</option>
            </select>

            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedBrand('all')
                setSelectedFuel('all')
                setSelectedTransmission('all')
                setPriceRange('all')
                setSortBy('featured')
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Tyhjennä
            </button>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Näytetään <span className="font-semibold text-gray-900">{filteredCars.length}</span> autoa
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                {/* Car Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {car.year}
                    </div>
                    {car.category === 'premium' && (
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    {car.price}
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {car.description}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Gauge className="h-4 w-4 mr-2 text-gray-400" />
                      {car.km}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Fuel className="h-4 w-4 mr-2 text-gray-400" />
                      {car.fuel}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Settings className="h-4 w-4 mr-2 text-gray-400" />
                      {car.transmission}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {car.year}
                    </div>
                  </div>

                  {/* Features badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Takuu 12kk
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      Tarkastettu
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/autot/${car.slug}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                      Näytä Tiedot
                    </Link>
                    <Link
                      href="/yhteystiedot"
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Car className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ei hakutuloksia
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Valitettavasti emme löytäneet autoja hakuehdoillasi. Kokeile muuttaa hakuehtoja tai ota yhteyttä.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedBrand('all')
                  setSelectedFuel('all')
                  setSelectedTransmission('all')
                  setPriceRange('all')
                  setSortBy('featured')
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Tyhjennä Suodattimet
              </button>
              <Link
                href="/yhteystiedot"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Ota Yhteyttä
              </Link>
            </div>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Etkö löytänyt etsimääsi?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Meillä on laaja verkosto ja voimme hankkia juuri sinulle sopivan auton. Ota yhteyttä ja kerro tarpeistasi!
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
                Soita Meille
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900 mb-1">100% Tarkastetut</div>
              <div className="text-sm text-gray-600">Jokainen auto läpikäy perusteellisen tarkastuksen</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Star className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
              <div className="font-bold text-gray-900 mb-1">12kk Takuu</div>
              <div className="text-sm text-gray-600">Kattava takuu kaikille autoille</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Euro className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900 mb-1">Rahoitus</div>
              <div className="text-sm text-gray-600">Joustavat rahoitusvaihtoehdot</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Phone className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900 mb-1">24/7 Tuki</div>
              <div className="text-sm text-gray-600">Olemme aina tavoitettavissa</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}