#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateKroiAutoCenter } from '../generators/kroi-auto-center.js'
import { generateCarWashClean } from '../generators/car-wash-clean.js'
import { generateAutoAniKosovo } from '../generators/auto-ani-kosovo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Generate sample data files for review
const generateSampleFiles = async () => {
  console.log('📝 Generating sample data files...')

  const outputDir = path.join(__dirname, '..', 'sample-output')

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Generate data
  console.log('🇫🇮 Generating Kroi Auto Center data...')
  const kroiData = generateKroiAutoCenter()

  console.log('🧽 Generating Car Wash Clean data...')
  const carWashData = generateCarWashClean()

  console.log('🇽🇰 Generating AUTO ANI Kosovo data...')
  const kosovoData = generateAutoAniKosovo()

  // Save to files
  const projects = [
    { name: 'kroi-auto-center', data: kroiData },
    { name: 'car-wash-clean', data: carWashData },
    { name: 'auto-ani-kosovo', data: kosovoData }
  ]

  for (const project of projects) {
    const projectDir = path.join(outputDir, project.name)

    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true })
    }

    // Save each data type to separate files
    fs.writeFileSync(
      path.join(projectDir, 'business-info.json'),
      JSON.stringify(project.data.businessInfo, null, 2)
    )

    fs.writeFileSync(
      path.join(projectDir, 'vehicles.json'),
      JSON.stringify(project.data.vehicles, null, 2)
    )

    fs.writeFileSync(
      path.join(projectDir, 'services.json'),
      JSON.stringify(project.data.services, null, 2)
    )

    fs.writeFileSync(
      path.join(projectDir, 'team-members.json'),
      JSON.stringify(project.data.teamMembers, null, 2)
    )

    // Combined file
    fs.writeFileSync(
      path.join(projectDir, 'complete-data.json'),
      JSON.stringify(project.data, null, 2)
    )

    console.log(`✅ ${project.name} data saved to ${projectDir}`)
  }

  // Generate summary
  const summary = {
    generatedAt: new Date().toISOString(),
    projects: projects.map(p => ({
      name: p.name,
      businessInfo: !!p.data.businessInfo,
      vehicles: p.data.vehicles.length,
      services: p.data.services.length,
      teamMembers: p.data.teamMembers.length
    })),
    totalDocuments: projects.reduce((sum, p) =>
      sum + (p.data.businessInfo ? 1 : 0) +
      p.data.vehicles.length +
      p.data.services.length +
      p.data.teamMembers.length, 0
    )
  }

  fs.writeFileSync(
    path.join(outputDir, 'generation-summary.json'),
    JSON.stringify(summary, null, 2)
  )

  console.log('\n🎉 Sample data generation completed!')
  console.log(`📁 Files saved to: ${outputDir}`)
  console.log(`📊 Total documents: ${summary.totalDocuments}`)
  console.log('\n📋 Next steps:')
  console.log('1. Review the generated JSON files')
  console.log('2. Set up your SANITY_API_TOKEN in .env')
  console.log('3. Run: npm run import-data')

  return summary
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSampleFiles().catch(console.error)
}

export { generateSampleFiles }