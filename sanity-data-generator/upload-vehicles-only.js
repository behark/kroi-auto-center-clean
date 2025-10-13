import dotenv from 'dotenv'
import { sanityClient } from './config/sanity-client.js'
import {
  generateSlug,
  randomFromArray,
  randomNumber,
  randomPrice,
  getRealisticYear,
  getRealisticMileage
} from './utils/helpers.js'

dotenv.config()

// Helper function to handle document creation with retry logic
const createDocument = async (document, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await sanityClient.create(document)
      console.log(`✅ Created ${document._type}: ${result.brand} ${result.model} (${result.year})`)
      return result
    } catch (error) {
      console.log(`❌ Failed to create ${document._type} (attempt ${i + 1}/${retries}):`, error.message)

      if (i === retries - 1) {
        console.log(`💥 Giving up on ${document._type}: ${document.brand} ${document.model}`)
        return null
      }

      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}

// Generate realistic vehicles specifically for AUTO ANI Kosovo
const generateAutoAniVehicles = () => {
  console.log('🇽🇰 Generating 15 vehicles for AUTO ANI Kosovo Dealership...')

  const vehicles = []

  // European car brands popular in Kosovo
  const vehicleData = [
    {
      brand: 'BMW',
      models: ['320i', '520i', 'X3', 'X5', '118i'],
      engines: ['2.0L 4-Cylinder', '3.0L 6-Cylinder', '2.0L TwinPower Turbo'],
      colors: ['Mineral Grey Metallic', 'Alpine White', 'Jet Black', 'Storm Bay'],
      priceRange: [12000, 32000]
    },
    {
      brand: 'Mercedes-Benz',
      models: ['C-Class', 'E-Class', 'GLA', 'GLK', 'A-Class'],
      engines: ['2.0L 4-Cylinder', '3.0L V6', '1.6L Turbo'],
      colors: ['Obsidian Black', 'Polar White', 'Iridium Silver', 'Cavansite Blue'],
      priceRange: [13000, 35000]
    },
    {
      brand: 'Audi',
      models: ['A4', 'A6', 'Q5', 'A3', 'Q7'],
      engines: ['2.0L TFSI', '3.0L V6', '2.0L TDI'],
      colors: ['Phantom Black', 'Glacier White', 'Tornado Grey', 'Mythos Black'],
      priceRange: [11000, 30000]
    },
    {
      brand: 'Volkswagen',
      models: ['Golf', 'Passat', 'Tiguan', 'Jetta', 'Touareg'],
      engines: ['1.6L TSI', '2.0L TDI', '2.0L TSI'],
      colors: ['Deep Black Pearl', 'Pure White', 'Reflex Silver', 'Atlantic Blue'],
      priceRange: [8000, 25000]
    },
    {
      brand: 'Toyota',
      models: ['Camry', 'RAV4', 'Corolla', 'Yaris', 'Prius'],
      engines: ['1.8L 4-Cylinder', '2.5L Hybrid', '2.0L 4-Cylinder'],
      colors: ['Midnight Black', 'Super White', 'Silver Metallic', 'Barcelona Red'],
      priceRange: [9000, 28000]
    },
    {
      brand: 'Ford',
      models: ['Focus', 'Mondeo', 'Kuga', 'Fiesta', 'Edge'],
      engines: ['1.6L EcoBoost', '2.0L TDCi', '1.5L EcoBlue'],
      colors: ['Shadow Black', 'Frozen White', 'Magnetic Grey', 'Race Red'],
      priceRange: [7000, 22000]
    }
  ]

  const fuelTypes = ['gasoline', 'diesel', 'hybrid']
  const transmissions = ['manual', 'automatic']
  const categories = ['sedan', 'suv', 'hatchback', 'wagon', 'coupe']

  // Generate exactly 15 vehicles
  for (let i = 0; i < 15; i++) {
    const brandData = randomFromArray(vehicleData)
    const brand = brandData.brand
    const model = randomFromArray(brandData.models)
    const year = getRealisticYear()
    const mileage = getRealisticMileage(year)

    // Kosovo market pricing (lower than Western Europe)
    const price = randomPrice(brandData.priceRange[0], brandData.priceRange[1], 500)

    const color = randomFromArray(brandData.colors)
    const engine = randomFromArray(brandData.engines)
    const fuelType = randomFromArray(fuelTypes)
    const transmission = randomFromArray(transmissions)
    const category = randomFromArray(categories)

    // Featured vehicles (first 4 will be featured)
    const featured = i < 4

    const vehicleName = `${year} ${brand} ${model}`

    // Create description in both Albanian and English
    const descriptions = [
      `${vehicleName} në gjendje të shkëlqyeshme. Importuar nga Gjermania, me të gjitha dokumentet në rregull. Makina është servisuar rregullisht dhe është gati për pronarin e ri. Çmim i negociueshëm.`,
      `${vehicleName} in excellent condition. Imported from Germany with all documents in order. The car has been regularly serviced and is ready for a new owner. Price negotiable.`,
      `${vehicleName} - automjet cilësor me histori të pastër servisi. Ka qenë i mbajtur me kujdes dhe është në gjendje të jashtëzakonshme. Ideale për familje apo përdorim personal.`,
      `${vehicleName} me performancë të lartë dhe ekonomi karburanti. Teknologji moderne dhe siguri maksimale. Mundësi financimi dhe këmbimi të vjetër.`
    ]

    const vehicle = {
      _type: 'vehicle',
      _id: `kosovo-vehicle-${i + 1}`,
      brand,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      category,
      color,
      engine,
      featured,
      description: randomFromArray(descriptions),
      slug: {
        _type: 'slug',
        current: generateSlug(vehicleName)
      }
    }

    vehicles.push(vehicle)
  }

  return vehicles
}

// Main upload function
const uploadVehicles = async () => {
  console.log('🚀 Starting AUTO ANI Kosovo vehicle upload to Sanity CMS...')
  console.log('Project ID:', process.env.SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.SANITY_DATASET)

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN is required for write operations')
    process.exit(1)
  }

  try {
    // Generate vehicles
    const vehicles = generateAutoAniVehicles()

    console.log(`\n📊 Generated ${vehicles.length} vehicles for upload`)
    console.log('Brands included:', [...new Set(vehicles.map(v => v.brand))].join(', '))
    console.log('Featured vehicles:', vehicles.filter(v => v.featured).length)
    console.log('Price range: €' + Math.min(...vehicles.map(v => v.price)) + ' - €' + Math.max(...vehicles.map(v => v.price)))

    // Upload vehicles in batches
    console.log('\n🔄 Uploading vehicles to Sanity CMS...')
    const results = []

    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i]
      console.log(`\n[${i + 1}/${vehicles.length}] Uploading: ${vehicle.brand} ${vehicle.model} (${vehicle.year})`)

      const result = await createDocument(vehicle)
      if (result) {
        results.push(result)
      }

      // Small delay to avoid rate limiting
      if (i < vehicles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200))
      }
    }

    // Final summary
    console.log('\n🎉 Upload completed!')
    console.log(`📊 Successfully uploaded: ${results.length}/${vehicles.length} vehicles`)

    if (results.length < vehicles.length) {
      console.log('⚠️  Some vehicles failed to upload. Check the logs above for details.')
    }

    console.log('\n✅ AUTO ANI Kosovo now has vehicle inventory!')
    console.log('\n🔗 Next steps:')
    console.log('1. Visit your Sanity Studio to review the vehicles')
    console.log('2. Upload actual vehicle images')
    console.log('3. Test the integration with your website')

  } catch (error) {
    console.error('💥 Upload failed:', error)
    process.exit(1)
  }
}

// Run the upload
uploadVehicles()