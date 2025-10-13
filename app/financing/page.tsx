'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Shield,
  CheckCircle,
  TrendingUp,
  Users,
  Star,
  CreditCard,
  FileText,
  Phone,
  Mail,
  Award,
  Lock,
  Clock,
  DollarSign,
  Percent,
  Calendar,
  User,
  Building,
  Euro,
  ArrowRight,
  Info
} from 'lucide-react';
import FinancingCalculator from '../components/FinancingCalculator';

interface PreApprovalForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employmentStatus: string;
  monthlyIncome: string;
  creditScore: string;
  desiredVehiclePrice: string;
  preferredTerms: string;
  agreedToTerms: boolean;
}

export default function FinancingPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPreApproval, setShowPreApproval] = useState(false);
  const [preApprovalForm, setPreApprovalForm] = useState<PreApprovalForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employmentStatus: '',
    monthlyIncome: '',
    creditScore: '',
    desiredVehiclePrice: '',
    preferredTerms: '',
    agreedToTerms: false
  });

  const handlePreApprovalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle pre-approval submission
    console.log('Pre-approval form submitted:', preApprovalForm);
    alert('Thank you! Your pre-approval application has been submitted. We will contact you within 24 hours.');
    setShowPreApproval(false);
  };

  const financingOptions = [
    {
      title: 'Standard Auto Loan',
      rate: '3.9% - 7.5%',
      terms: '24-84 months',
      features: ['Quick approval', 'Competitive rates', 'Flexible terms'],
      recommended: false
    },
    {
      title: 'Premium Financing',
      rate: '2.9% - 5.9%',
      terms: '36-72 months',
      features: ['Lowest rates', 'Premium service', 'Extended warranty options'],
      recommended: true
    },
    {
      title: 'Bad Credit Solutions',
      rate: '8.9% - 15.9%',
      terms: '36-60 months',
      features: ['Credit rebuilding', 'Second chance approval', 'Flexible requirements'],
      recommended: false
    }
  ];

  const lendingPartners = [
    { name: 'European Banking Corp', logo: '🏦', rating: 4.8 },
    { name: 'Auto Finance Plus', logo: '🚗', rating: 4.9 },
    { name: 'Credit Union Alliance', logo: '🤝', rating: 4.7 },
    { name: 'Premium Car Loans', logo: '⭐', rating: 4.8 }
  ];

  const customerTestimonials = [
    {
      name: 'Maria Rodriguez',
      location: 'Madrid, Spain',
      rating: 5,
      text: 'Amazing financing experience! Got approved in 30 minutes with a great rate. The team was professional and transparent throughout.',
      vehiclePurchased: '2020 BMW 3 Series'
    },
    {
      name: 'Klaus Weber',
      location: 'Munich, Germany',
      rating: 5,
      text: 'Even with less-than-perfect credit, they found me a solution. Now driving my dream car with affordable payments.',
      vehiclePurchased: '2019 Audi A4'
    },
    {
      name: 'Sophie Dubois',
      location: 'Lyon, France',
      rating: 5,
      text: 'The financing calculator was spot-on, and the actual terms were even better. Highly recommend their services!',
      vehiclePurchased: '2021 Mercedes C-Class'
    }
  ];

  const financingProcess = [
    {
      step: 1,
      title: 'Calculate & Explore',
      description: 'Use our calculator to estimate payments and explore financing options',
      icon: Calculator,
      duration: '5 minutes'
    },
    {
      step: 2,
      title: 'Get Pre-Approved',
      description: 'Submit your application for quick pre-approval decision',
      icon: FileText,
      duration: '15 minutes'
    },
    {
      step: 3,
      title: 'Choose Your Vehicle',
      description: 'Browse our inventory with your approved budget in mind',
      icon: CreditCard,
      duration: 'As needed'
    },
    {
      step: 4,
      title: 'Finalize & Drive',
      description: 'Complete paperwork, sign documents, and drive home today',
      icon: CheckCircle,
      duration: '30 minutes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premium Auto <span className="text-blue-300">Financing</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Secure, competitive financing solutions with rates as low as 2.9% APR.
              Get pre-approved in minutes and drive your dream car today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                onClick={() => setShowPreApproval(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="h-6 w-6" />
                <span>Get Pre-Approved</span>
              </motion.button>

              <motion.button
                onClick={() => setActiveTab('calculator')}
                className="bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calculator className="h-6 w-6" />
                <span>Calculate Payment</span>
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <span>A+ BBB Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>10,000+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <span>30-Minute Approval</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'calculator', label: 'Calculator', icon: Calculator },
              { id: 'options', label: 'Financing Options', icon: CreditCard },
              { id: 'process', label: 'How It Works', icon: FileText },
              { id: 'testimonials', label: 'Reviews', icon: Star }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Current Rates */}
            <section className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Current Interest Rates & Terms
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {financingOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                      option.recommended
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    {option.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{option.rate}</div>
                    <div className="text-gray-600 mb-4">{option.terms}</div>

                    <ul className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Credit Requirements */}
            <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Credit Requirements & Guidelines
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="h-6 w-6 text-gold-500 mr-2" />
                    Excellent Credit (750+)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Rates as low as 2.9% APR</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Up to 84-month terms</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>$0 down payment options</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Instant approval available</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="h-6 w-6 text-blue-500 mr-2" />
                    Good Credit (650-749)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Rates from 4.9% APR</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Flexible terms available</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Low down payment options</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Quick approval process</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Users className="h-6 w-6 text-yellow-500 mr-2" />
                    Fair Credit (550-649)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Competitive rates available</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Credit building programs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Flexible requirements</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Personal review process</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-6 w-6 text-red-500 mr-2" />
                    Bad Credit (Below 550)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Second chance financing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Credit rebuilding focus</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Alternative approval methods</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Personal consultation included</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Lending Partners */}
            <section className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Our Trusted Lending Partners
              </h2>

              <div className="grid md:grid-cols-4 gap-6">
                {lendingPartners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-4xl mb-3">{partner.logo}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{partner.name}</h3>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(partner.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{partner.rating}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Auto Loan Calculator
            </h2>

            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-4">
                Calculate your monthly payments and see how different factors affect your loan.
              </p>
              <p className="text-sm text-gray-500">
                The floating calculator on the left provides real-time calculations as you browse.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Quick Tips for Better Rates:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">Higher down payment = lower monthly payments</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">Shorter terms = less total interest paid</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-purple-600 mt-0.5" />
                    <span className="text-gray-700">Good credit = significantly better rates</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CreditCard className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <span className="text-gray-700">Trade-in value reduces amount financed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Apply?</h3>
                <p className="text-gray-600 mb-6">
                  Get pre-approved and shop with confidence. Our pre-approval process is quick,
                  secure, and won't affect your credit score.
                </p>
                <button
                  onClick={() => setShowPreApproval(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <FileText className="h-5 w-5" />
                  <span>Start Pre-Approval</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Financing Options Tab */}
        {activeTab === 'options' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Compare Financing Options
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900">Standard Loan</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-blue-50">Premium Financing</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900">Bad Credit Solution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-900">Interest Rate</td>
                      <td className="py-4 px-6 text-center">3.9% - 7.5%</td>
                      <td className="py-4 px-6 text-center bg-blue-50 font-semibold text-blue-600">2.9% - 5.9%</td>
                      <td className="py-4 px-6 text-center">8.9% - 15.9%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-900">Loan Terms</td>
                      <td className="py-4 px-6 text-center">24-84 months</td>
                      <td className="py-4 px-6 text-center bg-blue-50">36-72 months</td>
                      <td className="py-4 px-6 text-center">36-60 months</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-900">Down Payment</td>
                      <td className="py-4 px-6 text-center">10% minimum</td>
                      <td className="py-4 px-6 text-center bg-blue-50">$0 down available</td>
                      <td className="py-4 px-6 text-center">15% minimum</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-900">Credit Score Required</td>
                      <td className="py-4 px-6 text-center">620+</td>
                      <td className="py-4 px-6 text-center bg-blue-50">720+</td>
                      <td className="py-4 px-6 text-center">No minimum</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-900">Approval Time</td>
                      <td className="py-4 px-6 text-center">24 hours</td>
                      <td className="py-4 px-6 text-center bg-blue-50">Instant</td>
                      <td className="py-4 px-6 text-center">2-3 days</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-900">Special Features</td>
                      <td className="py-4 px-6 text-center">Standard terms</td>
                      <td className="py-4 px-6 text-center bg-blue-50">Gap insurance, Extended warranty</td>
                      <td className="py-4 px-6 text-center">Credit rebuilding</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Simple 4-Step Financing Process
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {financingProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="text-center relative"
                  >
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 -mt-12 relative z-10 font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <span className="inline-flex items-center text-sm text-blue-600 font-medium">
                      <Clock className="h-4 w-4 mr-1" />
                      {step.duration}
                    </span>

                    {index < financingProcess.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-6 w-6 text-gray-400" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Documents You'll Need
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 text-blue-600 mr-2" />
                    Personal Information
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Valid driver's license</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Proof of insurance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Social security number</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Proof of residence</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="h-5 w-5 text-green-600 mr-2" />
                    Financial Information
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Recent pay stubs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Bank statements</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Employment verification</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Tax returns (if self-employed)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                What Our Customers Say
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {customerTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 relative"
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                      <div className="text-sm text-blue-600 font-medium mt-1">
                        Purchased: {testimonial.vehiclePurchased}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Financial Advisor Contact */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Need Expert Advice?</h2>
                <p className="text-blue-100 text-lg">
                  Speak with our certified financial advisors for personalized guidance
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-blue-100 mb-4">Speak with an expert now</p>
                  <a
                    href="tel:+34-900-123-456"
                    className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>+34 900 123 456</span>
                  </a>
                </div>

                <div className="text-center">
                  <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-blue-100 mb-4">Get a detailed response</p>
                  <a
                    href="mailto:financing@kroiauto.com"
                    className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span>financing@kroiauto.com</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Pre-Approval Modal */}
      {showPreApproval && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowPreApproval(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Lock className="h-6 w-6 text-green-600 mr-2" />
                Secure Pre-Approval Application
              </h2>
              <button
                onClick={() => setShowPreApproval(false)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                ✕
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  Your information is secure and protected with 256-bit SSL encryption
                </span>
              </div>
            </div>

            <form onSubmit={handlePreApprovalSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={preApprovalForm.firstName}
                    onChange={(e) => setPreApprovalForm({...preApprovalForm, firstName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={preApprovalForm.lastName}
                    onChange={(e) => setPreApprovalForm({...preApprovalForm, lastName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={preApprovalForm.email}
                    onChange={(e) => setPreApprovalForm({...preApprovalForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={preApprovalForm.phone}
                    onChange={(e) => setPreApprovalForm({...preApprovalForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Status *
                  </label>
                  <select
                    required
                    value={preApprovalForm.employmentStatus}
                    onChange={(e) => setPreApprovalForm({...preApprovalForm, employmentStatus: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select employment status</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="retired">Retired</option>
                    <option value="student">Student</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income *
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      required
                      value={preApprovalForm.monthlyIncome}
                      onChange={(e) => setPreApprovalForm({...preApprovalForm, monthlyIncome: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Monthly income"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Score Range
                  </label>
                  <select
                    value={preApprovalForm.creditScore}
                    onChange={(e) => setPreApprovalForm({...preApprovalForm, creditScore: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select credit score range</option>
                    <option value="750+">Excellent (750+)</option>
                    <option value="650-749">Good (650-749)</option>
                    <option value="550-649">Fair (550-649)</option>
                    <option value="below-550">Poor (Below 550)</option>
                    <option value="unknown">I don't know</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Vehicle Price *
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      required
                      value={preApprovalForm.desiredVehiclePrice}
                      onChange={(e) => setPreApprovalForm({...preApprovalForm, desiredVehiclePrice: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Desired vehicle price"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Loan Terms
                </label>
                <select
                  value={preApprovalForm.preferredTerms}
                  onChange={(e) => setPreApprovalForm({...preApprovalForm, preferredTerms: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select preferred terms</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                  <option value="60">60 months</option>
                  <option value="72">72 months</option>
                  <option value="84">84 months</option>
                </select>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={preApprovalForm.agreedToTerms}
                  onChange={(e) => setPreApprovalForm({...preApprovalForm, agreedToTerms: e.target.checked})}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the terms and conditions and authorize Kroi Auto Center to perform a credit check.
                  This pre-approval application will not affect my credit score. *
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">What happens next?</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Instant preliminary review of your application</li>
                      <li>• Soft credit check (won't affect your score)</li>
                      <li>• Pre-approval decision within 30 minutes</li>
                      <li>• Shop with confidence knowing your budget</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Shield className="h-6 w-6" />
                <span>Submit Secure Application</span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}