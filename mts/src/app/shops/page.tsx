import React from 'react'
import ShopCard from '@/components/shops/ShopCard'
import ShopFilter from '@/components/shops/ShopFilter'
import Pagination from '@/components/shops/Pagination'
import { shops } from '@/lib/data'

// Get shops with server-side data fetching
const getShops = async () => {
  // In a real implementation, this would fetch from a database
  // For now, we're using the data from our data.ts file
  return shops.map(shop => ({
    id: shop.id,
    name: shop.name,
    description: shop.description,
    address: `${shop.location.address}, ${shop.location.township}, ${shop.location.city}`,
    trustLevel: shop.trustLevel,
    categories: shop.categories,
    imageUrl: shop.images[0] || '/images/placeholder-shop.jpg'
  }));
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
