import { defineType } from 'sanity'
import { FileText } from 'lucide-react'

/**
 * Blog Post Schema
 * Content marketing for automotive businesses
 */
export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: FileText,
  fields: [
    // Basic Information
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title.fi',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      description: 'Brief summary for blog listings and social media',
      validation: Rule => Rule.required()
    },

    // Content
    {
      name: 'content',
      title: 'Blog Content',
      type: 'localizedRichText',
      validation: Rule => Rule.required()
    },

    // Media
    {
      name: 'featuredImage',
      title: 'Featured Image',
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
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'localizedString' }
          ]
        }
      ]
    },

    // Categorization
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          // Vehicle-related content
          { title: 'Car Reviews', value: 'car-reviews' },
          { title: 'New Models', value: 'new-models' },
          { title: 'Electric Vehicles', value: 'electric-vehicles' },
          { title: 'Buying Guide', value: 'buying-guide' },
          { title: 'Selling Tips', value: 'selling-tips' },
          { title: 'Financing', value: 'financing' },

          // Maintenance & Service
          { title: 'Maintenance Tips', value: 'maintenance-tips' },
          { title: 'DIY Repairs', value: 'diy-repairs' },
          { title: 'Seasonal Care', value: 'seasonal-care' },
          { title: 'Car Safety', value: 'car-safety' },
          { title: 'Troubleshooting', value: 'troubleshooting' },

          // Car Wash & Detailing
          { title: 'Car Wash Tips', value: 'car-wash-tips' },
          { title: 'Detailing Guides', value: 'detailing-guides' },
          { title: 'Paint Care', value: 'paint-care' },
          { title: 'Interior Care', value: 'interior-care' },
          { title: 'Product Reviews', value: 'product-reviews' },

          // Business & Industry
          { title: 'Industry News', value: 'industry-news' },
          { title: 'Company News', value: 'company-news' },
          { title: 'Events', value: 'events' },
          { title: 'Community', value: 'community' },
          { title: 'Environmental', value: 'environmental' },

          // How-to & Educational
          { title: 'How-to Guides', value: 'how-to' },
          { title: 'Educational', value: 'educational' },
          { title: 'Technology', value: 'technology' },
          { title: 'Trends', value: 'trends' }
        ]
      }
    },

    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Specific keywords for better discoverability'
    },

    // Business Context
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
      description: 'Which business types this content is relevant for'
    },

    // Author Information
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'isTeamMember',
          title: 'Team Member Author',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'teamMember',
          title: 'Team Member',
          type: 'reference',
          to: [{ type: 'teamMember' }],
          hidden: ({ parent }) => !parent?.isTeamMember
        },
        {
          name: 'guestAuthor',
          title: 'Guest Author Name',
          type: 'string',
          hidden: ({ parent }) => parent?.isTeamMember
        },
        {
          name: 'guestAuthorBio',
          title: 'Guest Author Bio',
          type: 'text',
          hidden: ({ parent }) => parent?.isTeamMember
        },
        {
          name: 'guestAuthorPhoto',
          title: 'Guest Author Photo',
          type: 'image',
          hidden: ({ parent }) => parent?.isTeamMember
        }
      ]
    },

    // Publishing
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this blog post was/will be published',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: '📝 Draft', value: 'draft' },
          { title: '👀 Under Review', value: 'review' },
          { title: '📅 Scheduled', value: 'scheduled' },
          { title: '✅ Published', value: 'published' },
          { title: '🚫 Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft',
      validation: Rule => Rule.required()
    },

    // Related Content
    {
      name: 'relatedVehicles',
      title: 'Related Vehicles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'vehicle' }] }],
      description: 'Vehicles mentioned in this post'
    },
    {
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      description: 'Services mentioned in this post'
    },
    {
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      description: 'Other relevant blog posts'
    },

    // SEO & Social
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    },
    {
      name: 'socialSharing',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'socialTitle',
          title: 'Social Media Title',
          type: 'localizedString',
          description: 'Title for social media sharing (if different from main title)'
        },
        {
          name: 'socialDescription',
          title: 'Social Media Description',
          type: 'localizedText',
          description: 'Description for social media sharing'
        },
        {
          name: 'socialImage',
          title: 'Social Media Image',
          type: 'image',
          description: 'Image for social media sharing (if different from featured image)'
        }
      ]
    },

    // Display Settings
    {
      name: 'displaySettings',
      title: 'Display Settings',
      type: 'object',
      fields: [
        {
          name: 'featured',
          title: 'Featured Post',
          type: 'boolean',
          description: 'Show prominently on blog homepage',
          initialValue: false
        },
        {
          name: 'pinned',
          title: 'Pinned Post',
          type: 'boolean',
          description: 'Keep at top of blog listings',
          initialValue: false
        },
        {
          name: 'showAuthor',
          title: 'Show Author',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showPublishDate',
          title: 'Show Publish Date',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'allowComments',
          title: 'Allow Comments',
          type: 'boolean',
          initialValue: true
        }
      ]
    },

    // Reading Time (calculated field)
    {
      name: 'estimatedReadingTime',
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      description: 'Auto-calculated based on content length',
      readOnly: true
    },

    // Newsletter
    {
      name: 'newsletter',
      title: 'Newsletter Settings',
      type: 'object',
      fields: [
        {
          name: 'includeInNewsletter',
          title: 'Include in Newsletter',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'newsletterSent',
          title: 'Newsletter Sent',
          type: 'boolean',
          initialValue: false,
          readOnly: true
        },
        {
          name: 'newsletterSentDate',
          title: 'Newsletter Sent Date',
          type: 'datetime',
          readOnly: true
        }
      ]
    }
  ],

  preview: {
    select: {
      title: 'title.fi',
      titleEn: 'title.en',
      status: 'status',
      featured: 'displaySettings.featured',
      publishedAt: 'publishedAt',
      authorName: 'author.teamMember.name',
      guestAuthor: 'author.guestAuthor',
      media: 'featuredImage'
    },
    prepare(selection) {
      const {
        title,
        titleEn,
        status,
        featured,
        publishedAt,
        authorName,
        guestAuthor
      } = selection

      const statusEmoji = {
        draft: '📝',
        review: '👀',
        scheduled: '📅',
        published: '✅',
        archived: '🚫'
      }

      const displayTitle = title || titleEn || 'Untitled Post'
      const author = authorName || guestAuthor || 'Unknown'
      const featuredFlag = featured ? '⭐ ' : ''
      const publishDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : ''

      return {
        title: `${featuredFlag}${statusEmoji[status as keyof typeof statusEmoji]} ${displayTitle}`,
        subtitle: `${author} • ${publishDate}`,
        media: selection.media
      }
    }
  },

  orderings: [
    {
      title: 'Featured, then Published Date',
      name: 'featuredDate',
      by: [
        { field: 'displaySettings.featured', direction: 'desc' },
        { field: 'displaySettings.pinned', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Published Date (Newest First)',
      name: 'publishedDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Status, then Date',
      name: 'statusDate',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [
        { field: 'title.fi', direction: 'asc' }
      ]
    }
  ]
})