import { Metadata } from 'next'
import EnhancedAboutPage from '../components/EnhancedAboutPage'

export const metadata: Metadata = {
  title: 'About Us - Kroi Auto Center',
  description: 'Learn about Kroi Auto Center - your trusted partner for premium used cars in Finland. Quality vehicles, transparent pricing, exceptional service.',
}

export default function AboutPage() {
  return <EnhancedAboutPage />
}