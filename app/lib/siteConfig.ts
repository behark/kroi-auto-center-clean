export const siteConfig = {
  name: 'Kroi Auto Center',
  title: 'Kroi Auto Center - Luotettavat Käytetyt Autot Kosovossa',
  subtitle: 'Luotettavat Käytetyt Autot & Autopalvelut',
  description: 'Löydä laadukkaita käytettyjä autoja Kroi Auto Centeristä. Asiantuntevaa palvelua, kilpailukykyisiä hintoja ja kattavaa takuuta. Yli 15 vuoden kokemus autoalalta.',
  url: 'https://kroiautocenter.fi',

  // Logo and branding
  logoPath: '/logo-kroi.png',
  logoAlt: 'Kroi Auto Center',

  // Contact information
  address: {
    street: 'Pristina, Kosovo',
    city: 'Pristina',
    postalCode: '10000',
    country: 'Kosovo',
    full: 'Pristina 10000, Kosovo'
  },

  phone: {
    display: '+383 XX XXX XXX',
    tel: '+383XXXXXXX',
    international: '+383 XX XXX XXX'
  },

  email: 'info@kroiautocenter.fi',

  // Business hours
  hours: [
    { label: 'Maanantai-Perjantai', value: '09:00 - 18:00' },
    { label: 'Lauantai', value: '09:00 - 16:00' },
    { label: 'Sunnuntai', value: 'Suljettu' }
  ],

  // Social media
  social: {
    facebook: 'https://facebook.com/kroiautocenter',
    instagram: 'https://instagram.com/kroiautocenter',
    twitter: 'https://twitter.com/kroiautocenter',
    linkedin: 'https://linkedin.com/company/kroiautocenter'
  },

  // Business info
  business: {
    established: '2008',
    experience: '15+ vuotta',
    vehiclesSold: '2,500+',
    satisfactionRate: '98%',
    employeeCount: '12',
    certifications: [
      'Auktoriserad bilhandlare',
      'ISO 9001 sertifioitu',
      'Kuluttajavirasto hyväksytty'
    ]
  },

  // Services
  services: [
    'Käytettyjen autojen myynti',
    'Rahoituspalvelut',
    'Vaihtoautojen arviointi',
    'Takuupalvelut',
    'Huolto ja korjaus',
    'Tarkastuspalvelut'
  ],

  // Features
  features: {
    financing: {
      minRate: '2.9%',
      maxTerm: '84 kuukautta',
      instantApproval: true
    },
    warranty: {
      standard: '12 kuukautta',
      extended: '36 kuukautta saakka',
      coverage: 'Kattava takuu'
    },
    support: {
      availability: '24/7',
      languages: ['Suomi', 'Englanti', 'Serbia'],
      responseTime: '< 2 tuntia'
    }
  },

  // SEO and meta
  keywords: [
    'käytetyt autot',
    'autokauppa',
    'automyynti',
    'autoliike',
    'Kosovo',
    'Pristina',
    'rahoitus',
    'takuu',
    'BMW',
    'Mercedes',
    'Volkswagen',
    'Audi',
    'Skoda'
  ],

  // Legal
  legal: {
    vatNumber: 'FI12345678',
    businessId: 'Y-tunnus: 1234567-8',
    tradeRegister: 'Kaupparekisteri',
    dataProtectionOfficer: 'tietosuoja@kroiautocenter.fi'
  }
}

export type SiteConfig = typeof siteConfig