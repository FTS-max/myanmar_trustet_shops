'use client';

import React from 'react';

interface MapSectionProps {
  location: {
    address: string;
    township: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    googleMapsUrl: string;
  };
}

const MapSection: React.FC<MapSectionProps> = ({ location }) => {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
      
      <div className="mb-4">
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Address:</span> {location.address}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Township:</span> {location.township}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">City:</span> {location.city}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">State:</span> {location.state}
        </p>
      </div>
      
      <div className="h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center mb-4 relative overflow-hidden">
        {/* Placeholder for actual map integration */}
        <div className="absolute inset-0 bg-gray-200 opacity-50 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-24 w-24 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 text-center">
          <p className="text-sm text-gray-600">
            Coordinates: {location.coordinates.latitude.toFixed(6)}, {location.coordinates.longitude.toFixed(6)}
          </p>
        </div>
      </div>
      
      <a 
        href={location.googleMapsUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" 
          />
        </svg>
        View on Google Maps
      </a>
    </div>
  );
};

export default MapSection;
