'use client';

import React from 'react'

interface ShopFilterProps {
  onFilterChange?: (filters: {
    search: string;
    category: string;
    trustLevel: string;
  }) => void;
}

const ShopFilter: React.FC<ShopFilterProps> = ({ onFilterChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would gather form values and call onFilterChange
    // For now, this is just a UI component
    if (onFilterChange) {
      const formData = new FormData(e.target as HTMLFormElement);
      onFilterChange({
        search: formData.get('search') as string || '',
        category: formData.get('category') as string || '',
        trustLevel: formData.get('trustLevel') as string || ''
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search shops..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="w-full md:w-48">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Grocery">Grocery</option>
            <option value="Fashion">Fashion</option>
            <option value="IT Services">IT Services</option>
          </select>
        </div>
        
        <div className="w-full md:w-48">
          <label htmlFor="trustLevel" className="block text-sm font-medium text-gray-700 mb-1">Trust Level</label>
          <select
            id="trustLevel"
            name="trustLevel"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Levels</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>
        
        <div className="w-full md:w-48 flex items-end">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShopFilter;
