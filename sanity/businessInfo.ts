import { defineType } from 'sanity'
import { Building } from 'lucide-react'

/**
 * Business Information Schema
 * Company details, hours, locations for automotive businesses
 */
export const businessInfo = defineType({
  name: 'businessInfo',
  title: 'Business Information',
  type: 'document',
  icon: Building,
  fields: [
    // Basic Business Information
    {
      name: 'businessName',
      title: 'Business Name',
      type: 'localizedString',
      validation: Rule => Rule.required()
    },
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
      validation: Rule => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Business Tagline',
      type: 'localizedString',
      description: 'Short marketing tagline'
    },
    {
      name: 'description',
      title: 'Business Description',
      type: 'localizedText',
      description: 'About the business'
    },

    // Contact Information
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Primary Phone',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'email',
          title: 'Primary Email',
          type: 'string',
          validation: Rule => Rule.required().email()
        },
        {
          name: 'website',
          title: 'Website URL',
          type: 'url'
        },
        {
          name: 'emergencyPhone',
          title: 'Emergency/After Hours Phone',
          type: 'string'
        }
      ]
    },

    // Location Information
    {
      name: 'locations',
      title: 'Business Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Location Name',
              type: 'localizedString'
            },
            {
              name: 'isPrimary',
              title: 'Primary Location',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'address',
              title: 'Address',
              type: 'object',
              fields: [
                { name: 'street', title: 'Street Address', type: 'string' },
                { name: 'city', title: 'City', type: 'string' },
                { name: 'postalCode', title: 'Postal Code', type: 'string' },
                { name: 'country', title: 'Country', type: 'string', initialValue: 'Finland' }
              ]
            },
            {
              name: 'coordinates',
              title: 'GPS Coordinates',
              type: 'object',
              fields: [
                { name: 'lat', title: 'Latitude', type: 'number' },
                { name: 'lng', title: 'Longitude', type: 'number' }
              ]
            },
            {
              name: 'phone',
              title: 'Location Phone',
              type: 'string'
            },
            {
              name: 'email',
              title: 'Location Email',
              type: 'string'
            }
          ]
        }
      ]
    },

    // Business Hours
    {
      name: 'hours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        {
          name: 'monday',
          title: 'Monday',
          type: 'object',
          fields: [
            { name: 'open', title: 'Opening Time', type: 'string' },
            { name: 'close', title: 'Closing Time', type: 'string' },
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: false }
          ]
        },
        {
          name: 'tuesday',
          title: 'Tuesday',
          type: 'object',
          fields: [
            { name: 'open', title: 'Opening Time', type: 'string' },
            { name: 'close', title: 'Closing Time', type: 'string' },
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: false }
          ]
        },
        {
          name: 'wednesday',
          title: 'Wednesday',
          type: 'object',
          fields: [
            { name: 'open', title: 'Opening Time', type: 'string' },
            { name: 'close', title: 'Closing Time', type: 'string' },
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: false }
          ]
        },
        {
          name: 'thursday',
          title: 'Thursday',
          type: 'object',
          fields: [
            { name: 'open', title: 'Opening Time', type: 'string' },
            { name: 'close', title: 'Closing Time', type: 'string' },
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: false }
          ]
        },
        {
          name: 'friday',
          title: 'Friday',
          type: 'object',
          fields: [
            { name: 'open', title: 'Opening Time', type: 'string' },
            { name: 'close', title: 'Closing Time', type: 'string' },
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: false }
          ]
        },
        {
          name: 'saturday',
          title: 'Saturday',
          type: 'object',
          fields: [
            { name: 'open', title: 'Opening Time', type: 'string' },
            { name: 'close', title: 'Closing Time', type: 'string' },
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: false }
          ]
        },
        {
          name: 'sunday',
          title: 'Sunday',
          type: 'object',
          fields: [
            { name: 'open', title: 'Opening Time', type: 'string' },
            { name: 'close', title: 'Closing Time', type: 'string' },
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: true }
          ]
        },
        {
          name: 'holidayHours',
          title: 'Holiday Hours Note',
          type: 'localizedText',
          description: 'Special holiday hours information'
        }
      ]
    },

    // Social Media
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'tiktok', title: 'TikTok URL', type: 'url' }
      ]
    },

    // Legal Information
    {
      name: 'legal',
      title: 'Legal Information',
      type: 'object',
      fields: [
        {
          name: 'businessId',
          title: 'Business ID (Y-tunnus)',
          type: 'string'
        },
        {
          name: 'vatNumber',
          title: 'VAT Number',
          type: 'string'
        },
        {
          name: 'registeredName',
          title: 'Registered Business Name',
          type: 'string'
        },
        {
          name: 'licenses',
          title: 'Licenses & Certifications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'License Name', type: 'string' },
                { name: 'number', title: 'License Number', type: 'string' },
                { name: 'issuer', title: 'Issuing Authority', type: 'string' },
                { name: 'expiryDate', title: 'Expiry Date', type: 'date' }
              ]
            }
          ]
        }
      ]
    },

    // Services Offered (for filtering)
    {
      name: 'servicesOffered',
      title: 'Services Offered',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'New Car Sales', value: 'new-cars' },
          { title: 'Used Car Sales', value: 'used-cars' },
          { title: 'Car Financing', value: 'financing' },
          { title: 'Trade-ins', value: 'trade-ins' },
          { title: 'Leasing', value: 'leasing' },
          { title: 'Car Wash', value: 'car-wash' },
          { title: 'Auto Detailing', value: 'detailing' },
          { title: 'Oil Changes', value: 'oil-change' },
          { title: 'Brake Service', value: 'brakes' },
          { title: 'Tire Service', value: 'tires' },
          { title: 'Engine Repair', value: 'engine' },
          { title: 'Transmission Repair', value: 'transmission' },
          { title: 'Electrical Repair', value: 'electrical' },
          { title: 'Body Work', value: 'body-work' },
          { title: 'Paint Services', value: 'paint' },
          { title: 'Towing', value: 'towing' },
          { title: '24/7 Emergency Service', value: 'emergency' }
        ]
      }
    },

    // Payment Methods
    {
      name: 'paymentMethods',
      title: 'Accepted Payment Methods',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Cash', value: 'cash' },
          { title: 'Credit Cards', value: 'credit-cards' },
          { title: 'Debit Cards', value: 'debit-cards' },
          { title: 'Bank Transfer', value: 'bank-transfer' },
          { title: 'Mobile Pay', value: 'mobile-pay' },
          { title: 'Financing Available', value: 'financing' },
          { title: 'Installment Plans', value: 'installments' }
        ]
      }
    },

    // Languages Spoken
    {
      name: 'languagesSpoken',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Finnish', value: 'fi' },
          { title: 'English', value: 'en' },
          { title: 'Swedish', value: 'sv' },
          { title: 'Russian', value: 'ru' },
          { title: 'Estonian', value: 'et' },
          { title: 'German', value: 'de' },
          { title: 'French', value: 'fr' }
        ]
      }
    },

    // Awards and Certifications
    {
      name: 'awards',
      title: 'Awards & Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Award Title', type: 'localizedString' },
            { name: 'issuer', title: 'Issuing Organization', type: 'string' },
            { name: 'year', title: 'Year Received', type: 'number' },
            { name: 'description', title: 'Description', type: 'localizedText' },
            { name: 'logo', title: 'Award Logo', type: 'image' }
          ]
        }
      ]
    },

    // Company Media
    {
      name: 'media',
      title: 'Company Media',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Company Logo',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'logoLight',
          title: 'Logo (Light Version)',
          type: 'image',
          options: { hotspot: true },
          description: 'Logo for dark backgrounds'
        },
        {
          name: 'favicon',
          title: 'Favicon',
          type: 'image'
        },
        {
          name: 'heroImage',
          title: 'Hero/Banner Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'aboutImage',
          title: 'About Us Image',
          type: 'image',
          options: { hotspot: true }
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

  preview: {
    select: {
      title: 'businessName.fi',
      subtitle: 'businessType',
      media: 'media.logo'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Business Information',
        subtitle: subtitle || 'Unknown Business Type',
        media: selection.media
      }
    }
  }
})