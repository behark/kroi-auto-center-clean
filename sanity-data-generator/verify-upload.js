import dotenv from 'dotenv'
import { sanityClient } from './config/sanity-client.js'

dotenv.config()

// Verify the uploaded vehicles
const verifyVehicles = async () => {
  try {
    console.log('🔍 Verifying vehicles in Sanity CMS...')

    const vehicles = await sanityClient.fetch(`
      *[_type == "vehicle"] | order(featured desc, year desc) {
        _id,
        brand,
        model,
        year,
        price,
        mileage,
        fuelType,
        transmission,
        category,
        color,
        featured,
        "slug": slug.current
      }
    `)

    if (vehicles.length === 0) {
      console.log('❌ No vehicles found in database')
      return
    }

    console.log(`\n✅ Found ${vehicles.length} vehicles in database:\n`)

    // Group by brand for better display
    const vehiclesByBrand = vehicles.reduce((acc, vehicle) => {
      if (!acc[vehicle.brand]) {
        acc[vehicle.brand] = []
      }
      acc[vehicle.brand].push(vehicle)
      return acc
    }, {})

    Object.entries(vehiclesByBrand).forEach(([brand, brandVehicles]) => {
      console.log(`🚗 ${brand} (${brandVehicles.length} vehicles):`)
      brandVehicles.forEach(vehicle => {
        const featuredIcon = vehicle.featured ? '⭐' : '  '
        console.log(`   ${featuredIcon} ${vehicle.year} ${vehicle.model} - €${vehicle.price.toLocaleString()} (${vehicle.mileage.toLocaleString()} km)`)
      })
      console.log('')
    })

    // Summary statistics
    const featured = vehicles.filter(v => v.featured)
    const priceRange = {
      min: Math.min(...vehicles.map(v => v.price)),
      max: Math.max(...vehicles.map(v => v.price))
    }
    const yearRange = {
      min: Math.min(...vehicles.map(v => v.year)),
      max: Math.max(...vehicles.map(v => v.year))
    }

    console.log('📊 Summary:')
    console.log(`   • Total vehicles: ${vehicles.length}`)
    console.log(`   • Featured vehicles: ${featured.length}`)
    console.log(`   • Brands: ${Object.keys(vehiclesByBrand).join(', ')}`)
    console.log(`   • Price range: €${priceRange.min.toLocaleString()} - €${priceRange.max.toLocaleString()}`)
    console.log(`   • Year range: ${yearRange.min} - ${yearRange.max}`)

    // Fuel type distribution
    const fuelTypes = vehicles.reduce((acc, v) => {
      acc[v.fuelType] = (acc[v.fuelType] || 0) + 1
      return acc
    }, {})
    console.log(`   • Fuel types: ${Object.entries(fuelTypes).map(([type, count]) => `${type} (${count})`).join(', ')}`)

    // Transmission distribution
    const transmissions = vehicles.reduce((acc, v) => {
      acc[v.transmission] = (acc[v.transmission] || 0) + 1
      return acc
    }, {})
    console.log(`   • Transmissions: ${Object.entries(transmissions).map(([type, count]) => `${type} (${count})`).join(', ')}`)

    console.log('\n🎉 Vehicle inventory successfully verified!')
    console.log('\n🔗 Your vehicles are now available at:')
    console.log(`   • Sanity Studio: https://j2t31xge.sanity.studio/desk/vehicle`)
    console.log(`   • API endpoint: https://j2t31xge.api.sanity.io/v2023-05-03/data/query/production?query=*[_type == "vehicle"]`)

  } catch (error) {
    console.error('❌ Error verifying vehicles:', error.message)
  }
}

verifyVehicles()