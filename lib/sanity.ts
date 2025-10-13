import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// GROQ queries for fetching data
export const queries = {
  // Get all cars with basic info
  allCars: `*[_type == "car" && available == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    brand,
    model,
    year,
    price,
    mileage,
    fuel,
    transmission,
    condition,
    category,
    image,
    description,
    featured
  }`,

  // Get featured cars for homepage
  featuredCars: `*[_type == "car" && available == true && featured == true] | order(_createdAt desc)[0...6] {
    _id,
    name,
    slug,
    brand,
    model,
    year,
    price,
    mileage,
    fuel,
    transmission,
    image,
    description
  }`,

  // Get single car by slug
  carBySlug: `*[_type == "car" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    brand,
    model,
    year,
    price,
    mileage,
    fuel,
    transmission,
    condition,
    category,
    image,
    gallery,
    description,
    features,
    specifications,
    available
  }`,

  // Get cars by brand
  carsByBrand: `*[_type == "car" && available == true && brand == $brand] | order(_createdAt desc) {
    _id,
    name,
    slug,
    brand,
    model,
    year,
    price,
    mileage,
    fuel,
    transmission,
    image,
    description
  }`,

  // Get cars by category
  carsByCategory: `*[_type == "car" && available == true && category == $category] | order(_createdAt desc) {
    _id,
    name,
    slug,
    brand,
    model,
    year,
    price,
    mileage,
    fuel,
    transmission,
    image,
    description
  }`,

  // Get all testimonials
  testimonials: `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    rating,
    comment,
    carPurchased,
    image,
    _createdAt
  }`,

  // Get featured testimonials
  featuredTestimonials: `*[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...3] {
    _id,
    name,
    rating,
    comment,
    carPurchased,
    image
  }`
}