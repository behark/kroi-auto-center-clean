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

export const generateKroiAutoCenter = () => {
  console.log('🇫🇮 Generating data for Kroi Auto Center (Finland)...')

  const businessInfo = {
    _type: 'businessInfo',
    _id: 'kroi-auto-center-business',
    businessName: createLocalizedString('Kroi Auto Center', 'Kroi Auto Center'),
    businessType: 'dealership',
    tagline: createLocalizedString(
      'Luotettava autokauppa Suomen sydämessä',
      'Reliable car dealership in the heart of Finland'
    ),
    description: createLocalizedText(
      'Kroi Auto Center on ollut palvelemassa suomalaisia autoilijoita yli 25 vuotta. Meiltä löydät laajan valikoiman laadukkaita käytettyjä autoja sekä asiantuntevaa huoltopalvelua. Asiakastyytyväisyys on meille tärkeintä.',
      'Kroi Auto Center has been serving Finnish motorists for over 25 years. We offer a wide selection of quality used cars and expert service. Customer satisfaction is our top priority.'
    ),
    contact: {
      phone: '+358 40 123 4567',
      email: 'info@kroiauto.fi',
      website: 'https://www.kroiauto.fi',
      emergencyPhone: '+358 40 987 6543'
    },
    locations: [{
      name: createLocalizedString('Pääkonttori', 'Main Office'),
      isPrimary: true,
      address: {
        street: 'Teollisuuskatu 15',
        city: 'Tampere',
        postalCode: '33100',
        country: 'Finland'
      },
      coordinates: {
        lat: 61.4991,
        lng: 23.7871
      },
      phone: '+358 40 123 4567',
      email: 'tampere@kroiauto.fi'
    }],
    hours: businessHours.fi,
    socialMedia: {
      facebook: 'https://facebook.com/kroiauto',
      instagram: 'https://instagram.com/kroiauto',
      youtube: 'https://youtube.com/@kroiauto'
    },
    legal: {
      businessId: '1234567-8',
      vatNumber: 'FI12345678',
      registeredName: 'Kroi Auto Center Oy',
      licenses: [{
        name: 'Autokaupan toimilupa',
        number: 'AKT-2019-001',
        issuer: 'Trafi',
        expiryDate: '2025-12-31'
      }]
    },
    servicesOffered: [
      'used-cars', 'financing', 'trade-ins', 'oil-change',
      'brakes', 'tires', 'engine', 'electrical'
    ],
    paymentMethods: [
      'cash', 'credit-cards', 'debit-cards', 'bank-transfer',
      'mobile-pay', 'financing', 'installments'
    ],
    languagesSpoken: ['fi', 'en', 'sv'],
    seo: createSEO(
      { fi: 'Kroi Auto Center - Luotettava Autokauppa Tampereella', en: 'Kroi Auto Center - Reliable Car Dealership in Tampere' },
      { fi: 'Käytetyt autot, rahoitus ja huoltopalvelut. Yli 25 vuoden kokemus. Tampere, Suomi.', en: 'Used cars, financing and service. Over 25 years of experience. Tampere, Finland.' },
      ['käytetyt autot', 'autokauppa', 'Tampere', 'used cars', 'car dealership']
    )
  }

  const vehicles = []
  const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota', 'Ford']

  for (let i = 0; i < 18; i++) {
    const brand = randomFromArray(brands)
    const brandData = vehicleSpecs[brand]
    const modelName = randomFromArray(Object.keys(brandData.models))
    const modelData = brandData.models[modelName]
    const year = getRealisticYear()
    const mileage = getRealisticMileage(year)
    const basePrice = randomPrice(modelData.priceRange.min * 0.4, modelData.priceRange.max * 0.7, 1000)
    const color = randomFromArray(modelData.colors)
    const engine = randomFromArray(modelData.engines)

    const title = `${year} ${brand} ${modelName}`

    vehicles.push({
      _type: 'vehicle',
      _id: `kroi-vehicle-${i + 1}`,
      title,
      slug: { _type: 'slug', current: generateSlug(title) },
      brand,
      model: modelName,
      year,
      price: basePrice,
      negotiable: Math.random() > 0.7,
      mileage,
      fuelType: randomFromArray(['gasoline', 'diesel', 'hybrid']),
      transmission: randomFromArray(['manual', 'automatic']),
      drivetrain: randomFromArray(['fwd', 'awd']),
      engine,
      color,
      interiorColor: randomFromArray(['Musta', 'Harmaa', 'Beige', 'Ruskea']),
      category: modelData.category,
      condition: 'used',
      mainImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: `image-${brand}-${modelName}-${i}` }
      },
      description: `Hyväkuntoinen ${year} ${brand} ${modelName}. Huollettu säännöllisesti ja pidetty hyvässä kunnossa. Mukana huoltokirja ja kaikki alkuperäiset avaimet.`,
      features: modelData.features.slice(0, randomNumber(3, 5)),
      specifications: [
        {
          category: 'Engine & Performance',
          label: 'Moottori',
          value: engine
        },
        {
          category: 'Engine & Performance',
          label: 'Polttoaine',
          value: randomFromArray(['Bensiini', 'Diesel', 'Hybridi'])
        },
        {
          category: 'Exterior Features',
          label: 'Väri',
          value: color
        },
        {
          category: 'Safety Features',
          label: 'Turvallisuus',
          value: 'ABS, ESP, Turvatyynyt'
        }
      ],
      status: randomFromArray(['available', 'available', 'available', 'sold', 'reserved']),
      featured: i < 3,
      priority: randomNumber(40, 90),
      contactPerson: 'Mikael Virtanen',
      location: 'Tampere',
      seo: createSEO(
        { fi: `${title} - Kroi Auto Center`, en: `${title} - Kroi Auto Center` },
        { fi: `Katsasta tämä ${title}. Huollettu, tarkastettu ja valmis uuteen kotiin.`, en: `Check out this ${title}. Serviced, inspected and ready for a new home.` }
      )
    })
  }

  const services = [
    {
      _type: 'service',
      _id: 'kroi-service-inspection',
      name: createLocalizedString('Määräaikaiskatsastus', 'Periodic Inspection'),
      slug: { _type: 'slug', current: 'maaraaikaiskatsastus' },
      description: createLocalizedText(
        'Ammattitaitoinen määräaikaiskatsastus. Autamme saamaan autosi läpi katsastuksesta ensimmäisellä kerralla.',
        'Professional periodic inspection service. We help get your car through inspection on the first try.'
      ),
      shortDescription: createLocalizedString(
        'Nopea ja luotettava katsastuspalvelu',
        'Fast and reliable inspection service'
      ),
      pricing: {
        type: 'fixed',
        price: 45,
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
      _id: 'kroi-service-oil-change',
      name: createLocalizedString('Öljynvaihto', 'Oil Change'),
      slug: { _type: 'slug', current: 'oljynvaihto' },
      description: createLocalizedText(
        'Säännöllinen öljynvaihto pitää moottorin kunnossa. Käytämme vain laadukkaita öljyjä ja suodattimia.',
        'Regular oil changes keep your engine in good condition. We use only quality oils and filters.'
      ),
      shortDescription: createLocalizedString(
        'Moottoriöljyn ja suodattimen vaihto',
        'Engine oil and filter replacement'
      ),
      pricing: {
        type: 'starting',
        price: 85,
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
      _id: 'kroi-service-tire-change',
      name: createLocalizedString('Rengaspalvelu', 'Tire Service'),
      slug: { _type: 'slug', current: 'rengaspalvelu' },
      description: createLocalizedText(
        'Renkaiden vaihto, tasapainotus ja säilytys. Talvi- ja kesärenkaat ammattitaitoisesti vaihdettuna.',
        'Tire changing, balancing and storage. Winter and summer tires professionally changed.'
      ),
      pricing: {
        type: 'starting',
        price: 35,
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
      _id: 'kroi-service-brake-service',
      name: createLocalizedString('Jarruhuolto', 'Brake Service'),
      slug: { _type: 'slug', current: 'jarruhuolto' },
      description: createLocalizedText(
        'Jarrupalat, -levyt ja -nesteet. Turvallisuutesi on meille tärkeää.',
        'Brake pads, discs and fluids. Your safety is important to us.'
      ),
      pricing: {
        type: 'starting',
        price: 180,
        currency: 'EUR'
      },
      duration: { value: 2, unit: 'hours' },
      category: 'brake-service',
      businessType: ['dealership', 'auto-service'],
      priority: 85
    },
    {
      _type: 'service',
      _id: 'kroi-service-ac-service',
      name: createLocalizedString('Ilmastointihuolto', 'AC Service'),
      slug: { _type: 'slug', current: 'ilmastointihuolto' },
      description: createLocalizedText(
        'Ilmastoinnin täyttö, puhdistus ja korjaus. Pidä sisäilma raikkaana.',
        'AC filling, cleaning and repair. Keep your interior air fresh.'
      ),
      pricing: {
        type: 'starting',
        price: 95,
        currency: 'EUR'
      },
      duration: { value: 1, unit: 'hours' },
      category: 'ac-service',
      businessType: ['dealership', 'auto-service'],
      availability: {
        isActive: true,
        seasonal: true,
        seasonStart: 4,
        seasonEnd: 9
      },
      priority: 70
    },
    {
      _type: 'service',
      _id: 'kroi-service-diagnostics',
      name: createLocalizedString('Autodiagnostiikka', 'Car Diagnostics'),
      slug: { _type: 'slug', current: 'autodiagnostiikka' },
      description: createLocalizedText(
        'Modernilla laitteistolla selvitämme autosi ongelmat nopeasti ja tehokkaasti.',
        'With modern equipment, we diagnose your car problems quickly and efficiently.'
      ),
      pricing: {
        type: 'fixed',
        price: 65,
        currency: 'EUR'
      },
      duration: { value: 45, unit: 'minutes' },
      category: 'diagnostics',
      businessType: ['dealership', 'auto-service'],
      priority: 75
    },
    {
      _type: 'service',
      _id: 'kroi-service-financing',
      name: createLocalizedString('Autorahoitus', 'Car Financing'),
      slug: { _type: 'slug', current: 'autorahoitus' },
      description: createLocalizedText(
        'Kilpailukykyiset rahoitusvaihtoehdot. Autamme löytämään sinulle sopivan rahoitusratkaisun.',
        'Competitive financing options. We help you find a suitable financing solution.'
      ),
      pricing: {
        type: 'quote',
        currency: 'EUR'
      },
      duration: { value: 30, unit: 'minutes' },
      category: 'additional',
      businessType: ['dealership'],
      priority: 60
    }
  ]

  const teamMembers = [
    {
      _type: 'teamMember',
      _id: 'kroi-team-1',
      name: 'Mikael Virtanen',
      firstName: 'Mikael',
      lastName: 'Virtanen',
      slug: { _type: 'slug', current: 'mikael-virtanen' },
      position: createLocalizedString('Toimitusjohtaja', 'CEO'),
      department: 'management',
      seniority: 'owner',
      bio: createLocalizedText(
        'Mikael on perustanut Kroi Auto Centerin vuonna 1998 ja johtanut yritystä menestyksekkäästi yli 25 vuotta. Hänellä on pitkä kokemus autoteollisuudesta ja vahva sitoutuminen asiakaspalveluun.',
        'Mikael founded Kroi Auto Center in 1998 and has successfully led the company for over 25 years. He has extensive experience in the automotive industry and a strong commitment to customer service.'
      ),
      shortBio: createLocalizedString(
        'Yrittäjä ja autoteollisuuden ammattilainen',
        'Entrepreneur and automotive industry professional'
      ),
      contact: {
        email: 'mikael@kroiauto.fi',
        phone: '+358 40 123 4567',
        directLine: '+358 40 123 4567'
      },
      experience: 28,
      startDate: '1998-03-15',
      specialties: ['new-car-sales', 'used-car-sales', 'financing', 'customer-service'],
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
      businessType: 'dealership'
    },
    {
      _type: 'teamMember',
      _id: 'kroi-team-2',
      name: 'Sari Korhonen',
      firstName: 'Sari',
      lastName: 'Korhonen',
      slug: { _type: 'slug', current: 'sari-korhonen' },
      position: createLocalizedString('Myyntipäällikkö', 'Sales Manager'),
      department: 'sales',
      seniority: 'manager',
      bio: createLocalizedText(
        'Sari on työskennellyt autokaupan alalla yli 15 vuotta. Hänen erikoisalaansa ovat käytetyt autot ja rahoitusratkaisut. Sari on tunnettu ystävällisestä palvelustaan ja ammattitaidostaan.',
        'Sari has worked in the car trade for over 15 years. Her specialties are used cars and financing solutions. Sari is known for her friendly service and professionalism.'
      ),
      contact: {
        email: 'sari@kroiauto.fi',
        phone: '+358 40 234 5678'
      },
      experience: 15,
      specialties: ['used-car-sales', 'financing', 'customer-service'],
      languages: [
        { language: 'fi', level: 'native' },
        { language: 'en', level: 'fluent' }
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
      _id: 'kroi-team-3',
      name: 'Petri Mäkinen',
      firstName: 'Petri',
      lastName: 'Mäkinen',
      slug: { _type: 'slug', current: 'petri-makinen' },
      position: createLocalizedString('Huoltopäällikkö', 'Service Manager'),
      department: 'service',
      seniority: 'manager',
      bio: createLocalizedText(
        'Petri vastaa huolto-osaston toiminnasta ja varmistaa, että kaikki työt tehdään korkean laadun mukaisesti. Hänellä on yli 20 vuoden kokemus autojen korjauksesta ja huollosta.',
        'Petri is responsible for service department operations and ensures all work is done to high standards. He has over 20 years of experience in car repair and maintenance.'
      ),
      contact: {
        email: 'petri@kroiauto.fi',
        phone: '+358 40 345 6789'
      },
      experience: 20,
      specialties: ['engine-repair', 'diagnostics', 'electrical', 'brakes'],
      languages: [
        { language: 'fi', level: 'native' },
        { language: 'en', level: 'conversational' }
      ],
      displaySettings: {
        showOnWebsite: true,
        showOnTeamPage: true,
        displayOrder: 80
      },
      status: 'active',
      businessType: 'dealership'
    }
  ]

  console.log(`Generated ${vehicles.length} vehicles, ${services.length} services, ${teamMembers.length} team members for Kroi Auto Center`)

  return {
    businessInfo,
    vehicles,
    services,
    teamMembers,
    project: 'Kroi Auto Center (Finland)'
  }
}