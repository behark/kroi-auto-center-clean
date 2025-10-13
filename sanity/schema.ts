import { type SchemaTypeDefinition } from 'sanity'

// Car schema - replaces the massive Prisma car model
const car = {
  name: 'car',
  title: 'Car',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Car Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1990).max(new Date().getFullYear() + 1)
    },
    {
      name: 'price',
      title: 'Price (EUR)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive()
    },
    {
      name: 'mileage',
      title: 'Mileage (km)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'fuel',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: [
          { title: 'Gasoline', value: 'gasoline' },
          { title: 'Diesel', value: 'diesel' },
          { title: 'Electric', value: 'electric' },
          { title: 'Hybrid', value: 'hybrid' },
          { title: 'Plug-in Hybrid', value: 'plugin-hybrid' }
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
          { title: 'CVT', value: 'cvt' }
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
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sedan', value: 'sedan' },
          { title: 'SUV', value: 'suv' },
          { title: 'Hatchback', value: 'hatchback' },
          { title: 'Convertible', value: 'convertible' },
          { title: 'Wagon', value: 'wagon' },
          { title: 'Coupe', value: 'coupe' }
        ]
      }
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' }
          ]
        }
      ]
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand',
      media: 'image'
    }
  }
}

// Contact inquiry schema - replaces complex Prisma contact models
const contactInquiry = {
  name: 'contactInquiry',
  title: 'Contact Inquiry',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'car',
      title: 'Related Car',
      type: 'reference',
      to: [{ type: 'car' }]
    },
    {
      name: 'type',
      title: 'Inquiry Type',
      type: 'string',
      options: {
        list: [
          { title: 'General Inquiry', value: 'general' },
          { title: 'Car Inquiry', value: 'car_inquiry' },
          { title: 'Test Drive', value: 'test_drive' },
          { title: 'Trade In', value: 'trade_in' }
        ]
      },
      initialValue: 'general'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Resolved', value: 'resolved' }
        ]
      },
      initialValue: 'new'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'type'
    }
  }
}

// Testimonial schema - simplified from complex Prisma testimonial models
const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5)
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'carPurchased',
      title: 'Car Purchased',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'rating',
      media: 'image'
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: `${subtitle}/5 stars`
      }
    }
  }
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car, contactInquiry, testimonial],
}