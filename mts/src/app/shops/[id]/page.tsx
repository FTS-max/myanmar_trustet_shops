import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ShopDetail from '@/components/shops/ShopDetail'

// This would be replaced with actual data fetching in a real implementation
const getShopById = async (id) => {
  // Mock data for demonstration
  const shops = [
    {
      id: '1',
      name: 'ABC Electronics',
      description: 'Trusted electronics store in Yangon',
      address: '123 Main St, Yangon',
      phone: '+95 9 123 456 789',
      email: 'contact@abcelectronics.com',
      website: 'https://abcelectronics.com',
      trustLevel: 'Gold',
      verifiedSince: '2022-01-15',
      categories: ['Electronics', 'Home Appliances'],
      socialMedia: {
        facebook: 'https://facebook.com/abcelectronics',
        instagram: 'https://instagram.com/abcelectronics'
      },
      location: {
        lat: 16.8409,
        lng: 96.1735
      },
      imageUrl: '/images/shops/abc-electronics.jpg'
    },
    {
      id: '2',
      name: 'Fresh Grocery',
      description: 'Quality grocery store with fresh products',
      address: '456 Park Avenue, Mandalay',
      phone: '+95 9 987 654 321',
      email: 'info@freshgrocery.com',
      website: 'https://freshgrocery.com',
      trustLevel: 'Silver',
      verifiedSince: '2022-03-20',
      categories: ['Grocery', 'Food'],
      socialMedia: {
        facebook: 'https://facebook.com/freshgrocery',
        instagram: 'https://instagram.com/freshgrocery'
      },
      location: {
        lat: 21.9588,
        lng: 96.0891
      },
      imageUrl: '/images/shops/fresh-grocery.jpg'
    }
  ];
  
  return shops.find(shop => shop.id === id);
};

// Shop detail page component
const ShopDetailPage = async ({ params }) => {
  const shop = await getShopById(params.id);
  
  if (!shop) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/shops" className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Shops
        </Link>
      </div>

      <ShopDetail shop={shop} />
    </div>
  );
};

export default ShopDetailPage;
