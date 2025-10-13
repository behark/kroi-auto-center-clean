export const siteConfig = {
  name: 'Kroi Auto Center',
  title: 'Kroi Auto Center - Luotettavat Käytetyt Autot Kosovossa',
  subtitle: 'Luotettavat Käytetyt Autot & Autopalvelut',
  description: 'Löydä laadukkaita käytettyjä autoja Kroi Auto Centeristä. Asiantuntevaa palvelua, kilpailukykyisiä hintoja ja kattavaa takuuta. Yli 15 vuoden kokemus autoalalta.',
  url: 'https://kroiautocenter.fi',

  // Logo and branding
  logoPath: '/logo.png',
  logoAlt: 'Kroi Auto Center',

  // Contact information
  address: {
    street: 'Läkkisepäntie 15 B 3',
    city: 'Helsinki',
    postalCode: '00620',
    country: 'Finland',
    full: 'Läkkisepäntie 15 B 3, 00620 Helsinki, Finland'
  },

  phone: {
    primary: {
      display: '+358 41 318 8214',
      tel: '+358413188214',
      international: '+358 41 318 8214'
    },
    secondary: {
      display: '+358 44 242 3508',
      tel: '+358442423508',
      international: '+358 44 242 3508'
    }
  },

  email: 'kroiautocenter@gmail.com',

  // Business hours
  hours: [
    { label: 'MA-PE', value: '10:00 - 18:00' },
    { label: 'LA', value: '11:00 - 17:00' },
    { label: 'SU', value: 'Suljettu' }
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
    'Helsinki',
    'Suomi',
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
    dataProtectionOfficer: 'kroiautocenter@gmail.com'
  }
}

export type SiteConfig = typeof siteConfig