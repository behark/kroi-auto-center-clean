import { defineType } from 'sanity'
import { Users } from 'lucide-react'

/**
 * Team Member Schema
 * Staff profiles for automotive businesses
 */
export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: Users,
  fields: [
    // Personal Information
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string'
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },

    // Professional Information
    {
      name: 'position',
      title: 'Job Title/Position',
      type: 'localizedString',
      validation: Rule => Rule.required()
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Sales', value: 'sales' },
          { title: 'Service', value: 'service' },
          { title: 'Management', value: 'management' },
          { title: 'Finance', value: 'finance' },
          { title: 'Parts', value: 'parts' },
          { title: 'Body Shop', value: 'body-shop' },
          { title: 'Detailing', value: 'detailing' },
          { title: 'Car Wash', value: 'car-wash' },
          { title: 'Reception', value: 'reception' },
          { title: 'Technical', value: 'technical' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Administration', value: 'administration' }
        ]
      }
    },
    {
      name: 'seniority',
      title: 'Seniority Level',
      type: 'string',
      options: {
        list: [
          { title: 'Owner/President', value: 'owner' },
          { title: 'Manager', value: 'manager' },
          { title: 'Senior Staff', value: 'senior' },
          { title: 'Staff', value: 'staff' },
          { title: 'Junior/Trainee', value: 'junior' }
        ]
      }
    },

    // Bio and Description
    {
      name: 'bio',
      title: 'Biography',
      type: 'localizedText',
      description: 'Professional background and experience'
    },
    {
      name: 'shortBio',
      title: 'Short Bio',
      type: 'localizedString',
      description: 'Brief description for team cards'
    },

    // Contact Information
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Work Email',
          type: 'string',
          validation: Rule => Rule.email()
        },
        {
          name: 'phone',
          title: 'Work Phone',
          type: 'string'
        },
        {
          name: 'extension',
          title: 'Phone Extension',
          type: 'string'
        },
        {
          name: 'directLine',
          title: 'Direct Line',
          type: 'string'
        },
        {
          name: 'mobile',
          title: 'Mobile Phone',
          type: 'string',
          description: 'Only if publicly listed'
        }
      ]
    },

    // Professional Details
    {
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Total years in automotive industry'
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'When they joined the company'
    },
    {
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          // Sales Specialties
          { title: 'New Car Sales', value: 'new-car-sales' },
          { title: 'Used Car Sales', value: 'used-car-sales' },
          { title: 'Luxury Vehicles', value: 'luxury-vehicles' },
          { title: 'Commercial Vehicles', value: 'commercial-vehicles' },
          { title: 'Electric Vehicles', value: 'electric-vehicles' },
          { title: 'Financing & Leasing', value: 'financing' },

          // Service Specialties
          { title: 'Engine Repair', value: 'engine-repair' },
          { title: 'Transmission', value: 'transmission' },
          { title: 'Brake Systems', value: 'brakes' },
          { title: 'Electrical Systems', value: 'electrical' },
          { title: 'Air Conditioning', value: 'ac-systems' },
          { title: 'Diagnostics', value: 'diagnostics' },
          { title: 'Hybrid/Electric Vehicles', value: 'hybrid-electric' },

          // Car Wash/Detailing
          { title: 'Paint Correction', value: 'paint-correction' },
          { title: 'Ceramic Coating', value: 'ceramic-coating' },
          { title: 'Interior Detailing', value: 'interior-detailing' },
          { title: 'Paint Protection', value: 'paint-protection' },

          // General
          { title: 'Customer Service', value: 'customer-service' },
          { title: 'Parts & Accessories', value: 'parts' },
          { title: 'Warranty Claims', value: 'warranty' },
          { title: 'Insurance Claims', value: 'insurance' }
        ]
      }
    },

    // Certifications and Qualifications
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Certification Name', type: 'string' },
            { name: 'issuer', title: 'Issuing Organization', type: 'string' },
            { name: 'dateReceived', title: 'Date Received', type: 'date' },
            { name: 'expiryDate', title: 'Expiry Date', type: 'date' },
            { name: 'credentialId', title: 'Credential ID', type: 'string' },
            { name: 'logo', title: 'Certification Logo', type: 'image' }
          ]
        }
      ]
    },

    // Languages
    {
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'Finnish', value: 'fi' },
                  { title: 'English', value: 'en' },
                  { title: 'Swedish', value: 'sv' },
                  { title: 'Russian', value: 'ru' },
                  { title: 'Estonian', value: 'et' },
                  { title: 'German', value: 'de' },
                  { title: 'French', value: 'fr' },
                  { title: 'Spanish', value: 'es' }
                ]
              }
            },
            {
              name: 'level',
              title: 'Proficiency Level',
              type: 'string',
              options: {
                list: [
                  { title: 'Native', value: 'native' },
                  { title: 'Fluent', value: 'fluent' },
                  { title: 'Conversational', value: 'conversational' },
                  { title: 'Basic', value: 'basic' }
                ]
              }
            }
          ]
        }
      ]
    },

    // Media
    {
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Additional Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' }
          ]
        }
      ]
    },

    // Awards and Recognition
    {
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Award Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'year', title: 'Year', type: 'number' },
            { name: 'issuer', title: 'Awarded By', type: 'string' }
          ]
        }
      ]
    },

    // Social Media (Professional)
    {
      name: 'socialMedia',
      title: 'Professional Social Media',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn Profile', type: 'url' },
        { name: 'twitter', title: 'Twitter Profile', type: 'url' },
        { name: 'facebook', title: 'Facebook Profile', type: 'url' }
      ]
    },

    // Display Settings
    {
      name: 'displaySettings',
      title: 'Display Settings',
      type: 'object',
      fields: [
        {
          name: 'showOnWebsite',
          title: 'Show on Website',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showOnTeamPage',
          title: 'Show on Team Page',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showContactInfo',
          title: 'Show Contact Information',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'featured',
          title: 'Featured Team Member',
          type: 'boolean',
          description: 'Highlight on homepage or marketing materials',
          initialValue: false
        },
        {
          name: 'displayOrder',
          title: 'Display Order',
          type: 'number',
          description: 'Order for team listings (higher numbers first)',
          initialValue: 50
        }
      ]
    },

    // Status
    {
      name: 'status',
      title: 'Employment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'On Leave', value: 'on-leave' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contractor', value: 'contractor' },
          { title: 'Retired', value: 'retired' },
          { title: 'Former Employee', value: 'former' }
        ]
      },
      initialValue: 'active'
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
      description: 'Which business this team member works for'
    },

    // Performance Metrics (Optional)
    {
      name: 'metrics',
      title: 'Performance Metrics',
      type: 'object',
      fields: [
        {
          name: 'customerRating',
          title: 'Customer Rating',
          type: 'number',
          validation: Rule => Rule.min(1).max(5),
          description: 'Average customer rating (1-5 stars)'
        },
        {
          name: 'salesTarget',
          title: 'Monthly Sales Target',
          type: 'number',
          description: 'For sales staff (optional)'
        },
        {
          name: 'customerSatisfaction',
          title: 'Customer Satisfaction Score',
          type: 'number',
          validation: Rule => Rule.min(0).max(100),
          description: 'Percentage score (0-100%)'
        }
      ]
    }
  ],

  preview: {
    select: {
      name: 'name',
      position: 'position.fi',
      department: 'department',
      status: 'status',
      media: 'photo'
    },
    prepare(selection) {
      const { name, position, department, status } = selection

      const statusEmoji = {
        active: '✅',
        'on-leave': '🏖️',
        'part-time': '⏰',
        contractor: '🤝',
        retired: '🎉',
        former: '👋'
      }

      return {
        title: `${statusEmoji[status as keyof typeof statusEmoji] || ''} ${name}`,
        subtitle: `${position || 'Staff'} • ${department || 'General'}`,
        media: selection.media
      }
    }
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [
        { field: 'displaySettings.displayOrder', direction: 'desc' },
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Department, then Name',
      name: 'departmentName',
      by: [
        { field: 'department', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Seniority Level',
      name: 'seniority',
      by: [
        { field: 'seniority', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Start Date',
      name: 'startDate',
      by: [
        { field: 'startDate', direction: 'asc' }
      ]
    }
  ]
})