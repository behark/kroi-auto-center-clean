import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.SANITY_PROJECT_ID) {
  throw new Error('SANITY_PROJECT_ID is required')
}

if (!process.env.SANITY_DATASET) {
  throw new Error('SANITY_DATASET is required')
}

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false, // Set to false for write operations
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Required for write operations
})

export const uploadImage = async (imageUrl, filename) => {
  try {
    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()

    const asset = await sanityClient.assets.upload('image', Buffer.from(buffer), {
      filename: filename
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`Failed to upload image ${filename}:`, error)
    return null
  }
}

export default sanityClient