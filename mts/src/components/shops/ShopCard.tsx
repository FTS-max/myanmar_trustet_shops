'use client';

import React from 'react'
import Link from 'next/link'

interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    description: string;
    address: string;
    categories?: string[];
    imageUrl?: string;
  };
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  return (
    <Link href={`/shops/${shop.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 bg-gray-300 relative">
          {shop.imageUrl ? (
            <img 
              src={shop.imageUrl} 
              alt={shop.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            Trusted
          </div>
        </div>
        
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{shop.name}</h2>
          <p className="text-gray-600 text-sm mb-2">{shop.address}</p>
          <p className="text-gray-700 mb-4 line-clamp-2">{shop.description}</p>
          
          {shop.categories && shop.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {shop.categories.map((category, index) => (
                <span key={index} className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
