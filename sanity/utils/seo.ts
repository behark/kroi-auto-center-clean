import { defineType } from 'sanity'

/**
 * SEO meta information object
 * Reusable across all content types
 */
export const seoFields = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Title tag for search engines (50-60 characters)',
      validation: Rule => Rule.max(60)
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      description: 'Description for search engines (150-160 characters)',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for search engine optimization'
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing',
      options: {
        hotspot: true
      }
    },
    {
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Prevent this page from being indexed by search engines',
      initialValue: false
    }
  ],
  options: {
    collapsible: true,
    collapsed: true
  }
})