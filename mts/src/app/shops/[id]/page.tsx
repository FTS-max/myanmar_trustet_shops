'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ShopDetailWithMap from '@/components/ShopDetail/ShopDetailWithMap';
import { getShopById } from '@/lib/data';

// Define the props type for the page component
type PageProps = {
  params: {
    id: string;
  };
};

// Shop detail page component
const ShopDetailPage = async ({ params }: PageProps) => {
  // Get shop directly from our data store
  const shop = getShopById(params.id);

  // If shop not found, return 404
  if (!shop) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/shops" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Shops
      </Link>

      {/* Use the enhanced ShopDetailWithMap component for a better UI */}
      <ShopDetailWithMap shop={shop} />
    </div>
  );
};

export default ShopDetailPage;