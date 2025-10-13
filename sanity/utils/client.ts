// Shared Sanity Client Configuration
// Reusable client setup for all automotive projects

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export interface AutomotiveClientConfig {
  projectId: string
  dataset?: string
  useCdn?: boolean
  apiVersion?: string
  token?: string
}

export function createAutomotiveClient(config: AutomotiveClientConfig) {
  const client = createClient({
    projectId: config.projectId,
    dataset: config.dataset || 'production',
    useCdn: config.useCdn ?? true,
    apiVersion: config.apiVersion || '2024-01-01',
    token: config.token
  })

  const builder = imageUrlBuilder(client)

  return {
    client,
    urlFor: (source: any) => builder.image(source)
  }
}

// Pre-configured clients for each project
export const autoAniClient = createAutomotiveClient({
  projectId: 'j2t31xge' // AUTO ANI existing project ID
})

export const carWashClient = createAutomotiveClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'car-wash-project-id'
})

export const kroiAutoClient = createAutomotiveClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kroi-auto-project-id'
})

// Universal GROQ queries for automotive businesses
export const AUTOMOTIVE_QUERIES = {
  // Vehicle queries
  vehicles: {
    all: `*[_type == "vehicle"] | order(_createdAt desc)`,
    available: `*[_type == "vehicle" && status == "available"] | order(priority desc, _createdAt desc)`,
    featured: `*[_type == "vehicle" && featured == true] | order(priority desc, _createdAt desc)`,
    bySlug: `*[_type == "vehicle" && slug.current == $slug][0]`,
    byCondition: `*[_type == "vehicle" && condition == $condition] | order(price asc)`,
    byBrand: `*[_type == "vehicle" && brand == $brand] | order(year desc, price asc)`,
    priceRange: `*[_type == "vehicle" && price >= $minPrice && price <= $maxPrice] | order(price asc)`
  },

  // Service queries
  services: {
    all: `*[_type == "service"] | order(priority desc, _createdAt desc)`,
    active: `*[_type == "service" && availability.isActive == true] | order(priority desc)`,
    featured: `*[_type == "service" && featured == true] | order(priority desc)`,
    byCategory: `*[_type == "service" && category == $category] | order(pricing.price asc)`,
    byBusinessType: `*[_type == "service" && $businessType in businessType] | order(priority desc)`,
    bySlug: `*[_type == "service" && slug.current == $slug][0]`
  },

  // Testimonial queries
  testimonials: {
    approved: `*[_type == "testimonial" && status == "approved"] | order(featured desc, rating desc, _createdAt desc)`,
    featured: `*[_type == "testimonial" && featured == true && status == "approved"] | order(rating desc, _createdAt desc)`,
    byRating: `*[_type == "testimonial" && rating >= $minRating && status == "approved"] | order(rating desc, _createdAt desc)`,
    byServiceType: `*[_type == "testimonial" && serviceType == $serviceType && status == "approved"] | order(rating desc)`,
    recent: `*[_type == "testimonial" && status == "approved"] | order(_createdAt desc)[0...$limit]`
  },

  // Contact inquiry queries
  inquiries: {
    new: `*[_type == "contactInquiry" && status == "new"] | order(_createdAt desc)`,
    highPriority: `*[_type == "contactInquiry" && priority == "high"] | order(_createdAt desc)`,
    byStatus: `*[_type == "contactInquiry" && status == $status] | order(_createdAt desc)`,
    byType: `*[_type == "contactInquiry" && inquiryType == $type] | order(_createdAt desc)`,
    requiresFollowUp: `*[_type == "contactInquiry" && followUpDate <= $date] | order(followUpDate asc)`
  },

  // Team member queries
  team: {
    active: `*[_type == "teamMember" && status == "active" && displaySettings.showOnWebsite == true] | order(displaySettings.displayOrder desc, name asc)`,
    featured: `*[_type == "teamMember" && displaySettings.featured == true && status == "active"] | order(displaySettings.displayOrder desc)`,
    byDepartment: `*[_type == "teamMember" && department == $department && status == "active"] | order(seniority asc, name asc)`,
    bySlug: `*[_type == "teamMember" && slug.current == $slug][0]`
  },

  // Blog post queries
  blog: {
    published: `*[_type == "blogPost" && status == "published"] | order(displaySettings.featured desc, publishedAt desc)`,
    featured: `*[_type == "blogPost" && status == "published" && displaySettings.featured == true] | order(publishedAt desc)`,
    byCategory: `*[_type == "blogPost" && status == "published" && $category in categories] | order(publishedAt desc)`,
    byBusinessType: `*[_type == "blogPost" && status == "published" && $businessType in businessType] | order(publishedAt desc)`,
    bySlug: `*[_type == "blogPost" && slug.current == $slug][0]`,
    recent: `*[_type == "blogPost" && status == "published"] | order(publishedAt desc)[0...$limit]`
  },

  // Business info queries
  business: {
    info: `*[_type == "businessInfo"][0]`,
    byType: `*[_type == "businessInfo" && businessType == $type][0]`
  }
}

// Utility function to build dynamic queries
export function buildQuery(baseQuery: string, filters: Record<string, any> = {}) {
  let query = baseQuery

  // Add dynamic filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query = query.replace(`$${key}`, JSON.stringify(value))
    }
  })

  return query
}

// Helper function for pagination
export function paginateQuery(baseQuery: string, page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit
  return `${baseQuery}[${offset}...${offset + limit - 1}]`
}

// Helper function for search
export function searchQuery(docType: string, searchTerm: string, fields: string[] = ['title', 'name']) {
  const searchConditions = fields.map(field => `${field} match "*${searchTerm}*"`).join(' || ')
  return `*[_type == "${docType}" && (${searchConditions})] | order(_score desc)`
}