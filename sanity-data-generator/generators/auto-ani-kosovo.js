import {
  generateSlug,
  createLocalizedString,
  createLocalizedText,
  createSEO,
  randomFromArray,
  randomNumber,
  randomPrice,
  getRealisticYear,
  getRealisticMileage,
  generatePersonName,
  getVehicleImageUrl,
  getServiceImageUrl,
  getPersonImageUrl
} from '../utils/helpers.js'
import { vehicleSpecs, serviceSpecifications, businessHours } from '../data/vehicle-specs.js'

export const generateAutoAniKosovo = () => {
  console.log('🇽🇰 Generating data for AUTO ANI Kosovo Dealership...')

  const businessInfo = {
    _type: 'businessInfo',
    _id: 'auto-ani-kosovo-business',
    businessName: createLocalizedString('AUTO ANI', 'AUTO ANI'),
    businessType: 'dealership',
    tagline: createLocalizedString(
      'Automjetet më të mira në Kosovë',
      'The best cars in Kosovo'
    ),
    description: createLocalizedText(
      'AUTO ANI është dealer kryesor i automjeteve në Kosovë me mbi 15 vjet përvojë. Ofrojmë automjete të reja dhe të përdorura, si dhe shërbime të plota të mirëmbajtjes. Cilësia dhe shërbimi janë prioritetet tona kryesore.',
      'AUTO ANI is a leading car dealer in Kosovo with over 15 years of experience. We offer new and used vehicles, as well as complete maintenance services. Quality and service are our main priorities.'
    ),
    contact: {
      phone: '+383 44 123 456',
      email: 'info@autoani.net',
      website: 'https://www.autoani.net',
      emergencyPhone: '+383 44 987 654'
    },
    locations: [{
      name: createLocalizedString('Zyra Kryesore', 'Main Office'),
      isPrimary: true,
      address: {
        street: 'Rruga Agim Ramadani 45',
        city: 'Prishtinë',
        postalCode: '10000',
        country: 'Kosovo'
      },
      coordinates: {
        lat: 42.6629,
        lng: 21.1655
      },
      phone: '+383 44 123 456',
      email: 'prishtina@autoani.net'
    }],
    hours: businessHours.kosovo,
    socialMedia: {
      facebook: 'https://facebook.com/autoanikosovo',
      instagram: 'https://instagram.com/autoanikosovo',
      youtube: 'https://youtube.com/@autoanikosovo'
    },
    legal: {
      businessId: '70123456',
      vatNumber: 'KS70123456',
      registeredName: 'AUTO ANI SH.P.K.'
    },
    servicesOffered: [
      'new-cars', 'used-cars', 'financing', 'trade-ins',
      'oil-change', 'brakes', 'tires', 'engine', 'electrical', 'body-work'
    ],
    paymentMethods: [
      'cash', 'credit-cards', 'debit-cards', 'bank-transfer', 'installments'
    ],
    languagesSpoken: ['sq', 'en', 'de', 'sv'],
    seo: createSEO(
      { fi: 'AUTO ANI - Shitje dhe Mirëmbajtje Automjetesh Prishtinë', en: 'AUTO ANI - Car Sales and Service Pristina' },
      { fi: 'Automjete të reja dhe të përdorura, shërbime komplete. Mbi 15 vjet përvojë në Kosovë.', en: 'New and used cars, complete services. Over 15 years of experience in Kosovo.' },
      ['automjete', 'makina', 'Prishtinë', 'cars', 'Kosovo', 'dealership']
    )
  }

  const vehicles = []
  const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota', 'Ford']

  // Generate vehicles with Kosovo market characteristics
  for (let i = 0; i < 20; i++) {
    const brand = randomFromArray(brands)
    const brandData = vehicleSpecs[brand]
    const modelName = randomFromArray(Object.keys(brandData.models))
    const modelData = brandData.models[modelName]
    const year = getRealisticYear()
    const mileage = getRealisticMileage(year)
    // Kosovo prices tend to be lower due to import market
    const basePrice = randomPrice(modelData.priceRange.min * 0.3, modelData.priceRange.max * 0.6, 500)
    const color = randomFromArray(modelData.colors)
    const engine = randomFromArray(modelData.engines)

    const title = `${year} ${brand} ${modelName}`

    vehicles.push({
      _type: 'vehicle',
      _id: `kosovo-vehicle-${i + 1}`,
      title,
      slug: { _type: 'slug', current: generateSlug(title) },
      brand,
      model: modelName,
      year,
      price: basePrice,
      negotiable: Math.random() > 0.5, // More negotiable in Kosovo market
      mileage,
      fuelType: randomFromArray(['gasoline', 'diesel', 'hybrid']),
      transmission: randomFromArray(['manual', 'automatic']),
      drivetrain: randomFromArray(['fwd', 'awd']),
      engine,
      color,
      interiorColor: randomFromArray(['E zezë', 'Gri', 'Bezhë', 'Kafe']),
      category: modelData.category,
      condition: randomFromArray(['used', 'used', 'used', 'certified', 'new']), // Mostly used cars
      mainImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: `image-${brand}-${modelName}-kosovo-${i}` }
      },
      description: `${year} ${brand} ${modelName} në gjendje të shkëlqyeshme. Importuar nga Gjermania me të gjitha dokumentet në rregull. Servisuar rregullisht dhe i gatshëm për pronarin e ri.`,
      features: modelData.features.slice(0, randomNumber(3, 5)),
      specifications: [
        {
          category: 'Engine & Performance',
          label: 'Motori',
          value: engine
        },
        {
          category: 'Engine & Performance',
          label: 'Karburanti',
          value: randomFromArray(['Benzinë', 'Dizell', 'Hibrid'])
        },
        {
          category: 'Exterior Features',
          label: 'Ngjyra',
          value: color
        },
        {
          category: 'Safety Features',
          label: 'Siguria',
          value: 'ABS, ESP, Airbag-ët'
        }
      ],
      status: randomFromArray(['available', 'available', 'available', 'sold', 'reserved']),
      featured: i < 4,
      priority: randomNumber(40, 90),
      contactPerson: 'Ardit Berisha',
      location: 'Prishtinë',
      seo: createSEO(
        { fi: `${title} - AUTO ANI Kosovo`, en: `${title} - AUTO ANI Kosovo` },
        { fi: `Shiko këtë ${title}. I kontrolluar, i servisuar dhe gati për shtëpi të re.`, en: `Check out this ${title}. Inspected, serviced and ready for a new home.` }
      )
    })
  }

  const services = [
    {
      _type: 'service',
      _id: 'kosovo-service-inspection',
      name: createLocalizedString('Kontrolli Teknik', 'Technical Inspection'),
      slug: { _type: 'slug', current: 'kontrolli-teknik' },
      description: createLocalizedText(
        'Kontrolli teknik profesional për automjetin tuaj. Ndihmojmë që makina juaj të kalojë kontrollin në tentativën e parë.',
        'Professional technical inspection for your vehicle. We help your car pass inspection on the first attempt.'
      ),
      shortDescription: createLocalizedString(
        'Shërbim i shpejtë dhe i besueshëm i kontrollimit',
        'Fast and reliable inspection service'
      ),
      pricing: {
        type: 'fixed',
        price: 25, // EUR prices common in Kosovo
        currency: 'EUR'
      },
      duration: { value: 45, unit: 'minutes' },
      category: 'inspection',
      businessType: ['dealership', 'auto-service'],
      featured: true,
      priority: 90
    },
    {
      _type: 'service',
      _id: 'kosovo-service-oil-change',
      name: createLocalizedString('Ndërrimi i Vajit', 'Oil Change'),
      slug: { _type: 'slug', current: 'nderrimi-i-vajit' },
      description: createLocalizedText(
        'Ndërrimi i rregullt i vajit e mban motorin në gjendje të mirë. Përdorim vetëm vajra dhe filtra cilësorë.',
        'Regular oil changes keep the engine in good condition. We use only quality oils and filters.'
      ),
      shortDescription: createLocalizedString(
        'Ndërrimi i vajit të motorit dhe filtrit',
        'Engine oil and filter change'
      ),
      pricing: {
        type: 'starting',
        price: 35,
        currency: 'EUR'
      },
      duration: { value: 30, unit: 'minutes' },
      category: 'oil-change',
      businessType: ['dealership', 'auto-service'],
      popular: true,
      priority: 85
    },
    {
      _type: 'service',
      _id: 'kosovo-service-brake-service',
      name: createLocalizedString('Shërbimi i Frenave', 'Brake Service'),
      slug: { _type: 'slug', current: 'sherbimi-i-frenave' },
      description: createLocalizedText(
        'Pastilat e frenave, disqet dhe lëngu. Siguria juaj është e rëndësishme për ne.',
        'Brake pads, discs and fluid. Your safety is important to us.'
      ),
      pricing: {
        type: 'starting',
        price: 45,
        currency: 'EUR'
      },
      duration: { value: 2, unit: 'hours' },
      category: 'brake-service',
      businessType: ['dealership', 'auto-service'],
      priority: 85
    },
    {
      _type: 'service',
      _id: 'kosovo-service-tire-service',
      name: createLocalizedString('Shërbimi i Gomave', 'Tire Service'),
      slug: { _type: 'slug', current: 'sherbimi-i-gomave' },
      description: createLocalizedText(
        'Ndërrimi i gomave, balancimi dhe ruajtja. Gomat dimërore dhe verore të ndrruara profesionalisht.',
        'Tire changing, balancing and storage. Winter and summer tires professionally changed.'
      ),
      pricing: {
        type: 'starting',
        price: 15,
        currency: 'EUR'
      },
      duration: { value: 1, unit: 'hours' },
      category: 'tire-service',
      businessType: ['dealership', 'auto-service'],
      availability: {
        isActive: true,
        seasonal: true,
        seasonStart: 3,
        seasonEnd: 11
      },
      priority: 80
    },
    {
      _type: 'service',
      _id: 'kosovo-service-diagnostics',
      name: createLocalizedString('Diagnostikimi i Automjetit', 'Car Diagnostics'),
      slug: { _type: 'slug', current: 'diagnostikimi' },
      description: createLocalizedText(
        'Me pajisje moderne zbulojmë problemet e automjetit tuaj shpejt dhe efektivisht.',
        'With modern equipment, we detect your car problems quickly and effectively.'
      ),
      pricing: {
        type: 'fixed',
        price: 20,
        currency: 'EUR'
      },
      duration: { value: 45, unit: 'minutes' },
      category: 'diagnostics',
      businessType: ['dealership', 'auto-service'],
      priority: 75
    },
    {
      _type: 'service',
      _id: 'kosovo-service-body-work',
      name: createLocalizedString('Punët e Karocerisë', 'Body Work'),
      slug: { _type: 'slug', current: 'punet-e-karocerise' },
      description: createLocalizedText(
        'Riparime të karocerisë, bojëra dhe restaurime. Kthejmë automjetin tuaj në gjendjen origjinale.',
        'Body repairs, painting and restorations. We restore your car to its original condition.'
      ),
      pricing: {
        type: 'quote',
        currency: 'EUR'
      },
      duration: { value: 1, unit: 'days' },
      category: 'body-work',
      businessType: ['dealership', 'body-shop'],
      priority: 70
    },
    {
      _type: 'service',
      _id: 'kosovo-service-financing',
      name: createLocalizedString('Financimi i Automjeteve', 'Car Financing'),
      slug: { _type: 'slug', current: 'financimi' },
      description: createLocalizedText(
        'Opsione konkurrues financimi. Ju ndihmojmë të gjeni zgjidhjen e duhur financiare.',
        'Competitive financing options. We help you find the right financial solution.'
      ),
      pricing: {
        type: 'quote',
        currency: 'EUR'
      },
      duration: { value: 30, unit: 'minutes' },
      category: 'additional',
      businessType: ['dealership'],
      priority: 60
    },
    {
      _type: 'service',
      _id: 'kosovo-service-import-assistance',
      name: createLocalizedString('Ndihmë për Import', 'Import Assistance'),
      slug: { _type: 'slug', current: 'ndihme-per-import' },
      description: createLocalizedText(
        'Ndihmojmë me importin e automjeteve nga Gjermania, Italia dhe vendet e tjera evropiane. Dokumentacioni dhe transporti i sigurt.',
        'We help with importing vehicles from Germany, Italy and other European countries. Documentation and safe transport.'
      ),
      pricing: {
        type: 'quote',
        currency: 'EUR'
      },
      duration: { value: 2, unit: 'weeks' },
      category: 'additional',
      businessType: ['dealership'],
      priority: 65
    }
  ]

  const teamMembers = [
    {
      _type: 'teamMember',
      _id: 'kosovo-team-1',
      name: 'Ardit Berisha',
      firstName: 'Ardit',
      lastName: 'Berisha',
      slug: { _type: 'slug', current: 'ardit-berisha' },
      position: createLocalizedString('Drejtor i Përgjithshëm', 'General Manager'),
      department: 'management',
      seniority: 'owner',
      bio: createLocalizedText(
        'Ardit ka themeluar AUTO ANI në vitin 2008 dhe e ka drejtuar kompaninë me sukses për mbi 15 vjet. Ka përvojë të gjerë në industrinë e automobilave dhe angazhim të fortë ndaj shërbimit të klientit.',
        'Ardit founded AUTO ANI in 2008 and has successfully led the company for over 15 years. He has extensive experience in the automotive industry and strong commitment to customer service.'
      ),
      shortBio: createLocalizedString(
        'Themelues dhe ekspert i industrisë së automobilave',
        'Founder and automotive industry expert'
      ),
      contact: {
        email: 'ardit@autoani.net',
        phone: '+383 44 123 456',
        directLine: '+383 44 123 456'
      },
      experience: 18,
      startDate: '2008-05-15',
      specialties: ['new-car-sales', 'used-car-sales', 'financing', 'customer-service'],
      languages: [
        { language: 'sq', level: 'native' },
        { language: 'en', level: 'fluent' },
        { language: 'de', level: 'conversational' }
      ],
      displaySettings: {
        showOnWebsite: true,
        showOnTeamPage: true,
        featured: true,
        displayOrder: 100
      },
      status: 'active',
      businessType: 'dealership'
    },
    {
      _type: 'teamMember',
      _id: 'kosovo-team-2',
      name: 'Besnik Krasniqi',
      firstName: 'Besnik',
      lastName: 'Krasniqi',
      slug: { _type: 'slug', current: 'besnik-krasniqi' },
      position: createLocalizedString('Menaxher Shitjesh', 'Sales Manager'),
      department: 'sales',
      seniority: 'manager',
      bio: createLocalizedText(
        'Besnik ka punuar në industrinë e automobilave për mbi 12 vjet. Specialiteti i tij janë automjetet e përdorura dhe zgjidhjet e financimit. Besnik është i njohur për shërbimin e tij të miqësishëm dhe profesionalizmin.',
        'Besnik has worked in the automotive industry for over 12 years. His specialty is used cars and financing solutions. Besnik is known for his friendly service and professionalism.'
      ),
      contact: {
        email: 'besnik@autoani.net',
        phone: '+383 44 234 567'
      },
      experience: 12,
      specialties: ['used-car-sales', 'financing', 'customer-service'],
      languages: [
        { language: 'sq', level: 'native' },
        { language: 'en', level: 'fluent' },
        { language: 'de', level: 'conversational' }
      ],
      displaySettings: {
        showOnWebsite: true,
        showOnTeamPage: true,
        displayOrder: 90
      },
      status: 'active',
      businessType: 'dealership'
    },
    {
      _type: 'teamMember',
      _id: 'kosovo-team-3',
      name: 'Dardan Hoxha',
      firstName: 'Dardan',
      lastName: 'Hoxha',
      slug: { _type: 'slug', current: 'dardan-hoxha' },
      position: createLocalizedString('Menaxher Servisi', 'Service Manager'),
      department: 'service',
      seniority: 'manager',
      bio: createLocalizedText(
        'Dardan është përgjegjës për operacionet e departamentit të servisit dhe siguron që të gjitha punët të kryehen sipas standardeve të larta. Ka mbi 15 vjet përvojë në riparim dhe mirëmbajtje të automjeteve.',
        'Dardan is responsible for service department operations and ensures all work is done to high standards. He has over 15 years of experience in car repair and maintenance.'
      ),
      contact: {
        email: 'dardan@autoani.net',
        phone: '+383 44 345 678'
      },
      experience: 15,
      specialties: ['engine-repair', 'diagnostics', 'electrical', 'brakes'],
      languages: [
        { language: 'sq', level: 'native' },
        { language: 'en', level: 'conversational' },
        { language: 'de', level: 'basic' }
      ],
      displaySettings: {
        showOnWebsite: true,
        showOnTeamPage: true,
        displayOrder: 80
      },
      status: 'active',
      businessType: 'dealership'
    },
    {
      _type: 'teamMember',
      _id: 'kosovo-team-4',
      name: 'Blerta Ahmeti',
      firstName: 'Blerta',
      lastName: 'Ahmeti',
      slug: { _type: 'slug', current: 'blerta-ahmeti' },
      position: createLocalizedString('Përfaqësuese e Shërbimit të Klientit', 'Customer Service Representative'),
      department: 'reception',
      seniority: 'staff',
      bio: createLocalizedText(
        'Blerta menaxhon marrëdhëniet me klientët dhe siguron që çdo klient të marrë shërbim miqësor dhe profesional. Ajo flet disa gjuhë dhe është pika e parë e kontaktit për klientët.',
        'Blerta manages customer relations and ensures every client receives friendly and professional service. She speaks several languages and is the first point of contact for customers.'
      ),
      contact: {
        email: 'blerta@autoani.net',
        phone: '+383 44 456 789'
      },
      experience: 5,
      specialties: ['customer-service'],
      languages: [
        { language: 'sq', level: 'native' },
        { language: 'en', level: 'fluent' },
        { language: 'de', level: 'conversational' },
        { language: 'sv', level: 'basic' }
      ],
      displaySettings: {
        showOnWebsite: true,
        showOnTeamPage: true,
        displayOrder: 70
      },
      status: 'active',
      businessType: 'dealership'
    }
  ]

  console.log(`Generated ${vehicles.length} vehicles, ${services.length} services, ${teamMembers.length} team members for AUTO ANI Kosovo`)

  return {
    businessInfo,
    vehicles,
    services,
    teamMembers,
    project: 'AUTO ANI Kosovo Dealership'
  }
}