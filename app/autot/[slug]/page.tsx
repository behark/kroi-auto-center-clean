import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VehicleDetailPage from './VehicleDetailPage'
import { getCarById, getRelatedCars, cars } from '../../data/cars'
import { siteConfig } from '../../lib/siteConfig'

interface Props {
  params: Promise<{
    slug: string
  }>
}

// Disable static generation temporarily for debugging
// export function generateStaticParams() {
//   return cars.map((car) => ({
//     slug: car.slug,
//   }))
// }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const car = getCarById(slug)

  if (!car) {
    return {
      title: 'Auto ei löytynyt - Kroi Auto Center',
    }
  }

  return {
    title: `${car.name} ${car.year} - ${car.price} | Kroi Auto Center`,
    description: `${car.description}. ${car.km}, ${car.fuel}, ${car.transmission}. Takuu sisältyy. Katso lisätiedot ja varaa koeajo!`,
    keywords: `${car.brand}, ${car.model}, ${car.year}, käytetty auto, ${car.fuel}, ${car.transmission}, autokauppa`,
    openGraph: {
      title: `${car.name} ${car.year} - ${car.price}`,
      description: car.description,
      images: [car.image],
      url: `${siteConfig.url}/autot/${car.slug}`,
      siteName: siteConfig.name,
      locale: 'fi_FI',
      type: 'website',
    },
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params
  const car = getCarById(slug)

  if (!car) {
    notFound()
  }

  // Get related cars on server side
  const relatedCars = getRelatedCars(car.id, 3)

  // Serialize all data to ensure it can be passed to client component
  const serializedCar = JSON.parse(JSON.stringify(car))
  const serializedRelatedCars = JSON.parse(JSON.stringify(relatedCars))

  return <VehicleDetailPage car={serializedCar} relatedCars={serializedRelatedCars} />
}