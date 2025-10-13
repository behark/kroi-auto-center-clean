import { v4 as uuidv4 } from 'uuid'

// Helper functions for data generation
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[åäö]/g, 'a')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const createLocalizedString = (fi, en = null) => ({
  _type: 'localizedString',
  fi: fi,
  en: en || fi
})

export const createLocalizedText = (fi, en = null) => ({
  _type: 'localizedText',
  fi: fi,
  en: en || fi
})

export const createSEO = (title, description, keywords = []) => ({
  _type: 'seo',
  title: createLocalizedString(title.fi, title.en),
  description: createLocalizedText(description.fi, description.en),
  keywords: keywords,
  ogImage: null
})

export const randomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomPrice = (min, max, increment = 100) => {
  const range = (max - min) / increment
  return min + (Math.floor(Math.random() * range) * increment)
}

// Finnish car registration year distribution (realistic for used car market)
export const getRealisticYear = () => {
  const currentYear = new Date().getFullYear()
  const weights = [
    { years: [currentYear, currentYear - 1], weight: 15 }, // New/nearly new
    { years: [currentYear - 2, currentYear - 3], weight: 25 }, // 2-3 years
    { years: [currentYear - 4, currentYear - 6], weight: 30 }, // 4-6 years
    { years: [currentYear - 7, currentYear - 10], weight: 20 }, // 7-10 years
    { years: [currentYear - 11, currentYear - 15], weight: 10 } // Older cars
  ]

  const random = Math.random() * 100
  let cumulative = 0

  for (const { years, weight } of weights) {
    cumulative += weight
    if (random <= cumulative) {
      return randomFromArray(years)
    }
  }

  return currentYear - 5 // Default fallback
}

// Generate realistic mileage based on car age
export const getRealisticMileage = (year) => {
  const currentYear = new Date().getFullYear()
  const age = currentYear - year
  const averageKmPerYear = randomNumber(15000, 25000)
  const variation = randomNumber(-5000, 5000)
  return Math.max(0, age * averageKmPerYear + variation)
}

// Finnish names for team members
export const finnishNames = {
  first: {
    male: ['Mikael', 'Jukka', 'Petri', 'Antti', 'Matti', 'Ville', 'Sami', 'Juha', 'Tommi', 'Joni'],
    female: ['Anna', 'Maria', 'Sari', 'Johanna', 'Laura', 'Jenni', 'Riikka', 'Elina', 'Hanna', 'Tiina']
  },
  last: ['Virtanen', 'Korhonen', 'Mäkinen', 'Nieminen', 'Mäkelä', 'Hämäläinen', 'Laine', 'Heikkinen', 'Koskinen', 'Järvinen']
}

// Kosovo/Albanian names
export const kosovoNames = {
  first: {
    male: ['Ardit', 'Besnik', 'Dardan', 'Erton', 'Fisnik', 'Genti', 'Kushtrim', 'Liridon', 'Mergim', 'Nderim'],
    female: ['Arbana', 'Blerta', 'Dafina', 'Era', 'Fjolla', 'Gresa', 'Liridona', 'Majlinda', 'Nora', 'Vlera']
  },
  last: ['Berisha', 'Krasniqi', 'Hoxha', 'Ahmeti', 'Musliu', 'Sylaj', 'Gashi', 'Rexhepi', 'Shala', 'Hasani']
}

export const generatePersonName = (language = 'fi', gender = null) => {
  const names = language === 'sq' ? kosovoNames : finnishNames
  const selectedGender = gender || randomFromArray(['male', 'female'])
  const firstName = randomFromArray(names.first[selectedGender])
  const lastName = randomFromArray(names.last)
  return `${firstName} ${lastName}`
}

// Image placeholders (using realistic car images from placeholder services)
export const getVehicleImageUrl = (brand, model, year, index = 0) => {
  // Using picsum for now - in real implementation, you'd use actual car photos
  const seed = `${brand}-${model}-${year}-${index}`.replace(/\s+/g, '')
  return `https://picsum.photos/seed/${seed}/800/600`
}

export const getServiceImageUrl = (serviceName, index = 0) => {
  const seed = `${serviceName}-${index}`.replace(/\s+/g, '')
  return `https://picsum.photos/seed/service-${seed}/600/400`
}

export const getPersonImageUrl = (name) => {
  const seed = name.replace(/\s+/g, '')
  return `https://picsum.photos/seed/person-${seed}/400/400`
}

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))