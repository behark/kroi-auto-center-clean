'use client'

import { client, queries } from '../../lib/sanity'

// Business Info Service
export async function getBusinessInfo() {
  try {
    const data = await client.fetch(queries.businessInfo)

    if (!data) {
      console.warn('No business info found in Sanity, using fallback')
      return null
    }

    // Transform Sanity data to our component format
    return {
      name: data.name,
      type: 'service-center' as const,
      description: data.description,
      established: data.yearEstablished,
      address: {
        street: data.address?.street || '',
        city: data.address?.city || '',
        country: data.address?.country || '',
        zipCode: data.address?.zipCode || ''
      },
      contact: {
        phone: data.phone || '',
        email: data.email || '',
        website: data.address?.website || ''
      },
      hours: data.hours || {
        monday: { open: '08:00', close: '17:00' },
        tuesday: { open: '08:00', close: '17:00' },
        wednesday: { open: '08:00', close: '17:00' },
        thursday: { open: '08:00', close: '17:00' },
        friday: { open: '08:00', close: '17:00' },
        saturday: { open: '09:00', close: '15:00' },
        sunday: { closed: true }
      },
      certifications: data.certifications || [],
      languages: data.languages || [],
      social: {
        facebook: data.social?.facebook,
        instagram: data.social?.instagram,
        twitter: data.social?.twitter,
        linkedin: data.social?.linkedin
      }
    }
  } catch (error) {
    console.error('Error fetching business info:', error)
    return null
  }
}

// Team Members Service
export async function getTeamMembers() {
  try {
    const data = await client.fetch(queries.teamMembers)

    return data?.map((member: any) => ({
      id: member._id,
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
      experience: member.experience ? `${member.experience} vuotta kokemusta` : '',
      languages: member.languages || [],
      specialties: member.specialties || [],
      image: member.image,
      bio: member.bio
    })) || []
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

// Services Service
export async function getServices() {
  try {
    const data = await client.fetch(queries.services)

    return data?.map((service: any) => ({
      id: service._id,
      title: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      features: service.features || [],
      category: service.category || 'maintenance',
      businessTypes: ['service-center'] as const,
      popular: service.bookingRequired || false
    })) || []
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

// Vehicle Service (for future integration)
export async function getVehicles() {
  try {
    const data = await client.fetch(queries.allVehicles)

    return data?.map((vehicle: any) => ({
      id: vehicle._id,
      slug: vehicle.slug?.current || '',
      make: vehicle.brand || '',
      model: vehicle.model || '',
      year: vehicle.year || 0,
      price: vehicle.price || 0,
      mileage: vehicle.mileage || 0,
      fuelType: vehicle.fuelType || 'Gasoline',
      transmission: vehicle.transmission || 'Manual',
      bodyType: vehicle.category || 'Sedan',
      color: vehicle.color || '',
      engineSize: vehicle.engine || '',
      drivetrain: vehicle.drivetrain || 'FWD',
      features: vehicle.features || [],
      images: vehicle.gallery || [vehicle.mainImage].filter(Boolean),
      description: vehicle.description || '',
      featured: vehicle.featured || false,
      status: 'Available' as const,
      condition: 'Used' as const
    })) || []
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }
}

// Featured Vehicles Service
export async function getFeaturedVehicles() {
  try {
    const data = await client.fetch(queries.featuredVehicles)

    return data?.map((vehicle: any) => ({
      id: vehicle._id,
      slug: vehicle.slug?.current || '',
      make: vehicle.brand || '',
      model: vehicle.model || '',
      year: vehicle.year || 0,
      price: vehicle.price || 0,
      mileage: vehicle.mileage || 0,
      fuelType: vehicle.fuelType || 'Gasoline',
      transmission: vehicle.transmission || 'Manual',
      images: [vehicle.mainImage].filter(Boolean),
      description: vehicle.description || '',
      featured: true
    })) || []
  } catch (error) {
    console.error('Error fetching featured vehicles:', error)
    return []
  }
}

// Testimonials Service (for future integration)
export async function getTestimonials() {
  try {
    const data = await client.fetch(queries.testimonials)

    return data?.map((testimonial: any) => ({
      id: testimonial._id,
      name: testimonial.customerName,
      location: '', // Add location if available in schema
      rating: testimonial.rating || 5,
      text: testimonial.review,
      date: testimonial._createdAt,
      verified: true,
      businessType: 'service-center' as const,
      vehiclePurchased: testimonial.vehiclePurchased
    })) || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}