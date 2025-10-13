// Localized String Schema for multi-language support
export const localizedString = {
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'fi',
      title: 'Finnish',
      type: 'string'
    },
    {
      name: 'en',
      title: 'English',
      type: 'string'
    },
    {
      name: 'sq',
      title: 'Albanian',
      type: 'string'
    }
  ]
}

export const localizedText = {
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'fi',
      title: 'Finnish',
      type: 'text'
    },
    {
      name: 'en',
      title: 'English',
      type: 'text'
    },
    {
      name: 'sq',
      title: 'Albanian',
      type: 'text'
    }
  ]
}

export const seoSchema = {
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'SEO Title',
      type: 'localizedString',
      description: 'Page title for search engines'
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'localizedText',
      description: 'Brief description for search engines (150-160 characters)'
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'SEO keywords for this content'
    },
    {
      name: 'ogImage',
      title: 'Social Media Image',
      type: 'image',
      description: 'Image for social media sharing'
    }
  ]
}