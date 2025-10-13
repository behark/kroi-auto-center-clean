export interface Car {
  _id: string;
  slug: {
    current: string;
  };
  name: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  fuel: string;
  transmission: string;
  mileage: number;
  image: {
    asset: {
      url: string;
    };
  };
  gallery?: {
    asset: {
      url: string;
    };
  }[];
  description: string;
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  condition: 'new' | 'used' | 'certified';
  category: string;
  available: boolean;
  featured: boolean;
}

export interface ContactInquiry {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  carId?: string;
  type: 'general' | 'car_inquiry' | 'test_drive' | 'trade_in';
  createdAt?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  carPurchased?: string;
  image?: {
    asset: {
      url: string;
    };
  };
  createdAt: string;
}