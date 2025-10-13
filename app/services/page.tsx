'use client'

import { motion } from 'framer-motion'
import {
  Car, Phone, Mail, MapPin, Star, Shield, Award, Users,
  TrendingUp, Clock, CreditCard, CheckCircle, ArrowRight,
  Calendar, DollarSign, FileCheck, Wrench, BadgeCheck,
  HandshakeIcon, FileSearch, Settings, ChevronRight,
  AlertCircle, Zap, BarChart3, Headphones, RefreshCw,
  Calculator, FileText, Key, UserCheck, Gauge, Search,
  Sparkles, Timer, PhoneCall, MessageSquare, HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface ServiceCategory {
  title: string
  description: string
  icon: React.ElementType
  features: string[]
  pricing?: string
  timeframe?: string
  highlight?: boolean
}

interface FAQ {
  question: string
  answer: string
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null)

  const serviceCategories: ServiceCategory[] = [
    {
      title: 'Vehicle Sales',
      description: 'Premium selection of certified pre-owned vehicles with comprehensive quality checks',
      icon: Car,
      features: [
        '150+ point inspection on all vehicles',
        'Detailed vehicle history reports',
        'Test drives available',
        'Home delivery option',
        'Virtual showroom tours',
        '7-day return guarantee'
      ],
      timeframe: 'Same-day purchase available',
      highlight: true
    },
    {
      title: 'Financing Solutions',
      description: 'Flexible financing options tailored to your budget with competitive rates',
      icon: CreditCard,
      features: [
        'Rates starting from 2.9% APR',
        'Pre-approval in 60 seconds',
        'No hidden fees',
        'Terms from 12-84 months',
        'Bad credit financing available',
        'Early repayment without penalties'
      ],
      pricing: 'From €199/month',
      timeframe: 'Instant online approval'
    },
    {
      title: 'Trade-In Services',
      description: 'Get the best value for your current vehicle with our transparent evaluation process',
      icon: HandshakeIcon,
      features: [
        'Free online valuation tool',
        'Professional on-site appraisal',
        'Competitive market pricing',
        'Same-day cash offers',
        'We buy any car condition',
        'Handle all paperwork'
      ],
      timeframe: '30-minute evaluation'
    },
    {
      title: 'Warranty Programs',
      description: 'Comprehensive coverage plans that give you peace of mind on the road',
      icon: Shield,
      features: [
        '12-month basic warranty included',
        'Extended warranty up to 5 years',
        'Powertrain coverage',
        'Roadside assistance 24/7',
        'Nationwide service network',
        'Transferable coverage'
      ],
      pricing: 'From €299/year',
      highlight: true
    },
    {
      title: 'Maintenance & Repairs',
      description: 'Expert automotive service by certified technicians using genuine parts',
      icon: Wrench,
      features: [
        'All makes and models serviced',
        'Factory-trained technicians',
        'Genuine OEM parts',
        'Digital service records',
        'Courtesy vehicles available',
        'Express service lane'
      ],
      pricing: 'Oil change from €59',
      timeframe: 'Same-day service'
    },
    {
      title: 'Vehicle Inspections',
      description: 'Thorough pre-purchase and safety inspections for your peace of mind',
      icon: FileCheck,
      features: [
        '200-point comprehensive check',
        'Pre-purchase inspections',
        'Safety certifications',
        'Emissions testing',
        'Digital inspection reports',
        'Mobile inspection service'
      ],
      pricing: 'From €149',
      timeframe: '2-hour turnaround'
    }
  ]

  const additionalServices = [
    {
      icon: FileSearch,
      title: 'Insurance Services',
      description: 'Partner insurance providers with competitive rates'
    },
    {
      icon: Key,
      title: 'Registration Assistance',
      description: 'Complete vehicle registration and transfer services'
    },
    {
      icon: Gauge,
      title: 'Performance Upgrades',
      description: 'Certified performance parts and installation'
    },
    {
      icon: Sparkles,
      title: 'Detailing Services',
      description: 'Professional interior and exterior detailing'
    }
  ]

  const faqs: FAQ[] = [
    {
      question: 'What financing options are available for customers with bad credit?',
      answer: 'We work with multiple lenders to provide financing solutions for all credit situations. Our team specializes in securing approvals even for challenging credit profiles, with rates starting from 5.9% APR for sub-prime customers.'
    },
    {
      question: 'How does your trade-in process work?',
      answer: 'Our trade-in process is simple and transparent. Start with our online valuation tool for an instant estimate, then visit us for a professional appraisal. We provide competitive offers based on current market values and handle all paperwork. The entire process typically takes less than 30 minutes.'
    },
    {
      question: 'What is included in your vehicle warranty?',
      answer: 'All vehicles come with a 12-month comprehensive warranty covering engine, transmission, and major components. Extended warranty options are available up to 5 years, including powertrain coverage, roadside assistance, and rental car reimbursement.'
    },
    {
      question: 'Can I schedule a test drive online?',
      answer: 'Yes! You can schedule test drives online 24/7. Simply select your preferred vehicle and time slot. We also offer home test drives within a 50km radius of our dealership for added convenience.'
    },
    {
      question: 'Do you service vehicles not purchased from your dealership?',
      answer: 'Absolutely! Our service center welcomes all makes and models, regardless of where you purchased your vehicle. We use genuine parts and our technicians are factory-trained to service all major brands.'
    },
    {
      question: 'What documents do I need for financing?',
      answer: 'For financing, you will need: valid ID or passport, proof of income (last 3 pay slips), proof of residence, and bank statements from the last 3 months. Pre-approval can be done online with just basic information.'
    }
  ]

  const testimonials = [
    {
      name: 'Maria Virtanen',
      rating: 5,
      comment: 'The financing process was incredibly smooth. Got approved in minutes and drove home in my dream car the same day!',
      service: 'Financing'
    },
    {
      name: 'Jukka Nieminen',
      rating: 5,
      comment: 'Best trade-in value I have received. They beat three other dealer offers and handled everything professionally.',
      service: 'Trade-In'
    },
    {
      name: 'Anna Korhonen',
      rating: 5,
      comment: 'Their warranty saved me thousands when my transmission needed work. Excellent coverage and service!',
      service: 'Warranty'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl border-b-4 border-blue-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-4">
              <div className="flex items-center bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-lg shadow-lg">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-wide">Kroi Auto Center</span>
                <span className="text-xs text-blue-200 font-medium">Premium Auto Services</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-blue-300 font-medium transition-all duration-300">
                Home
              </Link>
              <Link href="/cars" className="text-white hover:text-blue-300 font-medium transition-all duration-300">
                Vehicles
              </Link>
              <Link href="/services" className="text-blue-300 font-medium">
                Services
              </Link>
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                Get Quote
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Award className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">Certified Excellence in Automotive Services</span>
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Comprehensive
              </span>
              <span className="block mt-2">Automotive Services</span>
            </h1>

            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              From sales to service, financing to maintenance - your complete automotive solution under one roof
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center group"
              >
                Schedule Service
                <Calendar className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center"
              >
                Explore Services
              </button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
          >
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">10,000+</div>
              <div className="text-blue-200 text-sm">Happy Customers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
              <Settings className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-blue-200 text-sm">Expert Technicians</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
              <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-blue-200 text-sm">Support Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
              <Star className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">4.9/5</div>
              <div className="text-blue-200 text-sm">Service Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section id="services-grid" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience excellence with our comprehensive range of automotive services designed to meet all your vehicle needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    category.highlight ? 'ring-2 ring-blue-500 transform scale-105' : ''
                  }`}
                >
                  {category.highlight && (
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-2 text-sm font-semibold">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      {category.pricing && (
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Starting from</div>
                          <div className="text-2xl font-bold text-blue-600">{category.pricing}</div>
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-6">{category.description}</p>

                    <div className="space-y-3 mb-6">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {category.timeframe && (
                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Clock className="h-4 w-4 mr-2" />
                        {category.timeframe}
                      </div>
                    )}

                    <Link
                      href="/contact"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600">
              Complete your automotive experience with our supplementary services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Simple, transparent process for all our services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Contact Us', description: 'Reach out via phone, online, or visit', icon: PhoneCall },
              { step: '02', title: 'Consultation', description: 'Discuss your needs with our experts', icon: MessageSquare },
              { step: '03', title: 'Get Quote', description: 'Receive transparent, competitive pricing', icon: Calculator },
              { step: '04', title: 'Service Delivery', description: 'Experience our premium service quality', icon: BadgeCheck }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full">
                    <ChevronRight className="h-8 w-8 text-blue-300 -ml-4" />
                  </div>
                )}

                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl font-bold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-blue-50 to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Success Stories</h2>
            <p className="text-lg text-gray-600">
              Real experiences from our valued customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-3 text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded">
                    {testimonial.service}
                  </span>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our services
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === faq.question ? null : faq.question)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      activeFAQ === faq.question ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {activeFAQ === faq.question && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 pl-8">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Experience Premium Service?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied customers who trust Kroi Auto Center for all their automotive needs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started Today
              </Link>
              <a
                href="tel:+358XXXXXXXX"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +358 XX XXX XXXX
              </a>
            </div>

            <div className="flex items-center justify-center space-x-8 text-blue-200">
              <div className="flex items-center">
                <Headphones className="h-5 w-5 mr-2" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                <span>Fast Service</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">Mon-Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-lg font-semibold text-blue-600">+358 XX XXX XXXX</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-2">Quick response guaranteed</p>
                <p className="text-lg font-semibold text-blue-600">service@kroiauto.fi</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-2">Walk-ins welcome</p>
                <p className="text-lg font-semibold text-blue-600">Helsinki, Finland</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Car className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">Kroi Auto Center</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner for all automotive needs since 2009
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link href="/cars" className="hover:text-blue-400 transition-colors">Vehicles</Link></li>
                <li><Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/services#sales" className="hover:text-blue-400 transition-colors">Vehicle Sales</Link></li>
                <li><Link href="/services#financing" className="hover:text-blue-400 transition-colors">Financing</Link></li>
                <li><Link href="/services#warranty" className="hover:text-blue-400 transition-colors">Warranty</Link></li>
                <li><Link href="/services#maintenance" className="hover:text-blue-400 transition-colors">Maintenance</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Monday - Friday: 9:00 AM - 7:00 PM</li>
                <li>Saturday: 10:00 AM - 6:00 PM</li>
                <li>Sunday: 11:00 AM - 4:00 PM</li>
                <li className="pt-2">
                  <span className="text-green-400">24/7 Emergency Service</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© 2024 Kroi Auto Center. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}