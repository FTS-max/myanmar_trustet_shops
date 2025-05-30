'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/auth';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Partnership Shop Dashboard</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}</h2>
        <p className="mb-2">Email: {user?.email}</p>
        
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Your Shop Information</h3>
          <p className="text-gray-600">Manage your shop details and listings here.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Shop Profile</h3>
          <p className="text-gray-600 mb-4">Update your shop information and contact details.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Products</h3>
          <p className="text-gray-600 mb-4">Manage your product listings and inventory.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Products
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Analytics</h3>
          <p className="text-gray-600 mb-4">View your shop performance and customer insights.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
