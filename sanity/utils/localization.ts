import { defineType } from 'sanity'

/**
 * Localized string field for multi-language support
 * Supports Finnish and English by default
 */
export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'fi',
      title: 'Finnish',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'en',
      title: 'English',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'fi',
      subtitle: 'en'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'No Finnish text',
        subtitle: subtitle ? `EN: ${subtitle}` : 'No English translation'
      }
    }
  }
})

/**
 * Localized text field for longer content
 */
export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'fi',
      title: 'Finnish',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4
    }
  ]
})

/**
 * Localized rich text for complex content
 */
export const localizedRichText = defineType({
  name: 'localizedRichText',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    {
      name: 'fi',
      title: 'Finnish',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
})