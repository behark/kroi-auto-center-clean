import { type SchemaTypeDefinition } from 'sanity'

// Professional Automotive Schemas from automotive-cms-schemas library
import { vehicle } from './vehicle'
import { service } from './service'
import { testimonial } from './testimonial'
import { contactInquiry } from './contactInquiry'
import { businessInfo } from './businessInfo'
import { teamMember } from './teamMember'
import { blogPost } from './blogPost'

// Utility schemas for internationalization and SEO
import { localizedString, localizedText, localizedRichText } from './utils/localization'
import { seoFields } from './utils/seo'

// Project configuration schema to support multiple automotive businesses
const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Project Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'type',
      title: 'Business Type',
      type: 'string',
      options: {
        list: [
          { title: 'Car Dealership', value: 'dealership' },
          { title: 'Car Wash', value: 'carwash' },
          { title: 'Auto Service', value: 'service' },
          { title: 'Multi-Service', value: 'multi' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'language',
      title: 'Primary Language',
      type: 'string',
      options: {
        list: [
          { title: 'Finnish', value: 'fi' },
          { title: 'Albanian', value: 'sq' },
          { title: 'English', value: 'en' },
          { title: 'Serbian', value: 'sr' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          { title: 'Finland', value: 'FI' },
          { title: 'Kosovo', value: 'XK' },
          { title: 'Albania', value: 'AL' },
          { title: 'Serbia', value: 'RS' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'businessInfo',
      title: 'Business Information',
      type: 'businessInfo'
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      language: 'language'
    },
    prepare(selection: any) {
      const { title, subtitle, language } = selection
      return {
        title,
        subtitle: `${subtitle} (${language})`
      }
    }
  }
}

// Booking system for appointments and services
const booking = {
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    {
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{ type: 'project' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'type',
      title: 'Booking Type',
      type: 'string',
      options: {
        list: [
          { title: 'Car Wash Service', value: 'carwash' },
          { title: 'Test Drive', value: 'testdrive' },
          { title: 'Service Appointment', value: 'service_appointment' },
          { title: 'Sales Consultation', value: 'consultation' },
          { title: 'Vehicle Inspection', value: 'inspection' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'scheduledDateTime',
      title: 'Scheduled Date & Time',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'service',
      title: 'Selected Service',
      type: 'reference',
      to: [{ type: 'service' }],
      hidden: ({ document }: any) => !['carwash', 'service_appointment'].includes(document?.type)
    },
    {
      name: 'vehicle',
      title: 'Vehicle (for test drive)',
      type: 'reference',
      to: [{ type: 'vehicle' }],
      hidden: ({ document }: any) => document?.type !== 'testdrive'
    },
    {
      name: 'customerVehicle',
      title: 'Customer Vehicle Info',
      type: 'object',
      fields: [
        { name: 'make', title: 'Make', type: 'string' },
        { name: 'model', title: 'Model', type: 'string' },
        { name: 'year', title: 'Year', type: 'number' },
        { name: 'licensePlate', title: 'License Plate', type: 'string' },
        { name: 'color', title: 'Color', type: 'string' }
      ],
      hidden: ({ document }: any) => !['carwash', 'service_appointment', 'inspection'].includes(document?.type)
    },
    {
      name: 'notes',
      title: 'Special Instructions / Notes',
      type: 'text',
      rows: 3
    },
    {
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: 'New Request', value: 'new' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'No Show', value: 'no_show' }
        ]
      },
      initialValue: 'new',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'totalPrice',
      title: 'Total Price (EUR)',
      type: 'number',
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: 'paid',
      title: 'Payment Status',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'assignedTo',
      title: 'Assigned Team Member',
      type: 'reference',
      to: [{ type: 'teamMember' }]
    }
  ],
  preview: {
    select: {
      customerName: 'customerName',
      type: 'type',
      scheduledDateTime: 'scheduledDateTime',
      status: 'status',
      project: 'project.name'
    },
    prepare(selection: any) {
      const { customerName, type, scheduledDateTime, status, project } = selection
      const statusEmoji = {
        new: '🆕',
        confirmed: '✅',
        in_progress: '⏳',
        completed: '✅',
        cancelled: '❌',
        no_show: '👻'
      }

      return {
        title: `${customerName} - ${type}`,
        subtitle: `${project} • ${new Date(scheduledDateTime).toLocaleDateString()} • ${statusEmoji[status as keyof typeof statusEmoji]} ${status}`,
      }
    }
  }
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Project management
    project,

    // Core automotive schemas
    vehicle,
    service,
    booking,
    contactInquiry,
    testimonial,

    // Business & team
    businessInfo,
    teamMember,
    blogPost,

    // Utility schemas
    localizedString,
    localizedText,
    localizedRichText,
    seoFields,
  ],
}