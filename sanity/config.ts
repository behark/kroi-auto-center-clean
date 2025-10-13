import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schema } from './schema'

export default defineConfig({
  name: 'kroi-auto-center',
  title: 'Kroi Auto Center',

  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool()
  ],

  schema,

  document: {
    // Remove documents from the desk structure
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId !== 'settings'
        )
      }
      return prev
    },
  },
})