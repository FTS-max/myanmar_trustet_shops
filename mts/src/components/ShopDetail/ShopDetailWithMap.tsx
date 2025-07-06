'use client';

import React from 'react';
import { MapSection } from './index';
import { Shop } from '@/lib/data';
import Image from 'next/image';

interface ShopDetailWithMapProps {
  shop: Shop;
}

const ShopDetailWithMap: React.FC<ShopDetailWithMapProps> = ({ shop }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <div className="h-48 w-full md:w-48 bg-gray-300 flex items-center justify-center">
            {shop.logoUrl ? (
              <Image
                src={shop.logoUrl}
                alt={shop.name}
                width={192}
                height={192}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">{shop.name}</h1>
            <div className="ml-4 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
              {shop.trustLevel} Trusted
            </div>
          </div>
          
          <p className="mt-2 text-gray-600">{shop.description}</p>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Address:</span> {shop.location.address}, {shop.location.township}, {shop.location.city}, {shop.location.state}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {shop.contactInfo.phone.join(', ')}
              </p>
              {shop.contactInfo.email && (
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {shop.contactInfo.email}
                </p>
              )}
              {shop.contactInfo.website && (
                <p className="text-gray-600">
                  <span className="font-medium">Website:</span> 
                  <a href={shop.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {shop.contactInfo.website}
                  </a>
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Trust Verification</h2>
            <p className="mt-2 text-gray-600">Verified since: {shop.verificationDate}</p>
            <p className="text-gray-600">Trust Level: {shop.trustLevel}</p>
            <p className="text-gray-600">Average Rating: {shop.averageRating} ({shop.reviewCount} reviews)</p>
          </div>
          
          {shop.categories && shop.categories.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {shop.categories.map((category, index) => (
                  <span key={index} className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {shop.contactInfo.socialMedia && Object.values(shop.contactInfo.socialMedia).some(value => value) && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Social Media</h2>
              <div className="mt-2 flex space-x-4">
                {shop.contactInfo.socialMedia.facebook && (
                  <a href={shop.contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                )}
                {shop.contactInfo.socialMedia.instagram && (
                  <a href={shop.contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                )}
                {shop.contactInfo.socialMedia.twitter && (
                  <a href={shop.contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                )}
                {shop.contactInfo.socialMedia.viber && (
                  <a href={shop.contactInfo.socialMedia.viber} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.4 0C5.1 0 0 5.1 0 11.4c0 1.7.4 3.4 1 5 .1.3.3.6.4.9.1.2.2.4.3.5.2.3.3.6.5.8.3.5.7.9 1 1.4.1.1.2.2.2.3.2.3.5.5.7.8.1.1.2.2.3.3.3.3.5.5.8.7.1.1.2.2.4.3.3.2.6.4.9.7.1.1.3.2.4.2.3.2.7.4 1 .6.1.1.3.1.4.2.4.2.8.4 1.2.5.1 0 .2.1.3.1.4.1.9.3 1.3.4.1 0 .3.1.4.1.4.1.8.1 1.2.2h.4c.5 0 1 .1 1.5.1 6.3 0 11.4-5.1 11.4-11.4C22.8 5.1 17.7 0 11.4 0zm4.5 17.5c-.2.2-.5.3-.7.4-.3.1-.5.2-.8.3-.7.1-1.5.1-2.3-.1-.9-.2-1.7-.5-2.5-.9-.6-.3-1.2-.7-1.7-1.1-.5-.4-1-.8-1.4-1.3-.4-.4-.8-.9-1.1-1.4-.3-.5-.6-1-.8-1.5-.2-.5-.4-1-.5-1.5-.1-.5-.1-1-.1-1.5 0-.5.1-.9.2-1.4.1-.4.3-.9.5-1.3.2-.4.6-.7 1-.9.1 0 .2-.1.3-.1.2 0 .4 0 .6.1.2.1.3.3.4.5l.7 1.8c.1.2.1.4.1.6 0 .2-.1.4-.2.6-.1.2-.3.4-.4.5-.2.1-.2.2-.2.3 0 .1 0 .2.1.3.2.4.5.8.8 1.2.3.4.7.7 1.1 1 .1.1.2.1.3.1.1 0 .2-.1.3-.2.1-.1.3-.3.4-.4.1-.1.3-.3.5-.3.1 0 .3 0 .4.1.3.1.6.3.9.4.3.1.6.3.9.4.1.1.3.1.4.2.1.1.2.2.2.4v.5c0 .4-.2.8-.5 1.1z"/>
                    </svg>
                  </a>
                )}
                {shop.contactInfo.socialMedia.telegram && (
                  <a href={shop.contactInfo.socialMedia.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Map Section */}
      <div className="border-t border-gray-200">
        <MapSection location={shop.location} />
      </div>

      {/* Business Hours Section */}
      <div className="p-8 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shop.businessHours.monday && (
            <div className="flex justify-between">
              <span className="font-medium">Monday:</span>
              <span>{shop.businessHours.monday}</span>
            </div>
          )}
          {shop.businessHours.tuesday && (
            <div className="flex justify-between">
              <span className="font-medium">Tuesday:</span>
              <span>{shop.businessHours.tuesday}</span>
            </div>
          )}
          {shop.businessHours.wednesday && (
            <div className="flex justify-between">
              <span className="font-medium">Wednesday:</span>
              <span>{shop.businessHours.wednesday}</span>
            </div>
          )}
          {shop.businessHours.thursday && (
            <div className="flex justify-between">
              <span className="font-medium">Thursday:</span>
              <span>{shop.businessHours.thursday}</span>
            </div>
          )}
          {shop.businessHours.friday && (
            <div className="flex justify-between">
              <span className="font-medium">Friday:</span>
              <span>{shop.businessHours.friday}</span>
            </div>
          )}
          {shop.businessHours.saturday && (
            <div className="flex justify-between">
              <span className="font-medium">Saturday:</span>
              <span>{shop.businessHours.saturday}</span>
            </div>
          )}
          {shop.businessHours.sunday && (
            <div className="flex justify-between">
              <span className="font-medium">Sunday:</span>
              <span>{shop.businessHours.sunday}</span>
            </div>
          )}
          {shop.businessHours.holidays && (
            <div className="flex justify-between col-span-1 md:col-span-2 mt-2 text-red-600">
              <span className="font-medium">Holidays:</span>
              <span>{shop.businessHours.holidays}</span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {shop.reviews && shop.reviews.length > 0 && (
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h2>
          <div className="space-y-6">
            {shop.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{review.userName}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopDetailWithMap;
