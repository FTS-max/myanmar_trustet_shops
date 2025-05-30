'use client';

import React from 'react'
import Link from 'next/link'
// Note: We're not importing MapSection here because the data structure doesn't match yet

interface ShopDetailProps {
  shop: {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    verifiedSince: string;
    categories?: string[];
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
    location?: {
      lat: number;
      lng: number;
    };
    imageUrl?: string;
  };
}

const ShopDetail: React.FC<ShopDetailProps> = ({ shop }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden my-8">
      {/* Hero Section with Image and Basic Info */}
      <div className="relative">
        <div className="h-64 w-full bg-gradient-to-r from-blue-500 to-purple-600">
          {shop.imageUrl && (
            <div className="absolute inset-0 opacity-20">
              <img 
                src={shop.imageUrl} 
                alt="" 
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h1 className="text-3xl font-bold">{shop.name}</h1>
          <div className="flex items-center mt-2">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">
              Trusted
            </span>
            <span className="ml-4 text-sm opacity-80">Verified since: {shop.verifiedSince}</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="md:flex">
        {/* Left Column - Details */}
        <div className="p-8 md:w-2/3">
          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
            <p className="text-gray-600">{shop.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="mr-3 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Address</p>
                  <p className="text-gray-600">{shop.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <p className="text-gray-600">{shop.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">{shop.email}</p>
                </div>
              </div>
              
              {shop.website && (
                <div className="flex items-start">
                  <div className="mr-3 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Website</p>
                    <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {shop.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {shop.categories && shop.categories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {shop.categories.map((category, index) => (
                  <span key={index} className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Map and Social Media */}
        <div className="p-8 md:w-1/3 bg-gray-50 border-l border-gray-100">
          {shop.location && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe
                  title={`${shop.name} location`}
                  width="100%"
                  height="250"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${shop.location.lng}!3d${shop.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-xs text-gray-500">Coordinates: {shop.location.lat.toFixed(6)}, {shop.location.lng.toFixed(6)}</p>
                <a 
                  href={`https://maps.google.com/?q=${shop.location.lat},${shop.location.lng}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>
          )}
          
          {shop.socialMedia && Object.keys(shop.socialMedia).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Connect</h2>
              <div className="flex space-x-4">
                {shop.socialMedia.facebook && (
                  <a href={shop.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                )}
                {shop.socialMedia.instagram && (
                  <a href={shop.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                )}
                {shop.socialMedia.twitter && (
                  <a href={shop.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Myanmar Trusted Shop Verified</span>
            </div>
            <p className="mt-2 text-sm text-blue-700">This shop has been verified by our team and meets our trust standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
