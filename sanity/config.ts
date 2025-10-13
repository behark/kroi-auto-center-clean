import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schema } from './schema'

// Custom desk structure for multi-project management
const deskStructure = (S: any) =>
  S.list()
    .title('Multi-Project CMS')
    .items([
      // Projects section
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .title('All Projects')
                .child(S.documentTypeList('project').title('All Projects')),
              S.divider(),
              S.listItem()
                .title('AUTO ANI (Kosovo)')
                .child(
                  S.list()
                    .title('AUTO ANI')
                    .items([
                      S.listItem()
                        .title('Cars')
                        .child(
                          S.documentList()
                            .title('AUTO ANI Cars')
                            .filter('_type == "car" && project->slug.current == "auto-ani"')
                        ),
                      S.listItem()
                        .title('Inquiries')
                        .child(
                          S.documentList()
                            .title('AUTO ANI Inquiries')
                            .filter('_type == "contactInquiry" && project->slug.current == "auto-ani"')
                        ),
                    ])
                ),
              S.listItem()
                .title('Car Wash Booking')
                .child(
                  S.list()
                    .title('Car Wash')
                    .items([
                      S.listItem()
                        .title('Services')
                        .child(
                          S.documentList()
                            .title('Car Wash Services')
                            .filter('_type == "carWashService" && project->slug.current == "car-wash"')
                        ),
                      S.listItem()
                        .title('Bookings')
                        .child(
                          S.documentList()
                            .title('Car Wash Bookings')
                            .filter('_type == "booking" && project->slug.current == "car-wash"')
                        ),
                    ])
                ),
              S.listItem()
                .title('Kroi Auto Center (Finnish)')
                .child(
                  S.list()
                    .title('Kroi Auto Center')
                    .items([
                      S.listItem()
                        .title('Cars')
                        .child(
                          S.documentList()
                            .title('Kroi Cars')
                            .filter('_type == "car" && project->slug.current == "kroi-auto-center"')
                        ),
                      S.listItem()
                        .title('Inquiries')
                        .child(
                          S.documentList()
                            .title('Kroi Inquiries')
                            .filter('_type == "contactInquiry" && project->slug.current == "kroi-auto-center"')
                        ),
                    ])
                ),
            ])
        ),

      S.divider(),

      // Global content types
      S.listItem()
        .title('All Cars')
        .child(S.documentTypeList('car').title('All Cars')),

      S.listItem()
        .title('All Bookings')
        .child(S.documentTypeList('booking').title('All Bookings')),

      S.listItem()
        .title('Car Wash Services')
        .child(S.documentTypeList('carWashService').title('Car Wash Services')),

      S.listItem()
        .title('Contact Inquiries')
        .child(S.documentTypeList('contactInquiry').title('Contact Inquiries')),

      S.listItem()
        .title('Testimonials')
        .child(S.documentTypeList('testimonial').title('Testimonials')),
    ])

export default defineConfig({
  name: 'automotive-multi-project',
  title: 'Automotive Multi-Project CMS',

  projectId: 'j2t31xge', // Using the existing project ID
  dataset: 'production',

  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool()
  ],

  schema,

  document: {
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