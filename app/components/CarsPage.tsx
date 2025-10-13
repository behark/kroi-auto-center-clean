'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Car, Phone, Filter, Search, ChevronDown, Grid3X3, List,
  Calendar, Fuel, Gauge, Settings, Euro, Star, Shield,
  TrendingUp, X, Menu, ArrowRight, CircleCheckBig, Award, BadgeCheck
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '../lib/siteConfig'
import { cars, Car as CarType } from '../data/cars'

// Get unique values for filters
const brands = Array.from(new Set(cars.map(car => car.brand))).sort()
const years = Array.from(new Set(cars.map(car => car.year))).sort().reverse()
const fuels = Array.from(new Set(cars.map(car => car.fuel)))
const transmissions = Array.from(new Set(cars.map(car => car.transmission)))
const categories = Array.from(new Set(cars.map(car => car.category)))

// Price ranges for filtering
const priceRanges = [
  { label: 'Alle €10,000', min: 0, max: 10000 },
  { label: '€10,000 - €15,000', min: 10000, max: 15000 },
  { label: '€15,000 - €20,000', min: 15000, max: 20000 },
  { label: '€20,000 - €30,000', min: 20000, max: 30000 },
  { label: 'Yli €30,000', min: 30000, max: 999999 },
]

// KM ranges for filtering
const kmRanges = [
  { label: 'Alle 100,000 km', min: 0, max: 100000 },
  { label: '100,000 - 200,000 km', min: 100000, max: 200000 },
  { label: '200,000 - 300,000 km', min: 200000, max: 300000 },
  { label: 'Yli 300,000 km', min: 300000, max: 999999 },
]

export default function CarsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('price-asc')

  // Filters state
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [selectedFuel, setSelectedFuel] = useState<string>('')
  const [selectedTransmission, setSelectedTransmission] = useState<string>('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0] | null>(null)
  const [selectedKmRange, setSelectedKmRange] = useState<typeof kmRanges[0] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let filtered = [...cars]

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
    if (selectedBrand) {
      filtered = filtered.filter(car => car.brand === selectedBrand)
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter(car => car.year === selectedYear)
    }

    // Fuel filter
    if (selectedFuel) {
      filtered = filtered.filter(car => car.fuel === selectedFuel)
    }

    // Transmission filter
    if (selectedTransmission) {
      filtered = filtered.filter(car => car.transmission === selectedTransmission)
    }

    // Price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter(car =>
        car.priceEur >= selectedPriceRange.min &&
        car.priceEur <= selectedPriceRange.max
      )
    }

    // KM range filter
    if (selectedKmRange) {
      filtered = filtered.filter(car =>
        car.kmNumber >= selectedKmRange.min &&
        car.kmNumber <= selectedKmRange.max
      )
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(car => car.category === selectedCategory)
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.priceEur - b.priceEur)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.priceEur - a.priceEur)
        break
      case 'year-desc':
        filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year))
        break
      case 'year-asc':
        filtered.sort((a, b) => parseInt(a.year) - parseInt(b.year))
        break
      case 'km-asc':
        filtered.sort((a, b) => a.kmNumber - b.kmNumber)
        break
      case 'km-desc':
        filtered.sort((a, b) => b.kmNumber - a.kmNumber)
        break
    }

    return filtered
  }, [searchQuery, selectedBrand, selectedYear, selectedFuel, selectedTransmission,
      selectedPriceRange, selectedKmRange, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedBrand('')
    setSelectedYear('')
    setSelectedFuel('')
    setSelectedTransmission('')
    setSelectedPriceRange(null)
    setSelectedKmRange(null)
    setSelectedCategory('')
    setSortBy('price-asc')
  }

  const activeFiltersCount = [
    selectedBrand,
    selectedYear,
    selectedFuel,
    selectedTransmission,
    selectedPriceRange,
    selectedKmRange,
    selectedCategory
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl border-b-4 border-blue-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-4">
                <div className="flex items-center bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-lg shadow-lg">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white tracking-wide">{siteConfig.name}</span>
                  <span className="text-xs text-blue-200 font-medium">{siteConfig.subtitle}</span>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link className="text-blue-300 font-semibold px-3 py-2 rounded-md bg-blue-800/30" href="/autot">Autot</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-800/30" href="/palvelut">Palvelut</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-800/30" href="/rahoitus">Rahoitus</Link>
              <Link className="text-white hover:text-blue-300 font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-800/30" href="/tietoa">Tietoa</Link>
              <Link className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" href="/yhteystiedot">Ota Yhteyttä</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-white hover:bg-blue-800/30 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-blue-800">
                <div className="flex items-center space-x-3">
                  <Car className="h-8 w-8 text-blue-400" />
                  <span className="text-xl font-bold text-white">{siteConfig.name}</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white hover:text-blue-300 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 py-6">
                <div className="space-y-4 px-6">
                  <Link className="block py-3 text-lg font-semibold text-blue-300" href="/autot">Autot</Link>
                  <Link className="block py-3 text-lg font-semibold text-white hover:text-blue-300 transition-colors" href="/palvelut">Palvelut</Link>
                  <Link className="block py-3 text-lg font-semibold text-white hover:text-blue-300 transition-colors" href="/rahoitus">Rahoitus</Link>
                  <Link className="block py-3 text-lg font-semibold text-white hover:text-blue-300 transition-colors" href="/tietoa">Tietoa</Link>
                  <Link className="block py-3 text-lg font-semibold text-white hover:text-blue-300 transition-colors" href="/yhteystiedot">Ota Yhteyttä</Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Award className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Laadukkaat Käytetyt Autot</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Autovalikoima</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Selaa laajaa valikoimaamme laadukkaita käytettyjä autoja. Kaikki autot on huolellisesti tarkastettu ja ne sisältävät takuun.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-2xl font-bold">{cars.length}</div>
                <div className="text-sm text-blue-200">Autoa varastossa</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-2xl font-bold">{brands.length}</div>
                <div className="text-sm text-blue-200">Automerkkiä</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-blue-200">Tarkastettu</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-2xl font-bold">12kk</div>
                <div className="text-sm text-blue-200">Takuu</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Controls Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Etsi merkki, malli tai avainsana..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="price-asc">Hinta: Halvin ensin</option>
                <option value="price-desc">Hinta: Kallein ensin</option>
                <option value="year-desc">Vuosi: Uusin ensin</option>
                <option value="year-asc">Vuosi: Vanhin ensin</option>
                <option value="km-asc">Kilometrit: Vähiten ensin</option>
                <option value="km-desc">Kilometrit: Eniten ensin</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                Suodattimet
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-white text-blue-600 px-2 py-0.5 rounded-full text-sm font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-80 flex-shrink-0 hidden lg:block"
              >
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Suodattimet</h3>
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Tyhjennä kaikki
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Brand Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Merkki</label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Kaikki merkit</option>
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    {/* Year Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Vuosimalli</label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Kaikki vuodet</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hintahaarukka</label>
                      <div className="space-y-2">
                        {priceRanges.map((range, index) => (
                          <label key={index} className="flex items-center">
                            <input
                              type="radio"
                              name="priceRange"
                              checked={selectedPriceRange?.label === range.label}
                              onChange={() => setSelectedPriceRange(range)}
                              className="mr-2 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">{range.label}</span>
                          </label>
                        ))}
                        {selectedPriceRange && (
                          <button
                            onClick={() => setSelectedPriceRange(null)}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Poista valinta
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Fuel Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Polttoaine</label>
                      <select
                        value={selectedFuel}
                        onChange={(e) => setSelectedFuel(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Kaikki</option>
                        {fuels.map(fuel => (
                          <option key={fuel} value={fuel}>{fuel}</option>
                        ))}
                      </select>
                    </div>

                    {/* Transmission Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Vaihteisto</label>
                      <select
                        value={selectedTransmission}
                        onChange={(e) => setSelectedTransmission(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Kaikki</option>
                        {transmissions.map(transmission => (
                          <option key={transmission} value={transmission}>{transmission}</option>
                        ))}
                      </select>
                    </div>

                    {/* KM Range Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kilometrit</label>
                      <div className="space-y-2">
                        {kmRanges.map((range, index) => (
                          <label key={index} className="flex items-center">
                            <input
                              type="radio"
                              name="kmRange"
                              checked={selectedKmRange?.label === range.label}
                              onChange={() => setSelectedKmRange(range)}
                              className="mr-2 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">{range.label}</span>
                          </label>
                        ))}
                        {selectedKmRange && (
                          <button
                            onClick={() => setSelectedKmRange(null)}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Poista valinta
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kategoria</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Kaikki kategoriat</option>
                        <option value="premium">Premium</option>
                        <option value="family">Perheauto</option>
                        <option value="suv">SUV</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cars Grid/List */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-4 text-gray-600">
              Näytetään <span className="font-semibold text-gray-900">{filteredCars.length}</span> autoa
            </div>

            {/* Cars Display */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                  >
                    {/* Car Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {car.category === 'premium' && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          Premium
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        {car.price}
                      </div>
                    </div>

                    {/* Car Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{car.year}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{car.description}</p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Gauge className="h-3 w-3 mr-1" />
                          {car.km}
                        </div>
                        <div className="flex items-center">
                          <Fuel className="h-3 w-3 mr-1" />
                          {car.fuel}
                        </div>
                        <div className="flex items-center">
                          <Settings className="h-3 w-3 mr-1" />
                          {car.transmission}
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          12kk Takuu
                        </div>
                      </div>

                      <Link
                        href={`/autot/${car.slug}`}
                        className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-2.5 rounded-lg font-semibold transition-all duration-300 group-hover:shadow-lg text-sm"
                      >
                        Näytä Lisätiedot
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Car Image */}
                      <div className="relative h-48 md:h-auto md:w-80 overflow-hidden">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover"
                        />
                        {car.category === 'premium' && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Premium
                          </div>
                        )}
                      </div>

                      {/* Car Info */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{car.name}</h3>
                            <p className="text-gray-600">{car.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{car.price}</div>
                            <div className="text-sm text-gray-500">{car.year}</div>
                          </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Kilometrit</div>
                            <div className="font-semibold text-gray-900">{car.km}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Polttoaine</div>
                            <div className="font-semibold text-gray-900">{car.fuel}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Vaihteisto</div>
                            <div className="font-semibold text-gray-900">{car.transmission}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Takuu</div>
                            <div className="font-semibold text-gray-900">12 kuukautta</div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {car.features.slice(0, 4).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                          {car.features.length > 4 && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              +{car.features.length - 4} muuta
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Link
                            href={`/autot/${car.slug}`}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-2.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm flex items-center justify-center"
                          >
                            Näytä Lisätiedot
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                          <Link
                            href="/rahoitus"
                            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
                          >
                            Laske Rahoitus
                          </Link>
                          <Link
                            href="/yhteystiedot"
                            className="px-4 py-2.5 border border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors text-sm flex items-center"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Soita
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Ei hakutuloksia</h3>
                <p className="text-gray-500 mb-6">Kokeile muuttaa hakuehtoja tai tyhjennä suodattimet</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tyhjennä suodattimet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Etkö löytänyt sopivaa autoa?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Ota yhteyttä, niin autamme sinua löytämään juuri sinulle sopivan auton laajasta verkostostamme.
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
              href="/rahoitus"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 transition-colors inline-flex items-center justify-center"
            >
              Hae Rahoitusta
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}