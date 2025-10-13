'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  X,
  ChevronUp,
  Send,
  Car,
  Calculator,
  MessageCircle
} from 'lucide-react';

// Configuration for Kroi Auto Center
const siteConfig = {
  name: 'Kroi Auto Center',
  phone: {
    primary: {
      display: '+358 41 318 8214',
      tel: '+358413188214',
    },
    secondary: {
      display: '+358 44 242 3508',
      tel: '+358442423508',
    }
  },
  whatsapp: '+358413188214',
  email: 'kroiautocenter@gmail.com',
  address: {
    street: 'Läkkisepäntie 15 B 3',
    city: 'Helsinki',
    postalCode: '00620',
    country: 'Finland',
    mapsQuery: 'Läkkisepäntie 15 B 3, 00620 Helsinki, Finland',
  },
  hours: {
    weekdays: '10:00 - 18:00',
    saturday: '11:00 - 17:00',
    sunday: 'Suljettu'
  },
  features: {
    vehicles: '100+',
    years: '14+',
    rating: '4.8',
    customers: '3000+'
  }
};

interface ContactMethod {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  action: () => void;
  bgColor: string;
  hoverColor: string;
  textColor: string;
}

export default function FloatingContactWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [timeUntilChange, setTimeUntilChange] = useState('');

  // Check business hours
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

      let isOpen = false;
      let nextChange = '';

      if (currentDay === 0) {
        // Sunday - Closed
        isOpen = false;
        nextChange = 'Aukeaa maanantaina klo 10:00';
      } else if (currentDay === 6) {
        // Saturday
        if (currentHour >= 11 && currentHour < 17) {
          isOpen = true;
          nextChange = `Sulkeutuu klo 17:00`;
        } else {
          isOpen = false;
          nextChange = currentHour < 11 ? 'Aukeaa klo 11:00' : 'Aukeaa maanantaina klo 10:00';
        }
      } else {
        // Monday - Friday
        if (currentHour >= 10 && currentHour < 18) {
          isOpen = true;
          nextChange = `Sulkeutuu klo 18:00`;
        } else {
          isOpen = false;
          nextChange = currentHour < 10 ? 'Aukeaa klo 10:00' : 'Aukeaa huomenna klo 10:00';
        }
      }

      setIsBusinessOpen(isOpen);
      setTimeUntilChange(nextChange);
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const contactMethods: ContactMethod[] = [
    {
      id: 'vehicles',
      icon: Car,
      label: 'Selaa Autoja',
      action: () => {
        window.location.href = '/autot';
      },
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      action: () => {
        const message = 'Hei! Olen kiinnostunut autoistanne ja haluaisin lisätietoja.';
        window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
      },
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Soita Meille',
      action: () => {
        window.open(`tel:${siteConfig.phone.primary.tel}`, '_self');
      },
      bgColor: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
      textColor: 'text-white'
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Lähetä Sähköposti',
      action: () => {
        const subject = 'Autokysely - Kroi Auto Center';
        const body = 'Hei,\n\nOlen kiinnostunut autoistanne ja haluaisin lisätietoja.\n\nKiitos!';
        window.open(`mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
      },
      bgColor: 'bg-gray-600',
      hoverColor: 'hover:bg-gray-700',
      textColor: 'text-white'
    },
    {
      id: 'location',
      icon: MapPin,
      label: 'Käy Myymälässä',
      action: () => {
        const address = encodeURIComponent(siteConfig.address.mapsQuery);
        window.open(`https://maps.google.com/maps?q=${address}`, '_blank');
      },
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      textColor: 'text-white'
    }
  ];

  const primaryContact = contactMethods[0]; // Browse Vehicles as primary

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 w-72"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Car className="text-white w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{siteConfig.name}</h3>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${isBusinessOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-xs ${isBusinessOpen ? 'text-green-600' : 'text-red-600'}`}>
                      {isBusinessOpen ? 'Avoinna nyt' : 'Suljettu'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Business Hours Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Aukioloajat</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Ma - Pe:</span>
                  <span className="font-medium">{siteConfig.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lauantai:</span>
                  <span className="font-medium">{siteConfig.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunnuntai:</span>
                  <span className="font-medium">{siteConfig.hours.sunday}</span>
                </div>
              </div>
              {timeUntilChange && (
                <div className="mt-2 text-xs text-blue-600 font-medium">
                  {timeUntilChange}
                </div>
              )}
            </div>

            {/* Contact Methods */}
            <div className="space-y-2">
              {contactMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => {
                      method.action();
                      setIsExpanded(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${method.bgColor} ${method.hoverColor} ${method.textColor} hover:scale-105 active:scale-95`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{method.label}</span>
                    <Send className="w-4 h-4 ml-auto" />
                  </button>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{siteConfig.features.vehicles}</div>
                  <div className="text-xs text-gray-600">Autoja Saatavilla</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{siteConfig.features.years}</div>
                  <div className="text-xs text-gray-600">Vuoden Kokemus</div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-bold text-blue-600">⭐ {siteConfig.features.rating}/5.0</div>
                <div className="text-xs text-gray-600">{siteConfig.features.customers} Tyytyväistä Asiakasta</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative ${primaryContact.bgColor} ${primaryContact.hoverColor} ${primaryContact.textColor} p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
      >
        {/* Business Status Indicator */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isBusinessOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>

        {/* Pulse Animation when business is open */}
        {isBusinessOpen && (
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping"></div>
        )}

        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <primaryContact.icon className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        {!isExpanded && (
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {isBusinessOpen ? 'Löydä täydellinen auto - Olemme auki!' : 'Ota yhteyttä - Vastaamme nopeasti!'}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        )}
      </motion.button>

      {/* Screen Reader Support */}
      <span className="sr-only">
        Ota yhteyttä {siteConfig.name} - {isBusinessOpen ? 'Tällä hetkellä auki' : 'Tällä hetkellä kiinni'}.
        Useita yhteystapoja saatavilla: autojen selaus, WhatsApp, puhelin, sähköposti ja myymälävierailu.
      </span>
    </div>
  );
}