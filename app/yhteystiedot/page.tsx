import { Metadata } from 'next'
import ContactPage from '../components/ContactPage'
import { siteConfig } from '../lib/siteConfig'

export const metadata: Metadata = {
  title: `Yhteystiedot - ${siteConfig.name}`,
  description: `Ota yhteyttä Kroi Auto Centeriin. Sijainti: ${siteConfig.address.full}. Puh: ${siteConfig.phone.primary.display}. Avoinna Ma-Pe 09:00-18:00.`,
  keywords: 'yhteystiedot, autoliike Kosovo, Kroi Auto Center osoite, autokauppa Pristina',
  openGraph: {
    title: `Yhteystiedot - ${siteConfig.name}`,
    description: `Ota yhteyttä. Sijainti: ${siteConfig.address.full}. Puh: ${siteConfig.phone.primary.display}.`,
    url: `${siteConfig.url}/yhteystiedot`,
    siteName: siteConfig.name,
    locale: 'fi_FI',
    type: 'website',
  },
}

export default function YhteystiedotPage() {
  return <ContactPage />
}