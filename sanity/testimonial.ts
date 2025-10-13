import { defineType } from 'sanity'
import { MessageCircle } from 'lucide-react'

/**
 * Universal Testimonial Schema
 * Customer reviews and testimonials for automotive businesses
 * Supports different types of automotive services
 */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: MessageCircle,
  fields: [
    // Customer Information
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'customerInitials',
      title: 'Customer Initials',
      type: 'string',
      description: 'For privacy (e.g., "J.S." instead of full name)',
      validation: Rule => Rule.max(10)
    },
    {
      name: 'customerLocation',
      title: 'Customer Location',
      type: 'string',
      description: 'City or general location (optional)'
    },
    {
      name: 'customerPhoto',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Customer photo (optional, requires permission)'
    },

    // Testimonial Content
    {
      name: 'content',
      title: 'Testimonial Content',
      type: 'localizedText',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Testimonial Title/Headline',
      type: 'localizedString',
      description: 'Optional headline for the testimonial'
    },

    // Rating
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '⭐ 1 Star', value: 1 },
          { title: '⭐⭐ 2 Stars', value: 2 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 }
        ]
      }
    },

    // Service/Product Context
    {
      name: 'serviceType',
      title: 'Service/Product Type',
      type: 'string',
      options: {
        list: [
          // Vehicle Sales
          { title: 'Vehicle Purchase', value: 'vehicle-purchase' },
          { title: 'Vehicle Sale/Trade-in', value: 'vehicle-sale' },
          { title: 'Test Drive Experience', value: 'test-drive' },

          // Car Wash Services
          { title: 'Basic Car Wash', value: 'basic-wash' },
          { title: 'Premium Wash', value: 'premium-wash' },
          { title: 'Detailing Service', value: 'detailing' },
          { title: 'Interior Cleaning', value: 'interior-cleaning' },

          // Auto Services
          { title: 'Oil Change', value: 'oil-change' },
          { title: 'Brake Service', value: 'brake-service' },
          { title: 'Tire Service', value: 'tire-service' },
          { title: 'Engine Repair', value: 'engine-repair' },
          { title: 'General Maintenance', value: 'maintenance' },
          { title: 'Emergency Service', value: 'emergency' },
          { title: 'Body Work', value: 'body-work' },
          { title: 'Electrical Service', value: 'electrical' },

          // General
          { title: 'Customer Service', value: 'customer-service' },
          { title: 'Overall Experience', value: 'overall' }
        ]
      }
    },

    // Related Content References
    {
      name: 'relatedVehicle',
      title: 'Related Vehicle',
      type: 'reference',
      to: [{ type: 'vehicle' }],
      description: 'Vehicle purchased or serviced (if applicable)'
    },
    {
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Service received (if applicable)'
    },

    // Testimonial Details
    {
      name: 'date',
      title: 'Testimonial Date',
      type: 'date',
      description: 'When the testimonial was given',
      initialValue: () => new Date().toISOString().split('T')[0]
    },
    {
      name: 'source',
      title: 'Testimonial Source',
      type: 'string',
      options: {
        list: [
          { title: 'Google Reviews', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Website Form', value: 'website' },
          { title: 'Email', value: 'email' },
          { title: 'In Person', value: 'in-person' },
          { title: 'Phone Call', value: 'phone' },
          { title: 'Yelp', value: 'yelp' },
          { title: 'TripAdvisor', value: 'tripadvisor' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to original review (if from online platform)'
    },

    // Business Context
    {
      name: 'businessType',
      title: 'Business Type',
      type: 'string',
      options: {
        list: [
          { title: 'Car Dealership', value: 'dealership' },
          { title: 'Car Wash', value: 'car-wash' },
          { title: 'Auto Service Center', value: 'auto-service' },
          { title: 'Auto Detailing', value: 'detailing' },
          { title: 'Body Shop', value: 'body-shop' }
        ]
      },
      description: 'Which business this testimonial is for'
    },

    // Content Moderation
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Pending Review', value: 'pending' },
          { title: '✅ Approved', value: 'approved' },
          { title: '❌ Rejected', value: 'rejected' },
          { title: '📝 Needs Editing', value: 'needs-editing' }
        ]
      },
      initialValue: 'pending',
      validation: Rule => Rule.required()
    },
    {
      name: 'moderationNotes',
      title: 'Moderation Notes',
      type: 'text',
      description: 'Internal notes for content moderation',
      rows: 2
    },

    // Display Settings
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show prominently on homepage and marketing materials',
      initialValue: false
    },
    {
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Include in homepage testimonials section',
      initialValue: false
    },
    {
      name: 'showCustomerName',
      title: 'Show Customer Name',
      type: 'boolean',
      description: 'Display full name or use initials only',
      initialValue: true
    },
    {
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      description: 'Higher numbers appear first (0-100)',
      validation: Rule => Rule.min(0).max(100),
      initialValue: 50
    },

    // Additional Media
    {
      name: 'beforeAfterImages',
      title: 'Before/After Images',
      type: 'object',
      fields: [
        {
          name: 'before',
          title: 'Before Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'after',
          title: 'After Image',
          type: 'image',
          options: { hotspot: true }
        }
      ],
      description: 'Before/after photos for services like detailing or repairs'
    },

    // Contact Permission
    {
      name: 'contactPermission',
      title: 'Contact Permission',
      type: 'object',
      fields: [
        {
          name: 'allowContact',
          title: 'Customer Allows Contact',
          type: 'boolean',
          description: 'Customer permits being contacted for references',
          initialValue: false
        },
        {
          name: 'email',
          title: 'Customer Email',
          type: 'string',
          hidden: ({ parent }) => !parent?.allowContact
        },
        {
          name: 'phone',
          title: 'Customer Phone',
          type: 'string',
          hidden: ({ parent }) => !parent?.allowContact
        }
      ]
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
      customerName: 'customerName',
      customerInitials: 'customerInitials',
      showCustomerName: 'showCustomerName',
      rating: 'rating',
      serviceType: 'serviceType',
      status: 'status',
      featured: 'featured',
      content: 'content.fi',
      media: 'customerPhoto'
    },
    prepare(selection) {
      const {
        customerName,
        customerInitials,
        showCustomerName,
        rating,
        serviceType,
        status,
        featured,
        content
      } = selection

      const stars = '⭐'.repeat(rating || 0)
      const statusEmoji = {
        pending: '⏳',
        approved: '✅',
        rejected: '❌',
        'needs-editing': '📝'
      }

      const displayName = showCustomerName ? customerName : (customerInitials || 'Anonymous')
      const featuredFlag = featured ? '🌟 ' : ''

      return {
        title: `${featuredFlag}${displayName} ${stars}`,
        subtitle: `${statusEmoji[status as keyof typeof statusEmoji]} ${serviceType || 'General'} • ${content?.substring(0, 50)}...`,
        media: selection.media
      }
    }
  },

  // Ordering options
  orderings: [
    {
      title: 'Priority (Featured First)',
      name: 'priority',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'priority', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Rating (Highest First)',
      name: 'ratingDesc',
      by: [
        { field: 'rating', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [
        { field: 'date', direction: 'desc' }
      ]
    },
    {
      title: 'Status, then Rating',
      name: 'statusRating',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'rating', direction: 'desc' }
      ]
    },
    {
      title: 'Service Type',
      name: 'serviceType',
      by: [
        { field: 'serviceType', direction: 'asc' },
        { field: 'rating', direction: 'desc' }
      ]
    }
  ]
})