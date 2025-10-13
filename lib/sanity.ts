import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2t31xge',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// GROQ queries for professional automotive data
export const queries = {
  // Business Information for Kroi Auto Center
  businessInfo: `*[_type == "businessInfo" && (_id == "kroi-auto-center-business")][0] {
    _id,
    name,
    description,
    address,
    phone,
    email,
    hours,
    services,
    languages,
    certifications,
    yearEstablished,
    seo
  }`,

  // Team Members for Kroi Auto Center
  teamMembers: `*[_type == "teamMember" && project->name.fi match "Kroi Auto Center"] | order(order asc) {
    _id,
    name,
    role,
    email,
    phone,
    experience,
    languages,
    specialties,
    image,
    bio
  }`,

  // Services for Kroi Auto Center
  services: `*[_type == "service" && project->name.fi match "Kroi Auto Center"] | order(order asc) {
    _id,
    name,
    description,
    price,
    duration,
    features,
    availability,
    bookingRequired,
    category
  }`,

  // All vehicles with fallback for missing images
  allVehicles: `*[_type == "vehicle"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    brand,
    model,
    year,
    price,
    negotiable,
    mileage,
    fuelType,
    transmission,
    drivetrain,
    engine,
    color,
    condition,
    category,
    mainImage,
    gallery,
    description,
    features,
    specifications,
    featured,
    _createdAt
  }`,

  // Featured vehicles for homepage
  featuredVehicles: `*[_type == "vehicle" && featured == true] | order(_createdAt desc)[0...6] {
    _id,
    title,
    slug,
    brand,
    model,
    year,
    price,
    negotiable,
    mileage,
    fuelType,
    transmission,
    mainImage,
    description
  }`,

  // Single vehicle by slug
  vehicleBySlug: `*[_type == "vehicle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    brand,
    model,
    year,
    price,
    negotiable,
    mileage,
    fuelType,
    transmission,
    drivetrain,
    engine,
    color,
    interiorColor,
    condition,
    category,
    mainImage,
    gallery,
    description,
    features,
    specifications,
    _createdAt
  }`,

  // Vehicles by brand
  vehiclesByBrand: `*[_type == "vehicle" && brand == $brand] | order(_createdAt desc) {
    _id,
    title,
    slug,
    brand,
    model,
    year,
    price,
    mileage,
    fuelType,
    transmission,
    mainImage,
    description
  }`,

  // All testimonials
  testimonials: `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    customerName,
    rating,
    review,
    vehiclePurchased,
    image,
    _createdAt
  }`,

  // Featured testimonials
  featuredTestimonials: `*[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...3] {
    _id,
    customerName,
    rating,
    review,
    vehiclePurchased,
    image
  }`
}