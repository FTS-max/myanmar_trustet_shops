import React from 'react'
import ShopCard from '@/components/shops/ShopCard'
import ShopFilter from '@/components/shops/ShopFilter'
import Pagination from '@/components/shops/Pagination'

// This would be replaced with actual data fetching in a real implementation
const getShops = async () => {
  // Mock data for demonstration
  return [
    {
      id: '1',
      name: 'ABC Electronics',
      description: 'Trusted electronics store in Yangon',
      address: '123 Main St, Yangon',
      trustLevel: 'Gold',
      categories: ['Electronics', 'Home Appliances'],
      imageUrl: '/images/shops/abc-electronics.jpg'
    },
    {
      id: '2',
      name: 'Fresh Grocery',
      description: 'Quality grocery store with fresh products',
      address: '456 Park Avenue, Mandalay',
      trustLevel: 'Silver',
      categories: ['Grocery', 'Food'],
      imageUrl: '/images/shops/fresh-grocery.jpg'
    },
    {
      id: '3',
      name: 'Fashion World',
      description: 'Latest fashion trends and accessories',
      address: '789 Style Street, Yangon',
      trustLevel: 'Gold',
      categories: ['Fashion', 'Accessories'],
      imageUrl: '/images/shops/fashion-world.jpg'
    },
    {
      id: '4',
      name: 'Tech Solutions',
      description: 'IT services and computer repairs',
      address: '101 Digital Road, Mandalay',
      trustLevel: 'Bronze',
      categories: ['IT Services', 'Repairs'],
      imageUrl: '/images/shops/tech-solutions.jpg'
    }
  ];
};

// Shop listing page component
const ShopsPage = async () => {
  const shops = await getShops();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Trusted Shops</h1>
      
      {/* Search and Filter Section */}
      <ShopFilter />
      
      {/* Shop Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
      
      {/* Pagination - Would be implemented with actual data */}
      <div className="mt-8 flex justify-center">
        <Pagination currentPage={1} totalPages={3} />
      </div>
    </div>
  );
};

export default ShopsPage;
