import { defineType } from 'sanity'
import { Mail } from 'lucide-react'

/**
 * Universal Contact Inquiry Schema
 * Lead management for automotive businesses
 * Handles various types of customer inquiries
 */
export const contactInquiry = defineType({
  name: 'contactInquiry',
  title: 'Contact Inquiry',
  type: 'document',
  icon: Mail,
  fields: [
    // Customer Information
    {
      name: 'customerInfo',
      title: 'Customer Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Full Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: Rule => Rule.required().email()
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string'
        },
        {
          name: 'preferredContact',
          title: 'Preferred Contact Method',
          type: 'string',
          options: {
            list: [
              { title: 'Email', value: 'email' },
              { title: 'Phone', value: 'phone' },
              { title: 'Text/SMS', value: 'sms' },
              { title: 'WhatsApp', value: 'whatsapp' },
              { title: 'No Preference', value: 'any' }
            ]
          },
          initialValue: 'email'
        },
        {
          name: 'bestTimeToContact',
          title: 'Best Time to Contact',
          type: 'string',
          options: {
            list: [
              { title: 'Morning (8-12)', value: 'morning' },
              { title: 'Afternoon (12-17)', value: 'afternoon' },
              { title: 'Evening (17-20)', value: 'evening' },
              { title: 'Anytime', value: 'anytime' }
            ]
          }
        }
      ]
    },

    // Inquiry Details
    {
      name: 'inquiryType',
      title: 'Inquiry Type',
      type: 'string',
      options: {
        list: [
          // Vehicle Sales Inquiries
          { title: 'Vehicle Information Request', value: 'vehicle-info' },
          { title: 'Test Drive Request', value: 'test-drive' },
          { title: 'Purchase Inquiry', value: 'purchase' },
          { title: 'Trade-in Valuation', value: 'trade-in' },
          { title: 'Financing Question', value: 'financing' },

          // Service Inquiries
          { title: 'Service Appointment', value: 'service-appointment' },
          { title: 'Maintenance Quote', value: 'maintenance-quote' },
          { title: 'Repair Estimate', value: 'repair-estimate' },
          { title: 'Warranty Inquiry', value: 'warranty' },

          // Car Wash Inquiries
          { title: 'Car Wash Booking', value: 'wash-booking' },
          { title: 'Detailing Quote', value: 'detailing-quote' },
          { title: 'Package Information', value: 'package-info' },

          // General
          { title: 'General Question', value: 'general' },
          { title: 'Business Hours', value: 'hours' },
          { title: 'Location/Directions', value: 'location' },
          { title: 'Complaint', value: 'complaint' },
          { title: 'Compliment', value: 'compliment' },
          { title: 'Partnership/Business', value: 'business' }
        ]
      },
      validation: Rule => Rule.required()
    },

    {
      name: 'message',
      title: 'Customer Message',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },

    {
      name: 'subject',
      title: 'Subject/Title',
      type: 'string',
      description: 'Brief summary of the inquiry'
    },

    // Related Content
    {
      name: 'relatedVehicle',
      title: 'Related Vehicle',
      type: 'reference',
      to: [{ type: 'vehicle' }],
      description: 'Vehicle this inquiry is about (if applicable)'
    },
    {
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Service this inquiry is about (if applicable)'
    },

    // Vehicle Information (for trade-ins, purchases)
    {
      name: 'customerVehicle',
      title: 'Customer Vehicle Information',
      type: 'object',
      fields: [
        {
          name: 'hasVehicle',
          title: 'Customer Has Vehicle to Trade/Sell',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'brand',
          title: 'Vehicle Brand',
          type: 'string',
          hidden: ({ parent }) => !parent?.hasVehicle
        },
        {
          name: 'model',
          title: 'Vehicle Model',
          type: 'string',
          hidden: ({ parent }) => !parent?.hasVehicle
        },
        {
          name: 'year',
          title: 'Vehicle Year',
          type: 'number',
          hidden: ({ parent }) => !parent?.hasVehicle
        },
        {
          name: 'mileage',
          title: 'Vehicle Mileage',
          type: 'number',
          hidden: ({ parent }) => !parent?.hasVehicle
        },
        {
          name: 'condition',
          title: 'Vehicle Condition',
          type: 'string',
          options: {
            list: [
              { title: 'Excellent', value: 'excellent' },
              { title: 'Good', value: 'good' },
              { title: 'Fair', value: 'fair' },
              { title: 'Poor', value: 'poor' }
            ]
          },
          hidden: ({ parent }) => !parent?.hasVehicle
        }
      ]
    },

    // Appointment/Scheduling
    {
      name: 'scheduling',
      title: 'Scheduling Information',
      type: 'object',
      fields: [
        {
          name: 'requestsAppointment',
          title: 'Requests Appointment',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'preferredDate',
          title: 'Preferred Date',
          type: 'date',
          hidden: ({ parent }) => !parent?.requestsAppointment
        },
        {
          name: 'preferredTime',
          title: 'Preferred Time',
          type: 'string',
          options: {
            list: [
              { title: '8:00-9:00', value: '08:00' },
              { title: '9:00-10:00', value: '09:00' },
              { title: '10:00-11:00', value: '10:00' },
              { title: '11:00-12:00', value: '11:00' },
              { title: '12:00-13:00', value: '12:00' },
              { title: '13:00-14:00', value: '13:00' },
              { title: '14:00-15:00', value: '14:00' },
              { title: '15:00-16:00', value: '15:00' },
              { title: '16:00-17:00', value: '16:00' },
              { title: '17:00-18:00', value: '17:00' },
              { title: 'Flexible', value: 'flexible' }
            ]
          },
          hidden: ({ parent }) => !parent?.requestsAppointment
        },
        {
          name: 'urgency',
          title: 'Urgency Level',
          type: 'string',
          options: {
            list: [
              { title: 'Low - No Rush', value: 'low' },
              { title: 'Medium - This Week', value: 'medium' },
              { title: 'High - ASAP', value: 'high' },
              { title: 'Emergency', value: 'emergency' }
            ]
          },
          initialValue: 'medium'
        }
      ]
    },

    // Lead Management
    {
      name: 'leadScore',
      title: 'Lead Score',
      type: 'number',
      description: 'Qualification score (1-100)',
      validation: Rule => Rule.min(1).max(100),
      initialValue: 50
    },

    {
      name: 'leadSource',
      title: 'Lead Source',
      type: 'string',
      options: {
        list: [
          { title: 'Website Contact Form', value: 'website' },
          { title: 'Google Search', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Word of Mouth', value: 'referral' },
          { title: 'Walk-in', value: 'walk-in' },
          { title: 'Phone Call', value: 'phone' },
          { title: 'Email', value: 'email' },
          { title: 'Advertisement', value: 'advertisement' },
          { title: 'Other', value: 'other' }
        ]
      }
    },

    // Status and Follow-up
    {
      name: 'status',
      title: 'Inquiry Status',
      type: 'string',
      options: {
        list: [
          { title: '🆕 New', value: 'new' },
          { title: '👀 Viewed', value: 'viewed' },
          { title: '📞 Contacted', value: 'contacted' },
          { title: '📅 Appointment Scheduled', value: 'scheduled' },
          { title: '🔄 In Progress', value: 'in-progress' },
          { title: '✅ Resolved/Completed', value: 'completed' },
          { title: '❌ Not Interested', value: 'not-interested' },
          { title: '⏸️ On Hold', value: 'on-hold' },
          { title: '🔄 Follow-up Required', value: 'follow-up' }
        ]
      },
      initialValue: 'new',
      validation: Rule => Rule.required()
    },

    {
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'string',
      description: 'Staff member handling this inquiry'
    },

    {
      name: 'followUpDate',
      title: 'Follow-up Date',
      type: 'datetime',
      description: 'When to follow up with this customer'
    },

    {
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      options: {
        list: [
          { title: '🔴 High Priority', value: 'high' },
          { title: '🟡 Medium Priority', value: 'medium' },
          { title: '🟢 Low Priority', value: 'low' }
        ]
      },
      initialValue: 'medium'
    },

    // Internal Notes
    {
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'note',
              title: 'Note',
              type: 'text',
              rows: 3
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string'
            },
            {
              name: 'date',
              title: 'Date',
              type: 'datetime',
              initialValue: () => new Date().toISOString()
            },
            {
              name: 'type',
              title: 'Note Type',
              type: 'string',
              options: {
                list: [
                  { title: 'General Note', value: 'general' },
                  { title: 'Phone Call', value: 'call' },
                  { title: 'Email Sent', value: 'email' },
                  { title: 'Meeting', value: 'meeting' },
                  { title: 'Follow-up', value: 'follow-up' }
                ]
              }
            }
          ]
        }
      ]
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
      description: 'Which business received this inquiry'
    },

    // Conversion Tracking
    {
      name: 'outcome',
      title: 'Final Outcome',
      type: 'object',
      fields: [
        {
          name: 'converted',
          title: 'Converted to Sale/Service',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'conversionValue',
          title: 'Conversion Value (EUR)',
          type: 'number',
          hidden: ({ parent }) => !parent?.converted
        },
        {
          name: 'conversionType',
          title: 'Type of Conversion',
          type: 'string',
          options: {
            list: [
              { title: 'Vehicle Sale', value: 'vehicle-sale' },
              { title: 'Service Booking', value: 'service' },
              { title: 'Car Wash Booking', value: 'car-wash' },
              { title: 'Maintenance Contract', value: 'maintenance' },
              { title: 'Other', value: 'other' }
            ]
          },
          hidden: ({ parent }) => !parent?.converted
        }
      ]
    },

    // GDPR Compliance
    {
      name: 'gdprConsent',
      title: 'GDPR Consent',
      type: 'object',
      fields: [
        {
          name: 'marketingConsent',
          title: 'Marketing Communications Consent',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'dataRetentionConsent',
          title: 'Data Retention Consent',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'consentDate',
          title: 'Consent Given Date',
          type: 'datetime',
          initialValue: () => new Date().toISOString()
        }
      ]
    }
  ],

  // Preview configuration
  preview: {
    select: {
      name: 'customerInfo.name',
      email: 'customerInfo.email',
      inquiryType: 'inquiryType',
      status: 'status',
      priority: 'priority',
      subject: 'subject',
      createdAt: '_createdAt'
    },
    prepare(selection) {
      const { name, email, inquiryType, status, priority, subject, createdAt } = selection

      const statusEmoji = {
        new: '🆕',
        viewed: '👀',
        contacted: '📞',
        scheduled: '📅',
        'in-progress': '🔄',
        completed: '✅',
        'not-interested': '❌',
        'on-hold': '⏸️',
        'follow-up': '🔄'
      }

      const priorityEmoji = {
        high: '🔴',
        medium: '🟡',
        low: '🟢'
      }

      const displayTitle = subject || inquiryType || 'General Inquiry'
      const statusDisplay = statusEmoji[status as keyof typeof statusEmoji] || ''
      const priorityDisplay = priorityEmoji[priority as keyof typeof priorityEmoji] || ''

      return {
        title: `${statusDisplay} ${priorityDisplay} ${name} - ${displayTitle}`,
        subtitle: `${email} • ${inquiryType || 'General'} • ${new Date(createdAt).toLocaleDateString()}`,
        media: undefined
      }
    }
  },

  // Ordering options
  orderings: [
    {
      title: 'Priority & Status',
      name: 'priorityStatus',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: 'status', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Newest First',
      name: 'newest',
      by: [
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Follow-up Date',
      name: 'followUp',
      by: [
        { field: 'followUpDate', direction: 'asc' }
      ]
    },
    {
      title: 'Lead Score (Highest First)',
      name: 'leadScore',
      by: [
        { field: 'leadScore', direction: 'desc' }
      ]
    },
    {
      title: 'Status',
      name: 'status',
      by: [
        { field: 'status', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    }
  ]
})