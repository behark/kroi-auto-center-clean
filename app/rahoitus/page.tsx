import { Metadata } from 'next'
import FinancingPage from '../components/FinancingPage'
import { siteConfig } from '../lib/siteConfig'

export const metadata: Metadata = {
  title: `Autorahoitus - ${siteConfig.name}`,
  description: 'Joustavat autorahoitusvaihtoehdot. Korot alkaen 2.9%, jopa 84kk maksuaika. Pikahyväksyntä 60 sekunnissa. Laske kuukausierä verkossa.',
  keywords: 'autorahoitus, autolaina, rahoituslaskin, osamaksu, autokauppa rahoitus, Kosovo',
  openGraph: {
    title: `Autorahoitus - ${siteConfig.name}`,
    description: 'Joustavat autorahoitusvaihtoehdot. Korot alkaen 2.9%, jopa 84kk maksuaika.',
    url: `${siteConfig.url}/rahoitus`,
    siteName: siteConfig.name,
    locale: 'fi_FI',
    type: 'website',
  },
}

export default function RahoitusPage() {
  return <FinancingPage />
}