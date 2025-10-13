import { defineType } from 'sanity'
import { Car } from 'lucide-react'

/**
 * Universal Vehicle Schema
 * Comprehensive schema for automotive dealerships
 * Supports new, used, and certified pre-owned vehicles
 */
export const vehicle = defineType({
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  icon: Car,
  fields: [
    // Basic Information
    {
      name: 'title',
      title: 'Vehicle Title',
      type: 'string',
      description: 'Display name for the vehicle (e.g., "2024 BMW X5 xDrive40i")',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96)
      },
      validation: Rule => Rule.required()
    },

    // Vehicle Details
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota',
          'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai',
          'Kia', 'Mazda', 'Subaru', 'Volvo', 'Porsche', 'Tesla',
          'Peugeot', 'Citroën', 'Renault', 'Skoda', 'Seat', 'Other'
        ]
      }
    },
    {
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required()
        .min(1990)
        .max(new Date().getFullYear() + 2)
    },
    {
      name: 'price',
      title: 'Price (EUR)',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'negotiable',
      title: 'Price Negotiable',
      type: 'boolean',
      initialValue: false
    },

    // Vehicle Specifications
    {
      name: 'mileage',
      title: 'Mileage (km)',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: [
          { title: 'Gasoline', value: 'gasoline' },
          { title: 'Diesel', value: 'diesel' },
          { title: 'Electric', value: 'electric' },
          { title: 'Hybrid', value: 'hybrid' },
          { title: 'Plug-in Hybrid', value: 'plugin-hybrid' },
          { title: 'Natural Gas', value: 'natural-gas' },
          { title: 'Hydrogen', value: 'hydrogen' }
        ]
      }
    },
    {
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Automatic', value: 'automatic' },
          { title: 'CVT', value: 'cvt' },
          { title: 'Semi-Automatic', value: 'semi-automatic' }
        ]
      }
    },
    {
      name: 'drivetrain',
      title: 'Drivetrain',
      type: 'string',
      options: {
        list: [
          { title: 'Front-Wheel Drive (FWD)', value: 'fwd' },
          { title: 'Rear-Wheel Drive (RWD)', value: 'rwd' },
          { title: 'All-Wheel Drive (AWD)', value: 'awd' },
          { title: '4-Wheel Drive (4WD)', value: '4wd' }
        ]
      }
    },
    {
      name: 'engine',
      title: 'Engine',
      type: 'string',
      description: 'Engine specification (e.g., "2.0L Turbo 4-cylinder")'
    },
    {
      name: 'color',
      title: 'Exterior Color',
      type: 'string'
    },
    {
      name: 'interiorColor',
      title: 'Interior Color',
      type: 'string'
    },

    // Vehicle Category and Condition
    {
      name: 'category',
      title: 'Vehicle Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sedan', value: 'sedan' },
          { title: 'SUV', value: 'suv' },
          { title: 'Hatchback', value: 'hatchback' },
          { title: 'Wagon', value: 'wagon' },
          { title: 'Coupe', value: 'coupe' },
          { title: 'Convertible', value: 'convertible' },
          { title: 'Pickup Truck', value: 'pickup' },
          { title: 'Van', value: 'van' },
          { title: 'Motorcycle', value: 'motorcycle' }
        ]
      }
    },
    {
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Used', value: 'used' },
          { title: 'Certified Pre-Owned', value: 'certified' }
        ]
      },
      validation: Rule => Rule.required()
    },

    // Images and Media
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        }
      ]
    },

    // Content
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features and equipment'
    },
    {
      name: 'specifications',
      title: 'Detailed Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  'Engine & Performance',
                  'Dimensions',
                  'Safety Features',
                  'Technology',
                  'Comfort & Convenience',
                  'Exterior Features',
                  'Interior Features'
                ]
              }
            },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' }
          ]
        }
      ]
    },

    // Business Logic
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'In Transit', value: 'in-transit' },
          { title: 'Service', value: 'service' }
        ]
      },
      initialValue: 'available'
    },
    {
      name: 'featured',
      title: 'Featured Vehicle',
      type: 'boolean',
      description: 'Show this vehicle prominently on the homepage',
      initialValue: false
    },
    {
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      description: 'Higher numbers appear first (0-100)',
      validation: Rule => Rule.min(0).max(100),
      initialValue: 50
    },

    // Contact Information
    {
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string',
      description: 'Salesperson or contact for this vehicle'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the vehicle is located'
    },

    // SEO
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'title',
      brand: 'brand',
      model: 'model',
      year: 'year',
      price: 'price',
      condition: 'condition',
      media: 'mainImage',
      status: 'status'
    },
    prepare(selection) {
      const { title, brand, model, year, price, condition, status } = selection
      const statusEmoji = {
        available: '✅',
        sold: '❌',
        reserved: '⏳',
        'in-transit': '🚚',
        service: '🔧'
      }

      return {
        title: title || `${year} ${brand} ${model}`,
        subtitle: `${condition} • €${price?.toLocaleString()} • ${statusEmoji[status as keyof typeof statusEmoji] || ''} ${status}`,
        media: selection.media
      }
    }
  },

  // Ordering options
  orderings: [
    {
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [
        { field: 'price', direction: 'asc' }
      ]
    },
    {
      title: 'Price (High to Low)',
      name: 'priceDesc',
      by: [
        { field: 'price', direction: 'desc' }
      ]
    },
    {
      title: 'Year (Newest First)',
      name: 'yearDesc',
      by: [
        { field: 'year', direction: 'desc' }
      ]
    },
    {
      title: 'Recently Added',
      name: 'dateDesc',
      by: [
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Brand A-Z',
      name: 'brandAsc',
      by: [
        { field: 'brand', direction: 'asc' },
        { field: 'model', direction: 'asc' }
      ]
    },
    {
      title: 'Priority',
      name: 'priority',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    }
  ]
})