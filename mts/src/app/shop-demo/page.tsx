import React from 'react';
import Link from 'next/link';
import { ShopDetailWithMap } from '@/components/ShopDetail';
import { shops } from '@/lib/data';

const ShopDemoPage = () => {
  // Use the first shop from our data as an example
  const shop = shops[0];

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

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shop Detail Demo with Map Integration</h1>
        <p className="text-gray-600 mt-2">
          This page demonstrates the enhanced shop detail view with the MapSection component.
          It uses the proper data structure from the data.ts file.
        </p>
      </div>

      <ShopDetailWithMap shop={shop} />
    </div>
  );
};

export default ShopDemoPage;
