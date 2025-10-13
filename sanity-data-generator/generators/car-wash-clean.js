import {
  generateSlug,
  createLocalizedString,
  createLocalizedText,
  createSEO,
  randomFromArray,
  randomNumber,
  generatePersonName,
  getServiceImageUrl,
  getPersonImageUrl
} from '../utils/helpers.js'
import { serviceSpecifications, businessHours } from '../data/vehicle-specs.js'

export const generateCarWashClean = () => {
  console.log('🧽 Generating data for Car Wash Clean (Booking Services)...')

  const businessInfo = {
    _type: 'businessInfo',
    _id: 'car-wash-clean-business',
    businessName: createLocalizedString('Car Wash Clean', 'Car Wash Clean'),
    businessType: 'car-wash',
    tagline: createLocalizedString(
      'Puhdasta palvelua autoillesi',
      'Clean service for your cars'
    ),
    description: createLocalizedText(
      'Car Wash Clean tarjoaa laadukkaita autonpesupalveluita ja yksityiskohtaista detailointia. Varaa aikasi verkossa ja nauti puhtaasta autosta. Käytämme ympäristöystävällisiä pesuaineita ja moderneja laitteita.',
      'Car Wash Clean offers quality car washing services and detailed detailing. Book your time online and enjoy a clean car. We use environmentally friendly detergents and modern equipment.'
    ),
    contact: {
      phone: '+358 50 987 6543',
      email: 'info@carwashclean.fi',
      website: 'https://www.carwashclean.fi',
      emergencyPhone: '+358 50 123 9876'
    },
    locations: [
      {
        name: createLocalizedString('Keskusta', 'City Center'),
        isPrimary: true,
        address: {
          street: 'Hämeenkatu 12',
          city: 'Helsinki',
          postalCode: '00100',
          country: 'Finland'
        },
        coordinates: {
          lat: 60.1695,
          lng: 24.9354
        },
        phone: '+358 50 987 6543',
        email: 'helsinki@carwashclean.fi'
      },
      {
        name: createLocalizedString('Espoo', 'Espoo'),
        isPrimary: false,
        address: {
          street: 'Kauppakeskus Iso Omena',
          city: 'Espoo',
          postalCode: '02210',
          country: 'Finland'
        },
        coordinates: {
          lat: 60.1606,
          lng: 24.7390
        },
        phone: '+358 50 234 5678',
        email: 'espoo@carwashclean.fi'
      }
    ],
    hours: businessHours.carwash,
    socialMedia: {
      facebook: 'https://facebook.com/carwashclean',
      instagram: 'https://instagram.com/carwashclean',
      tiktok: 'https://tiktok.com/@carwashclean'
    },
    legal: {
      businessId: '2345678-9',
      vatNumber: 'FI23456789',
      registeredName: 'Car Wash Clean Oy'
    },
    servicesOffered: [
      'car-wash', 'detailing', 'wax-polish'
    ],
    paymentMethods: [
      'cash', 'credit-cards', 'debit-cards', 'mobile-pay'
    ],
    languagesSpoken: ['fi', 'en', 'sv', 'ru'],
    seo: createSEO(
      { fi: 'Car Wash Clean - Autonpesu ja Detailu Helsinki', en: 'Car Wash Clean - Car Wash and Detailing Helsinki' },
      { fi: 'Laadukas autonpesu ja detailupalvelu Helsingissä. Varaa aika verkossa. Ympäristöystävällistä.', en: 'Quality car wash and detailing service in Helsinki. Book online. Environmentally friendly.' },
      ['autonpesu', 'detailu', 'Helsinki', 'car wash', 'detailing']
    )
  }

  const services = [
    {
      _type: 'service',
      _id: 'carwash-service-basic',
      name: createLocalizedString('Peruspesu', 'Basic Wash'),
      slug: { _type: 'slug', current: 'peruspesu' },
      description: createLocalizedText(
        'Nopea ja tehokas ulkopesu. Sisältää ennakkohuuhtelun, saippuapesun, harjauksen ja kuivauksen. Täydellinen valinta kiireisille.',
        'Quick and efficient exterior wash. Includes pre-rinse, soap wash, brushing and drying. Perfect choice for busy people.'
      ),
      shortDescription: createLocalizedString(
        'Nopea ulkopesu 15 minuutissa',
        'Quick exterior wash in 15 minutes'
      ),
      pricing: {
        type: 'fixed',
        price: 12,
        currency: 'EUR'
      },
      duration: { value: 15, unit: 'minutes' },
      category: 'basic-wash',
      businessType: ['car-wash'],
      capacity: {
        maxVehicles: 6,
        bookingRequired: false
      },
      features: [
        {
          feature: createLocalizedString('Ennakkohuuhtelu', 'Pre-rinse'),
          description: createLocalizedString('Poistaa karkean lian', 'Removes coarse dirt')
        },
        {
          feature: createLocalizedString('Saippuapesu', 'Soap wash'),
          description: createLocalizedString('Biologisesti hajoava pesuaine', 'Biodegradable detergent')
        },
        {
          feature: createLocalizedString('Kuivaus', 'Drying'),
          description: createLocalizedString('Täydellinen kuivaus', 'Complete drying')
        }
      ],
      process: serviceSpecifications.carWash['Basic Wash'].process.map(step => ({
        step: step.step,
        title: createLocalizedString(step.title.fi, step.title.en),
        description: createLocalizedText(
          `${step.title.fi} - ${step.duration} minuuttia`,
          `${step.title.en} - ${step.duration} minutes`
        ),
        duration: step.duration
      })),
      availability: { isActive: true },
      featured: true,
      popular: true,
      priority: 95
    },
    {
      _type: 'service',
      _id: 'carwash-service-premium',
      name: createLocalizedString('Premium-pesu', 'Premium Wash'),
      slug: { _type: 'slug', current: 'premium-pesu' },
      description: createLocalizedText(
        'Kattava pesu sisä- ja ulkopuolelta. Sisältää ulkopesun, sisätilan imuroinnin, kojelaudan puhdistuksen ja renkaidenkiillotuksen.',
        'Comprehensive wash inside and out. Includes exterior wash, interior vacuum, dashboard cleaning and tire shine.'
      ),
      shortDescription: createLocalizedString(
        'Täydellinen sisä- ja ulkopesu',
        'Complete interior and exterior wash'
      ),
      pricing: {
        type: 'fixed',
        price: 25,
        currency: 'EUR'
      },
      duration: { value: 30, unit: 'minutes' },
      category: 'premium-wash',
      businessType: ['car-wash'],
      capacity: {
        maxVehicles: 4,
        bookingRequired: true,
        advanceBookingDays: 7
      },
      features: [
        {
          feature: createLocalizedString('Ulkopesu', 'Exterior wash'),
          description: createLocalizedString('Täydellinen ulkopuhdistus', 'Complete exterior cleaning')
        },
        {
          feature: createLocalizedString('Sisätilan imurointi', 'Interior vacuum'),
          description: createLocalizedString('Matot ja istuimet', 'Mats and seats')
        },
        {
          feature: createLocalizedString('Kojelaudan puhdistus', 'Dashboard cleaning'),
          description: createLocalizedString('Pölynpoisto ja kiillotus', 'Dust removal and polishing')
        },
        {
          feature: createLocalizedString('Renkaidenkiillotus', 'Tire shine'),
          description: createLocalizedString('Kiiltävät renkaat', 'Shiny tires')
        }
      ],
      availability: { isActive: true },
      featured: true,
      popular: true,
      priority: 90
    },
    {
      _type: 'service',
      _id: 'carwash-service-deluxe',
      name: createLocalizedString('Deluxe-detailu', 'Deluxe Detailing'),
      slug: { _type: 'slug', current: 'deluxe-detailu' },
      description: createLocalizedText(
        'Ammattimainen detailupalvelu. Syväpesu, vahauksen levitys, sisätilan syvätaso pesu ja moottorin puhdistus. Sopii erikoistilanteisiin.',
        'Professional detailing service. Deep clean, wax application, interior deep clean and engine cleaning. Suitable for special occasions.'
      ),
      shortDescription: createLocalizedString(
        'Ammattimainen kokonaisvaltainen detailu',
        'Professional comprehensive detailing'
      ),
      pricing: {
        type: 'starting',
        price: 89,
        currency: 'EUR'
      },
      duration: { value: 2, unit: 'hours' },
      category: 'detailing',
      businessType: ['car-wash', 'detailing'],
      capacity: {
        maxVehicles: 2,
        bookingRequired: true,
        advanceBookingDays: 14
      },
      features: [
        {
          feature: createLocalizedString('Syväpesu', 'Deep clean'),
          description: createLocalizedString('Kaikkien pintojen perusteellinen puhdistus', 'Thorough cleaning of all surfaces')
        },
        {
          feature: createLocalizedString('Vahauksen levitys', 'Wax application'),
          description: createLocalizedString('Suojaa ja kiillottaa maalin', 'Protects and polishes paint')
        },
        {
          feature: createLocalizedString('Sisätilan detailu', 'Interior detailing'),
          description: createLocalizedString('Nahkan hoito ja tekstiilien puhdistus', 'Leather care and textile cleaning')
        },
        {
          feature: createLocalizedString('Moottorin pesu', 'Engine cleaning'),
          description: createLocalizedString('Moottoritilan puhdistus ja suojaus', 'Engine bay cleaning and protection')
        }
      ],
      availability: { isActive: true },
      featured: true,
      priority: 85
    },
    {
      _type: 'service',
      _id: 'carwash-service-interior',
      name: createLocalizedString('Sisätilanpesu', 'Interior Cleaning'),
      slug: { _type: 'slug', current: 'sisatilanpesu' },
      description: createLocalizedText(
        'Keskity sisätilaan. Perusteellinen imurointi, istuinten puhdistus, kojelaudan hoito ja tuoksu. Ihanteellinen perheiden autoille.',
        'Focus on the interior. Thorough vacuum, seat cleaning, dashboard care and fragrance. Ideal for family cars.'
      ),
      shortDescription: createLocalizedString(
        'Perusteellinen sisätilanpuhdistus',
        'Thorough interior cleaning'
      ),
      pricing: {
        type: 'fixed',
        price: 35,
        currency: 'EUR'
      },
      duration: { value: 45, unit: 'minutes' },
      category: 'interior',
      businessType: ['car-wash', 'detailing'],
      capacity: {
        maxVehicles: 3,
        bookingRequired: true,
        advanceBookingDays: 3
      },
      availability: { isActive: true },
      popular: true,
      priority: 80
    },
    {
      _type: 'service',
      _id: 'carwash-service-wax',
      name: createLocalizedString('Vahauksen levitys', 'Wax Application'),
      slug: { _type: 'slug', current: 'vahauksen-levitys' },
      description: createLocalizedText(
        'Suojaa autosi maali laadukkaalla vahalla. Kiiltävä lopputulos ja pitkäkestoinen suoja säätä vastaan.',
        'Protect your car paint with quality wax. Shiny finish and long-lasting protection against weather.'
      ),
      shortDescription: createLocalizedString(
        'Maalinsuojaus ja kiillotus',
        'Paint protection and polishing'
      ),
      pricing: {
        type: 'fixed',
        price: 45,
        currency: 'EUR'
      },
      duration: { value: 1, unit: 'hours' },
      category: 'wax-polish',
      businessType: ['car-wash', 'detailing'],
      capacity: {
        maxVehicles: 2,
        bookingRequired: true,
        advanceBookingDays: 5
      },
      availability: {
        isActive: true,
        seasonal: true,
        seasonStart: 4,
        seasonEnd: 10
      },
      priority: 70
    },
    {
      _type: 'service',
      _id: 'carwash-service-express',
      name: createLocalizedString('Express-pesu', 'Express Wash'),
      slug: { _type: 'slug', current: 'express-pesu' },
      description: createLocalizedText(
        'Kiireessä? Express-pesu on nopein vaihtoehto. 10 minuutissa auto on puhdas ja kuiva.',
        'In a hurry? Express wash is the fastest option. In 10 minutes your car is clean and dry.'
      ),
      shortDescription: createLocalizedString(
        'Nopein pesuvaihtoehto 10 minuutissa',
        'Fastest wash option in 10 minutes'
      ),
      pricing: {
        type: 'fixed',
        price: 8,
        currency: 'EUR'
      },
      duration: { value: 10, unit: 'minutes' },
      category: 'basic-wash',
      businessType: ['car-wash'],
      capacity: {
        maxVehicles: 8,
        bookingRequired: false
      },
      availability: { isActive: true },
      popular: true,
      priority: 75
    }
  ]

  const teamMembers = [
    {
      _type: 'teamMember',
      _id: 'carwash-team-1',
      name: 'Jenni Laine',
      firstName: 'Jenni',
      lastName: 'Laine',
      slug: { _type: 'slug', current: 'jenni-laine' },
      position: createLocalizedString('Toimipaikkapäällikkö', 'Location Manager'),
      department: 'management',
      seniority: 'manager',
      bio: createLocalizedText(
        'Jenni vastaa Car Wash Clean päivittäisestä toiminnasta ja asiakaspalvelusta. Hänellä on yli 8 vuoden kokemus autopesualan johtamisesta ja vahva sitoutuminen ympäristöystävällisiin ratkaisuihin.',
        'Jenni is responsible for Car Wash Clean daily operations and customer service. She has over 8 years of experience in car wash management and strong commitment to environmentally friendly solutions.'
      ),
      shortBio: createLocalizedString(
        'Autopesualan asiantuntija ja ympäristön ystävä',
        'Car wash expert and environmental advocate'
      ),
      contact: {
        email: 'jenni@carwashclean.fi',
        phone: '+358 50 987 6543'
      },
      experience: 8,
      specialties: ['customer-service', 'car-wash', 'detailing'],
      languages: [
        { language: 'fi', level: 'native' },
        { language: 'en', level: 'fluent' },
        { language: 'sv', level: 'conversational' }
      ],
      displaySettings: {
        showOnWebsite: true,
        showOnTeamPage: true,
        featured: true,
        displayOrder: 100
      },
      status: 'active',
      businessType: 'car-wash'
    },
    {
      _type: 'teamMember',
      _id: 'carwash-team-2',
      name: 'Tommi Heikkinen',
      firstName: 'Tommi',
      lastName: 'Heikkinen',
      slug: { _type: 'slug', current: 'tommi-heikkinen' },
      position: createLocalizedString('Detailuasiantuntija', 'Detailing Specialist'),
      department: 'detailing',
      seniority: 'senior',
      bio: createLocalizedText(
        'Tommi on erikoistunut autojen detailointiin ja maalinhoitoon. Hänen tarkka työnsä ja huomio yksityiskohtiin tekevät jokaisesta autosta näyttelykelpoisen.',
        'Tommi specializes in car detailing and paint care. His precise work and attention to detail make every car showroom ready.'
      ),
      contact: {
        email: 'tommi@carwashclean.fi',
        phone: '+358 50 123 7890'
      },
      experience: 6,
      specialties: ['detailing', 'paint-correction', 'ceramic-coating'],
      languages: [
        { language: 'fi', level: 'native' },
        { language: 'en', level: 'conversational' }
      ],
      displaySettings: {
        showOnWebsite: true,
        showOnTeamPage: true,
        displayOrder: 90
      },
      status: 'active',
      businessType: 'car-wash'
    },
    {
      _type: 'teamMember',
      _id: 'carwash-team-3',
      name: 'Anna Virtanen',
      firstName: 'Anna',
      lastName: 'Virtanen',
      slug: { _type: 'slug', current: 'anna-virtanen' },
      position: createLocalizedString('Asiakaspalveluvastaava', 'Customer Service Representative'),
      department: 'reception',
      seniority: 'staff',
      bio: createLocalizedText(
        'Anna vastaa varausten hallinnasta ja asiakkaiden vastaanotosta. Hän varmistaa, että jokainen asiakas saa ystävällistä ja ammattitaitoista palvelua.',
        'Anna handles booking management and customer reception. She ensures every customer receives friendly and professional service.'
      ),
      contact: {
        email: 'anna@carwashclean.fi',
        phone: '+358 50 456 7890'
      },
      experience: 3,
      specialties: ['customer-service'],
      languages: [
        { language: 'fi', level: 'native' },
        { language: 'en', level: 'fluent' },
        { language: 'ru', level: 'conversational' }
      ],
      displaySettings: {
        showOnWebsite: true,
        showOnTeamPage: true,
        displayOrder: 80
      },
      status: 'active',
      businessType: 'car-wash'
    }
  ]

  // No vehicles for car wash business
  const vehicles = []

  console.log(`Generated ${services.length} services, ${teamMembers.length} team members for Car Wash Clean`)

  return {
    businessInfo,
    vehicles,
    services,
    teamMembers,
    project: 'Car Wash Clean (Booking Services)'
  }
}