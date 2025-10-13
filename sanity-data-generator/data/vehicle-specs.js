// Comprehensive vehicle specifications data for realistic generation

export const vehicleSpecs = {
  'BMW': {
    models: {
      'X5': {
        category: 'suv',
        engines: ['3.0L Turbo 6-cylinder', '4.4L Twin-Turbo V8', '3.0L Turbo Diesel'],
        colors: ['Alpine White', 'Jet Black', 'Storm Bay', 'Phytonic Blue', 'Mineral Grey'],
        priceRange: { min: 75000, max: 120000 },
        features: ['xDrive AWD', 'Adaptive Suspension', 'Panoramic Sunroof', 'Leather Seats', 'Navigation System']
      },
      'X3': {
        category: 'suv',
        engines: ['2.0L Turbo 4-cylinder', '3.0L Turbo 6-cylinder'],
        colors: ['Alpine White', 'Jet Black', 'Mineral Grey', 'Storm Bay'],
        priceRange: { min: 55000, max: 85000 },
        features: ['xDrive AWD', 'LED Headlights', 'Leather Seats', 'Apple CarPlay']
      },
      '3 Series': {
        category: 'sedan',
        engines: ['2.0L Turbo 4-cylinder', '3.0L Turbo 6-cylinder'],
        colors: ['Alpine White', 'Jet Black', 'Storm Bay', 'Mineral Grey'],
        priceRange: { min: 45000, max: 75000 },
        features: ['Sport Suspension', 'Premium Audio', 'Leather Seats', 'Navigation']
      }
    }
  },
  'Mercedes-Benz': {
    models: {
      'GLE': {
        category: 'suv',
        engines: ['2.0L Turbo 4-cylinder', '3.0L Turbo V6', '4.0L Twin-Turbo V8'],
        colors: ['Polar White', 'Obsidian Black', 'Selenite Grey', 'Brilliant Blue'],
        priceRange: { min: 70000, max: 130000 },
        features: ['4MATIC AWD', 'AIRMATIC Suspension', 'MBUX Infotainment', 'Premium Interior']
      },
      'C-Class': {
        category: 'sedan',
        engines: ['2.0L Turbo 4-cylinder', '3.0L Turbo V6'],
        colors: ['Polar White', 'Obsidian Black', 'Selenite Grey'],
        priceRange: { min: 50000, max: 80000 },
        features: ['DYNAMIC SELECT', 'LED Headlights', 'Leather Interior', 'MBUX System']
      }
    }
  },
  'Audi': {
    models: {
      'Q7': {
        category: 'suv',
        engines: ['3.0L Turbo V6', '4.0L Twin-Turbo V8'],
        colors: ['Glacier White', 'Mythos Black', 'Daytona Grey', 'Navarra Blue'],
        priceRange: { min: 75000, max: 125000 },
        features: ['quattro AWD', 'Air Suspension', 'Virtual Cockpit', '7-Seat Configuration']
      },
      'A4': {
        category: 'sedan',
        engines: ['2.0L Turbo 4-cylinder', '3.0L Turbo V6'],
        colors: ['Glacier White', 'Mythos Black', 'Daytona Grey'],
        priceRange: { min: 45000, max: 70000 },
        features: ['quattro AWD', 'MMI Touch', 'LED Lighting', 'Sport Seats']
      }
    }
  },
  'Volkswagen': {
    models: {
      'Tiguan': {
        category: 'suv',
        engines: ['2.0L Turbo 4-cylinder', '2.0L Turbo Diesel'],
        colors: ['Pure White', 'Deep Black', 'Reflex Silver', 'Atlantic Blue'],
        priceRange: { min: 35000, max: 55000 },
        features: ['4MOTION AWD', 'Digital Cockpit', 'App-Connect', 'LED Headlights']
      },
      'Passat': {
        category: 'sedan',
        engines: ['2.0L Turbo 4-cylinder', '2.0L Turbo Diesel'],
        colors: ['Pure White', 'Deep Black', 'Reflex Silver'],
        priceRange: { min: 32000, max: 48000 },
        features: ['Adaptive Cruise Control', 'Digital Cockpit', 'Heated Seats']
      }
    }
  },
  'Toyota': {
    models: {
      'RAV4': {
        category: 'suv',
        engines: ['2.5L 4-cylinder', '2.5L Hybrid'],
        colors: ['Super White', 'Midnight Black', 'Magnetic Grey', 'Ruby Flare Pearl'],
        priceRange: { min: 32000, max: 45000 },
        features: ['AWD Available', 'Toyota Safety Sense', 'Apple CarPlay', 'LED Headlights']
      },
      'Camry': {
        category: 'sedan',
        engines: ['2.5L 4-cylinder', '3.5L V6', '2.5L Hybrid'],
        colors: ['Super White', 'Midnight Black', 'Celestial Silver'],
        priceRange: { min: 28000, max: 42000 },
        features: ['Toyota Safety Sense', 'Entune Infotainment', 'LED Lighting']
      }
    }
  },
  'Ford': {
    models: {
      'Explorer': {
        category: 'suv',
        engines: ['2.3L EcoBoost', '3.0L Twin-Turbo V6'],
        colors: ['Oxford White', 'Agate Black', 'Magnetic Metallic', 'Lightning Blue'],
        priceRange: { min: 38000, max: 58000 },
        features: ['Intelligent AWD', 'SYNC 3', 'Co-Pilot360', 'Terrain Management']
      },
      'Mustang': {
        category: 'coupe',
        engines: ['2.3L EcoBoost', '5.0L V8'],
        colors: ['Oxford White', 'Shadow Black', 'Race Red', 'Velocity Blue'],
        priceRange: { min: 32000, max: 55000 },
        features: ['Performance Package', 'SYNC 3', 'Premium Audio', 'Track Apps']
      }
    }
  }
}

export const serviceSpecifications = {
  carWash: {
    'Basic Wash': {
      duration: { value: 30, unit: 'minutes' },
      pricing: { type: 'fixed', price: 15 },
      features: ['Exterior Wash', 'Rinse & Dry', 'Tire Cleaning'],
      process: [
        { step: 1, title: { fi: 'Ennakkohuuhtelu', en: 'Pre-rinse' }, duration: 5 },
        { step: 2, title: { fi: 'Saippuapesu', en: 'Soap Application' }, duration: 10 },
        { step: 3, title: { fi: 'Harjaus', en: 'Brush Cleaning' }, duration: 10 },
        { step: 4, title: { fi: 'Huuhtelu ja kuivaus', en: 'Rinse & Dry' }, duration: 5 }
      ]
    },
    'Premium Wash': {
      duration: { value: 45, unit: 'minutes' },
      pricing: { type: 'fixed', price: 25 },
      features: ['Exterior Wash', 'Interior Vacuum', 'Tire Shine', 'Dashboard Clean'],
      process: [
        { step: 1, title: { fi: 'Ennakkohuuhtelu', en: 'Pre-rinse' }, duration: 5 },
        { step: 2, title: { fi: 'Saippuapesu', en: 'Soap Application' }, duration: 10 },
        { step: 3, title: { fi: 'Harjaus', en: 'Brush Cleaning' }, duration: 10 },
        { step: 4, title: { fi: 'Sisätilan imurointi', en: 'Interior Vacuum' }, duration: 15 },
        { step: 5, title: { fi: 'Viimeistely', en: 'Final Touch' }, duration: 5 }
      ]
    },
    'Detailing': {
      duration: { value: 2, unit: 'hours' },
      pricing: { type: 'starting', price: 85 },
      features: ['Deep Clean', 'Wax Application', 'Interior Deep Clean', 'Engine Bay Clean'],
      process: [
        { step: 1, title: { fi: 'Ennakkotarkistus', en: 'Initial Inspection' }, duration: 15 },
        { step: 2, title: { fi: 'Syväpesu ulkoa', en: 'Exterior Deep Clean' }, duration: 45 },
        { step: 3, title: { fi: 'Sisätilan syväpuhdistus', en: 'Interior Deep Clean' }, duration: 45 },
        { step: 4, title: { fi: 'Vahauksen levitys', en: 'Wax Application' }, duration: 30 },
        { step: 5, title: { fi: 'Viimeistely ja tarkistus', en: 'Final Inspection' }, duration: 5 }
      ]
    }
  },
  autoService: {
    'Oil Change': {
      duration: { value: 30, unit: 'minutes' },
      pricing: { type: 'starting', price: 65 },
      features: ['Engine Oil Replacement', 'Oil Filter Change', 'Multi-point Inspection'],
      process: [
        { step: 1, title: { fi: 'Vanhan öljyn tyhjennys', en: 'Old Oil Drainage' }, duration: 10 },
        { step: 2, title: { fi: 'Suodattimen vaihto', en: 'Filter Replacement' }, duration: 10 },
        { step: 3, title: { fi: 'Uuden öljyn lisäys', en: 'New Oil Addition' }, duration: 10 }
      ]
    },
    'Brake Service': {
      duration: { value: 2, unit: 'hours' },
      pricing: { type: 'starting', price: 180 },
      features: ['Brake Pad Replacement', 'Rotor Inspection', 'Brake Fluid Check'],
      process: [
        { step: 1, title: { fi: 'Jarrujen tarkistus', en: 'Brake Inspection' }, duration: 30 },
        { step: 2, title: { fi: 'Palojen vaihto', en: 'Pad Replacement' }, duration: 60 },
        { step: 3, title: { fi: 'Testimatka', en: 'Test Drive' }, duration: 30 }
      ]
    }
  }
}

export const businessHours = {
  fi: {
    monday: { open: '08:00', close: '17:00', closed: false },
    tuesday: { open: '08:00', close: '17:00', closed: false },
    wednesday: { open: '08:00', close: '17:00', closed: false },
    thursday: { open: '08:00', close: '17:00', closed: false },
    friday: { open: '08:00', close: '17:00', closed: false },
    saturday: { open: '09:00', close: '15:00', closed: false },
    sunday: { open: '', close: '', closed: true }
  },
  kosovo: {
    monday: { open: '08:00', close: '18:00', closed: false },
    tuesday: { open: '08:00', close: '18:00', closed: false },
    wednesday: { open: '08:00', close: '18:00', closed: false },
    thursday: { open: '08:00', close: '18:00', closed: false },
    friday: { open: '08:00', close: '18:00', closed: false },
    saturday: { open: '09:00', close: '16:00', closed: false },
    sunday: { open: '', close: '', closed: true }
  },
  carwash: {
    monday: { open: '08:00', close: '20:00', closed: false },
    tuesday: { open: '08:00', close: '20:00', closed: false },
    wednesday: { open: '08:00', close: '20:00', closed: false },
    thursday: { open: '08:00', close: '20:00', closed: false },
    friday: { open: '08:00', close: '20:00', closed: false },
    saturday: { open: '08:00', close: '18:00', closed: false },
    sunday: { open: '10:00', close: '16:00', closed: false }
  }
}