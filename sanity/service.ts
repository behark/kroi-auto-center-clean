import { defineType } from 'sanity'
import { Wrench } from 'lucide-react'

/**
 * Universal Service Schema
 * Supports car wash services, maintenance, repairs, detailing, etc.
 * Multi-language support with Finnish/English
 */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: Wrench,
  fields: [
    // Basic Information
    {
      name: 'name',
      title: 'Service Name',
      type: 'localizedString',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name.fi',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },

    // Service Details
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: Rule => Rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localizedString',
      description: 'Brief description for service cards and listings'
    },

    // Pricing
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Pricing Type',
          type: 'string',
          options: {
            list: [
              { title: 'Fixed Price', value: 'fixed' },
              { title: 'Starting From', value: 'starting' },
              { title: 'Price Range', value: 'range' },
              { title: 'Quote Required', value: 'quote' },
              { title: 'Free', value: 'free' }
            ]
          },
          validation: Rule => Rule.required()
        },
        {
          name: 'price',
          title: 'Price (EUR)',
          type: 'number',
          validation: Rule => Rule.min(0),
          hidden: ({ parent }) => parent?.type === 'quote' || parent?.type === 'free'
        },
        {
          name: 'priceMax',
          title: 'Maximum Price (EUR)',
          type: 'number',
          validation: Rule => Rule.min(0),
          hidden: ({ parent }) => parent?.type !== 'range'
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'EUR',
          options: {
            list: ['EUR', 'USD', 'SEK', 'NOK']
          }
        }
      ]
    },

    // Service Specifications
    {
      name: 'duration',
      title: 'Duration',
      type: 'object',
      fields: [
        {
          name: 'value',
          title: 'Duration Value',
          type: 'number',
          validation: Rule => Rule.min(1)
        },
        {
          name: 'unit',
          title: 'Duration Unit',
          type: 'string',
          options: {
            list: [
              { title: 'Minutes', value: 'minutes' },
              { title: 'Hours', value: 'hours' },
              { title: 'Days', value: 'days' },
              { title: 'Weeks', value: 'weeks' }
            ]
          },
          initialValue: 'minutes'
        }
      ]
    },

    // Service Category
    {
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          // Car Wash Categories
          { title: 'Basic Wash', value: 'basic-wash' },
          { title: 'Premium Wash', value: 'premium-wash' },
          { title: 'Detailing', value: 'detailing' },
          { title: 'Interior Cleaning', value: 'interior' },
          { title: 'Exterior Cleaning', value: 'exterior' },
          { title: 'Wax & Polish', value: 'wax-polish' },

          // Auto Service Categories
          { title: 'Oil Change', value: 'oil-change' },
          { title: 'Brake Service', value: 'brake-service' },
          { title: 'Tire Service', value: 'tire-service' },
          { title: 'Engine Repair', value: 'engine-repair' },
          { title: 'Transmission', value: 'transmission' },
          { title: 'Electrical', value: 'electrical' },
          { title: 'Air Conditioning', value: 'ac-service' },
          { title: 'Inspection', value: 'inspection' },
          { title: 'Diagnostics', value: 'diagnostics' },
          { title: 'Body Work', value: 'body-work' },

          // General
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Emergency', value: 'emergency' },
          { title: 'Additional Services', value: 'additional' }
        ]
      },
      validation: Rule => Rule.required()
    },

    // Business Type (for filtering)
    {
      name: 'businessType',
      title: 'Business Type',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Car Dealership', value: 'dealership' },
          { title: 'Car Wash', value: 'car-wash' },
          { title: 'Auto Service Center', value: 'auto-service' },
          { title: 'Auto Detailing', value: 'detailing' },
          { title: 'Body Shop', value: 'body-shop' }
        ]
      },
      description: 'Which types of automotive businesses offer this service'
    },

    // Capacity and Booking
    {
      name: 'capacity',
      title: 'Service Capacity',
      type: 'object',
      fields: [
        {
          name: 'maxVehicles',
          title: 'Max Vehicles per Session',
          type: 'number',
          validation: Rule => Rule.min(1)
        },
        {
          name: 'bookingRequired',
          title: 'Booking Required',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'advanceBookingDays',
          title: 'Advance Booking (Days)',
          type: 'number',
          description: 'How many days in advance can customers book',
          hidden: ({ parent }) => !parent?.bookingRequired
        }
      ]
    },

    // Media
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'gallery',
      title: 'Service Gallery',
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
              type: 'localizedString'
            }
          ]
        }
      ]
    },

    // Features and Benefits
    {
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'localizedString'
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'localizedString'
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (optional)'
            }
          ]
        }
      ]
    },

    // Service Process/Steps
    {
      name: 'process',
      title: 'Service Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step Number',
              type: 'number'
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'localizedString'
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'localizedText'
            },
            {
              name: 'duration',
              title: 'Step Duration (minutes)',
              type: 'number'
            }
          ]
        }
      ]
    },

    // Availability and Status
    {
      name: 'availability',
      title: 'Availability',
      type: 'object',
      fields: [
        {
          name: 'isActive',
          title: 'Service Active',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'seasonal',
          title: 'Seasonal Service',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'seasonStart',
          title: 'Season Start (Month)',
          type: 'number',
          validation: Rule => Rule.min(1).max(12),
          hidden: ({ parent }) => !parent?.seasonal
        },
        {
          name: 'seasonEnd',
          title: 'Season End (Month)',
          type: 'number',
          validation: Rule => Rule.min(1).max(12),
          hidden: ({ parent }) => !parent?.seasonal
        }
      ]
    },

    // Marketing
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show this service prominently on the homepage',
      initialValue: false
    },
    {
      name: 'popular',
      title: 'Popular Service',
      type: 'boolean',
      description: 'Mark as a popular/bestselling service',
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
      title: 'name.fi',
      titleEn: 'name.en',
      category: 'category',
      price: 'pricing.price',
      priceType: 'pricing.type',
      currency: 'pricing.currency',
      isActive: 'availability.isActive',
      media: 'mainImage'
    },
    prepare(selection) {
      const { title, titleEn, category, price, priceType, currency, isActive } = selection

      let priceDisplay = 'Quote Required'
      if (priceType === 'free') {
        priceDisplay = 'Free'
      } else if (priceType === 'fixed' && price) {
        priceDisplay = `${price}${currency || 'EUR'}`
      } else if (priceType === 'starting' && price) {
        priceDisplay = `From ${price}${currency || 'EUR'}`
      }

      const statusEmoji = isActive ? '✅' : '❌'
      const displayTitle = title || titleEn || 'Unnamed Service'

      return {
        title: `${statusEmoji} ${displayTitle}`,
        subtitle: `${category || 'General'} • ${priceDisplay}`,
        media: selection.media
      }
    }
  },

  // Ordering options
  orderings: [
    {
      title: 'Category, then Priority',
      name: 'categoryPriority',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'priority', direction: 'desc' }
      ]
    },
    {
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [
        { field: 'pricing.price', direction: 'asc' }
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
      title: 'Alphabetical (Finnish)',
      name: 'nameAsc',
      by: [
        { field: 'name.fi', direction: 'asc' }
      ]
    }
  ]
})