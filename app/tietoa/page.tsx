import { Metadata } from 'next'
import AboutPage from '../components/AboutPage'
import { siteConfig } from '../lib/siteConfig'

export const metadata: Metadata = {
  title: `Tietoa Meistä - ${siteConfig.name}`,
  description: `Kroi Auto Center on perustettu ${siteConfig.business.established}. Yli ${siteConfig.business.experience} kokemuksella palvelemme asiakkaitamme Kosovossa.`,
  keywords: 'autoliike Kosovo, Kroi Auto Center, autokauppa historia, luotettava autoliike',
  openGraph: {
    title: `Tietoa Meistä - ${siteConfig.name}`,
    description: `Yli ${siteConfig.business.experience} kokemuksella palvelemme asiakkaitamme Kosovossa.`,
    url: `${siteConfig.url}/tietoa`,
    siteName: siteConfig.name,
    locale: 'fi_FI',
    type: 'website',
  },
}

export default function TietoaPage() {
  return <AboutPage />
}