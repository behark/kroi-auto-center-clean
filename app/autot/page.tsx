import { Metadata } from 'next'
import CarsPage from '../components/CarsPage'
import { siteConfig } from '../lib/siteConfig'

export const metadata: Metadata = {
  title: `Käytetyt Autot - ${siteConfig.name}`,
  description: 'Selaa laajaa valikoimaamme laadukkaita käytettyjä autoja. BMW, Mercedes, Volkswagen, Audi ja Skoda. Kaikki autot tarkastettu ja takuulla.',
  keywords: 'käytetyt autot, automyynti, BMW, Mercedes, Volkswagen, Audi, Skoda, autoliike, Kosovo, Pristina',
  openGraph: {
    title: `Käytetyt Autot - ${siteConfig.name}`,
    description: 'Selaa laajaa valikoimaamme laadukkaita käytettyjä autoja. Kaikki autot tarkastettu ja takuulla.',
    url: `${siteConfig.url}/autot`,
    siteName: siteConfig.name,
    locale: 'fi_FI',
    type: 'website',
  },
}

export default function AutotPage() {
  return <CarsPage />
}