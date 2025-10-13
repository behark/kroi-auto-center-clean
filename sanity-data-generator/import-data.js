import dotenv from 'dotenv'
import { sanityClient } from './config/sanity-client.js'
import { generateKroiAutoCenter } from './generators/kroi-auto-center.js'
import { generateCarWashClean } from './generators/car-wash-clean.js'
import { generateAutoAniKosovo } from './generators/auto-ani-kosovo.js'
import { delay } from './utils/helpers.js'

dotenv.config()

// Helper function to handle document creation with retry logic
const createDocument = async (document, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await sanityClient.create(document)
      console.log(`✅ Created ${document._type}: ${result._id}`)
      return result
    } catch (error) {
      console.log(`❌ Failed to create ${document._type} (attempt ${i + 1}/${retries}):`, error.message)

      if (i === retries - 1) {
        console.log(`💥 Giving up on ${document._type}: ${document._id}`)
        return null
      }

      // Wait before retry
      await delay(1000 * (i + 1))
    }
  }
}

// Helper function to create documents in batches
const createDocumentsBatch = async (documents, batchSize = 10) => {
  const results = []

  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = documents.slice(i, i + batchSize)
    console.log(`\n🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(documents.length / batchSize)}...`)

    const batchPromises = batch.map(doc => createDocument(doc))
    const batchResults = await Promise.all(batchPromises)

    results.push(...batchResults.filter(result => result !== null))

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < documents.length) {
      await delay(500)
    }
  }

  return results
}

// Function to clear existing data (optional)
const clearExistingData = async () => {
  console.log('🧹 Clearing existing data...')

  const documentTypes = ['vehicle', 'service', 'teamMember', 'businessInfo']

  for (const type of documentTypes) {
    try {
      const existingDocs = await sanityClient.fetch(`*[_type == "${type}"]`)

      if (existingDocs.length > 0) {
        console.log(`Found ${existingDocs.length} existing ${type} documents`)

        for (const doc of existingDocs) {
          await sanityClient.delete(doc._id)
          console.log(`🗑️  Deleted ${type}: ${doc._id}`)
        }
      }
    } catch (error) {
      console.log(`Warning: Could not clear ${type} documents:`, error.message)
    }
  }
}

// Main import function
const importAllData = async () => {
  console.log('🚀 Starting Sanity CMS data import...')
  console.log('Project ID:', process.env.SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.SANITY_DATASET)

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN is required for write operations')
    process.exit(1)
  }

  try {
    // Optional: Clear existing data
    const shouldClear = process.argv.includes('--clear')
    if (shouldClear) {
      await clearExistingData()
      await delay(2000) // Wait a bit after clearing
    }

    // Generate data for all three projects
    console.log('\n📊 Generating data for all projects...')
    const kroiData = generateKroiAutoCenter()
    const carWashData = generateCarWashClean()
    const kosovoData = generateAutoAniKosovo()

    console.log('\n📈 Data generation summary:')
    console.log(`- Kroi Auto Center: ${kroiData.vehicles.length} vehicles, ${kroiData.services.length} services, ${kroiData.teamMembers.length} team members`)
    console.log(`- Car Wash Clean: ${carWashData.vehicles.length} vehicles, ${carWashData.services.length} services, ${carWashData.teamMembers.length} team members`)
    console.log(`- AUTO ANI Kosovo: ${kosovoData.vehicles.length} vehicles, ${kosovoData.services.length} services, ${kosovoData.teamMembers.length} team members`)

    // Combine all data
    const allBusinessInfo = [kroiData.businessInfo, carWashData.businessInfo, kosovoData.businessInfo]
    const allVehicles = [...kroiData.vehicles, ...carWashData.vehicles, ...kosovoData.vehicles]
    const allServices = [...kroiData.services, ...carWashData.services, ...kosovoData.services]
    const allTeamMembers = [...kroiData.teamMembers, ...carWashData.teamMembers, ...kosovoData.teamMembers]

    console.log(`\n🎯 Total documents to import: ${allBusinessInfo.length + allVehicles.length + allServices.length + allTeamMembers.length}`)

    // Import data in order of dependencies
    console.log('\n1️⃣  Importing business information...')
    const businessResults = await createDocumentsBatch(allBusinessInfo)
    console.log(`✅ Business info created: ${businessResults.length}/${allBusinessInfo.length}`)

    console.log('\n2️⃣  Importing team members...')
    const teamResults = await createDocumentsBatch(allTeamMembers, 5)
    console.log(`✅ Team members created: ${teamResults.length}/${allTeamMembers.length}`)

    console.log('\n3️⃣  Importing services...')
    const serviceResults = await createDocumentsBatch(allServices, 8)
    console.log(`✅ Services created: ${serviceResults.length}/${allServices.length}`)

    console.log('\n4️⃣  Importing vehicles...')
    const vehicleResults = await createDocumentsBatch(allVehicles, 10)
    console.log(`✅ Vehicles created: ${vehicleResults.length}/${allVehicles.length}`)

    // Final summary
    const totalCreated = businessResults.length + teamResults.length + serviceResults.length + vehicleResults.length
    const totalAttempted = allBusinessInfo.length + allTeamMembers.length + allServices.length + allVehicles.length

    console.log('\n🎉 Import completed!')
    console.log(`📊 Final statistics:`)
    console.log(`   - Business Information: ${businessResults.length}/${allBusinessInfo.length}`)
    console.log(`   - Team Members: ${teamResults.length}/${allTeamMembers.length}`)
    console.log(`   - Services: ${serviceResults.length}/${allServices.length}`)
    console.log(`   - Vehicles: ${vehicleResults.length}/${allVehicles.length}`)
    console.log(`   - Total: ${totalCreated}/${totalAttempted} (${Math.round(totalCreated / totalAttempted * 100)}% success rate)`)

    if (totalCreated < totalAttempted) {
      console.log('\n⚠️  Some documents failed to import. Check the logs above for details.')
    }

    console.log('\n🔗 Next steps:')
    console.log('1. Visit your Sanity Studio to review the imported data')
    console.log('2. Upload actual images to replace placeholder references')
    console.log('3. Fine-tune content and SEO settings as needed')
    console.log('4. Test the data integration with your frontend applications')

  } catch (error) {
    console.error('💥 Import failed:', error)
    process.exit(1)
  }
}

// Individual project import functions
const importKroiData = async () => {
  console.log('🇫🇮 Importing Kroi Auto Center data only...')
  const data = generateKroiAutoCenter()

  const allDocs = [data.businessInfo, ...data.teamMembers, ...data.services, ...data.vehicles]
  await createDocumentsBatch(allDocs, 8)

  console.log('✅ Kroi Auto Center data imported!')
}

const importCarWashData = async () => {
  console.log('🧽 Importing Car Wash Clean data only...')
  const data = generateCarWashClean()

  const allDocs = [data.businessInfo, ...data.teamMembers, ...data.services, ...data.vehicles]
  await createDocumentsBatch(allDocs, 8)

  console.log('✅ Car Wash Clean data imported!')
}

const importKosovoData = async () => {
  console.log('🇽🇰 Importing AUTO ANI Kosovo data only...')
  const data = generateAutoAniKosovo()

  const allDocs = [data.businessInfo, ...data.teamMembers, ...data.services, ...data.vehicles]
  await createDocumentsBatch(allDocs, 8)

  console.log('✅ AUTO ANI Kosovo data imported!')
}

// CLI handling
const command = process.argv[2]

switch (command) {
  case 'kroi':
    importKroiData()
    break
  case 'carwash':
    importCarWashData()
    break
  case 'kosovo':
    importKosovoData()
    break
  case 'all':
  default:
    importAllData()
    break
}

// Export functions for potential use in other scripts
export {
  importAllData,
  importKroiData,
  importCarWashData,
  importKosovoData,
  createDocument,
  createDocumentsBatch
}