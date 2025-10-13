import { Metadata } from 'next'
import ServicesPage from '../components/ServicesPage'
import { siteConfig } from '../lib/siteConfig'

export const metadata: Metadata = {
  title: `Autopalvelut - ${siteConfig.name}`,
  description: 'Kattavat autopalvelut: huolto, korjaus, rahoitus, vaihtoautot ja takuu. Asiantunteva palvelu yli 15 vuoden kokemuksella.',
  keywords: 'autohuolto, autokorjaus, autorahoitus, vaihtoautot, autotakuu, autopalvelut, Kosovo',
  openGraph: {
    title: `Autopalvelut - ${siteConfig.name}`,
    description: 'Kattavat autopalvelut: huolto, korjaus, rahoitus, vaihtoautot ja takuu.',
    url: `${siteConfig.url}/palvelut`,
    siteName: siteConfig.name,
    locale: 'fi_FI',
    type: 'website',
  },
}

export default function PalvelutPage() {
  return <ServicesPage />
}