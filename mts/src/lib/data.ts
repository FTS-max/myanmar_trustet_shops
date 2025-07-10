// Shop data types and sample data for Myanmar Trusted Shop

// Trust level enum
export enum TrustLevel {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum'
}

// Social media links type
export interface SocialMedia {
  [key: string]: string | undefined;
  facebook?: string;
  viber?: string;
  telegram?: string;
  instagram?: string;
  twitter?: string;
}

// Contact information type
export interface ContactInfo {
  phone: string[];
  email?: string;
  website?: string;
  socialMedia: SocialMedia;
}

// Location information type
export interface Location {
  address: string;
  township: string;
  city: string;
  state: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  googleMapsUrl: string;
}

// Review type
export interface Review {
  id: string;
  userName: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string; // ISO date string
}

// Business hours type
export interface BusinessHours {
  [key: string]: string | undefined;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  holidays?: string;
}

// Shop type
export interface Shop {
  id: string;
  name: string;
  description: string;
  trustLevel: TrustLevel;
  verificationDate: string; // ISO date string
  categories: string[];
  products: string[];
  services: string[];
  location: Location;
  contactInfo: ContactInfo;
  businessHours: BusinessHours;
  reviews: Review[];
  images: string[];
  logoUrl: string;
  establishedYear?: number;
  averageRating: number; // Calculated from reviews
  reviewCount: number;
}

// Sample shop data
export const shops: Shop[] = [
  {
    id: 'shop1',
    name: 'Golden Myanmar Handicrafts',
    description: 'Authentic Myanmar handicrafts and traditional art pieces made by local artisans. We specialize in lacquerware, wood carvings, and traditional textiles.',
    trustLevel: TrustLevel.GOLD,
    verificationDate: '2023-05-15',
    categories: ['Handicrafts', 'Art', 'Traditional', 'Souvenirs'],
    products: ['Lacquerware', 'Wood carvings', 'Textiles', 'Paintings', 'Jewelry'],
    services: ['Custom orders', 'International shipping', 'Gift wrapping'],
    location: {
      address: '123 Bogyoke Aung San Road',
      township: 'Pabedan',
      city: 'Yangon',
      state: 'Yangon Region',
      coordinates: {
        latitude: 16.7758,
        longitude: 96.1651
      },
      googleMapsUrl: 'https://maps.google.com/?q=16.7758,96.1651'
    },
    contactInfo: {
      phone: ['+95 9 123 456 789', '+95 1 234 567'],
      email: 'info@goldenmyanmarhandicrafts.com',
      website: 'https://www.goldenmyanmarhandicrafts.com',
      socialMedia: {
        facebook: 'https://facebook.com/goldenmyanmarhandicrafts',
        viber: 'viber://chat?number=%2B959123456789',
        telegram: 'https://t.me/goldenmyanmarhandicrafts',
        instagram: 'https://instagram.com/goldenmyanmarhandicrafts'
      }
    },
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '10:00 AM - 4:00 PM',
      holidays: 'Closed on Myanmar national holidays'
    },
    reviews: [
      {
        id: 'rev1',
        userName: 'John Smith',
        rating: 5,
        comment: 'Beautiful authentic handicrafts. The lacquerware I purchased is of excellent quality.',
        date: '2023-08-10'
      },
      {
        id: 'rev2',
        userName: 'Ma Hnin',
        rating: 4,
        comment: 'Good selection of traditional items. Prices are reasonable for the quality.',
        date: '2023-09-22'
      }
    ],
    images: [
      '/images/shops/golden-myanmar-1.jpg',
      '/images/shops/golden-myanmar-2.jpg',
      '/images/shops/golden-myanmar-3.jpg'
    ],
    logoUrl: '/images/logos/golden-myanmar-logo.png',
    establishedYear: 2010,
    averageRating: 4.5,
    reviewCount: 28
  },
  {
    id: 'shop2',
    name: 'Yangon Tech Hub',
    description: 'Your trusted electronics and computer store in Yangon. We offer genuine products with warranty and excellent after-sales service.',
    trustLevel: TrustLevel.PLATINUM,
    verificationDate: '2023-03-10',
    categories: ['Electronics', 'Computers', 'Mobile Phones', 'Accessories'],
    products: ['Laptops', 'Smartphones', 'Tablets', 'Computer Parts', 'Accessories'],
    services: ['Repairs', 'Custom PC Building', 'Technical Support', 'Home Delivery'],
    location: {
      address: '456 Merchant Street',
      township: 'Kyauktada',
      city: 'Yangon',
      state: 'Yangon Region',
      coordinates: {
        latitude: 16.7785,
        longitude: 96.1590
      },
      googleMapsUrl: 'https://maps.google.com/?q=16.7785,96.1590'
    },
    contactInfo: {
      phone: ['+95 9 987 654 321', '+95 1 987 654'],
      email: 'support@yangontechhub.com',
      website: 'https://www.yangontechhub.com',
      socialMedia: {
        facebook: 'https://facebook.com/yangontechhub',
        viber: 'viber://chat?number=%2B959987654321',
        telegram: 'https://t.me/yangontechhub'
      }
    },
    businessHours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '10:00 AM - 5:00 PM'
    },
    reviews: [
      {
        id: 'rev1',
        userName: 'Ko Aung',
        rating: 5,
        comment: 'Excellent service and genuine products. They helped me build a custom PC that perfectly fits my needs.',
        date: '2023-10-05'
      },
      {
        id: 'rev2',
        userName: 'Sarah Johnson',
        rating: 5,
        comment: 'Very professional staff and great after-sales support. Highly recommended!',
        date: '2023-11-15'
      }
    ],
    images: [
      '/images/shops/yangon-tech-1.jpg',
      '/images/shops/yangon-tech-2.jpg',
      '/images/shops/yangon-tech-3.jpg'
    ],
    logoUrl: '/images/logos/yangon-tech-logo.png',
    establishedYear: 2015,
    averageRating: 4.8,
    reviewCount: 42
  },
  {
    id: 'shop3',
    name: 'Mandalay Fashion House',
    description: 'Trendy and affordable clothing for men and women. We offer both traditional Myanmar attire and modern fashion items.',
    trustLevel: TrustLevel.SILVER,
    verificationDate: '2023-07-20',
    categories: ['Fashion', 'Clothing', 'Accessories', 'Traditional Wear'],
    products: ['Dresses', 'Shirts', 'Longyi', 'Bags', 'Shoes', 'Jewelry'],
    services: ['Tailoring', 'Personal Shopping', 'Gift Cards'],
    location: {
      address: '789 84th Street',
      township: 'Chanayethazan',
      city: 'Mandalay',
      state: 'Mandalay Region',
      coordinates: {
        latitude: 21.9747,
        longitude: 96.0836
      },
      googleMapsUrl: 'https://maps.google.com/?q=21.9747,96.0836'
    },
    contactInfo: {
      phone: ['+95 9 456 789 123', '+95 2 345 678'],
      email: 'info@mandalayfashion.com',
      socialMedia: {
        facebook: 'https://facebook.com/mandalayfashionhouse',
        viber: 'viber://chat?number=%2B959456789123',
        instagram: 'https://instagram.com/mandalayfashion'
      }
    },
    businessHours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    },
    reviews: [
      {
        id: 'rev1',
        userName: 'Ma Thida',
        rating: 4,
        comment: 'Good quality clothes at reasonable prices. The traditional wear section is particularly good.',
        date: '2023-09-12'
      },
      {
        id: 'rev2',
        userName: 'U Kyaw',
        rating: 3,
        comment: 'Nice selection but limited sizes for men. Service was good though.',
        date: '2023-10-30'
      }
    ],
    images: [
      '/images/shops/mandalay-fashion-1.jpg',
      '/images/shops/mandalay-fashion-2.jpg'
    ],
    logoUrl: '/images/logos/mandalay-fashion-logo.png',
    establishedYear: 2018,
    averageRating: 3.9,
    reviewCount: 15
  }
];

// Function to get shop by ID
export function getShopById(id: string): Shop | undefined {
  return shops.find(shop => shop.id === id);
}

// Function to get shops by category
export function getShopsByCategory(category: string): Shop[] {
  return shops.filter(shop => shop.categories.includes(category));
}

// Function to get shops by trust level
export function getShopsByTrustLevel(trustLevel: TrustLevel): Shop[] {
  return shops.filter(shop => shop.trustLevel === trustLevel);
}

// Function to get shops by location (city)
export function getShopsByCity(city: string): Shop[] {
  return shops.filter(shop => shop.location.city.toLowerCase() === city.toLowerCase());
}

// Function to search shops by name or description
export function searchShops(query: string): Shop[] {
  const lowercaseQuery = query.toLowerCase();
  return shops.filter(shop => 
    shop.name.toLowerCase().includes(lowercaseQuery) || 
    shop.description.toLowerCase().includes(lowercaseQuery) ||
    shop.products.some(product => product.toLowerCase().includes(lowercaseQuery)) ||
    shop.services.some(service => service.toLowerCase().includes(lowercaseQuery))
  );
}
