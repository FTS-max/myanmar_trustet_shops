'use client';

import { useState, useRef } from 'react';
import { 
  FiUser, 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiGlobe,
  FiImage,
  FiSave,
  FiInfo,
  FiClock,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    shopName: 'Myanmar Treasures',
    ownerName: 'Aung Kyaw',
    email: 'myanmartreasures@example.com',
    phone: '+95 9123456789',
    alternatePhone: '+95 9987654321',
    address: '123 Merchant Street',
    township: 'Kyauktada',
    city: 'Yangon',
    state: 'Yangon Region',
    postalCode: '11181',
    website: 'https://myanmartreasures.com',
    facebook: 'https://facebook.com/myanmartreasures',
    instagram: 'https://instagram.com/myanmartreasures',
    description: 'We specialize in authentic Myanmar handicrafts, traditional clothing, and cultural artifacts. Our products are sourced directly from local artisans across Myanmar.',
    businessType: 'handicrafts',
    foundedYear: '2018',
    businessHours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM',
    acceptsReturns: true,
    returnPolicy: 'We accept returns within 7 days of delivery. Items must be unused and in original packaging.',
    shippingInfo: 'Free shipping within Yangon. Nationwide shipping available for a fee based on location.',
  });

  // Business type options
  const businessTypes = [
    { id: 'handicrafts', name: 'Handicrafts & Artisanal Products' },
    { id: 'clothing', name: 'Traditional Clothing & Textiles' },
    { id: 'food', name: 'Food & Beverages' },
    { id: 'jewelry', name: 'Jewelry & Accessories' },
    { id: 'home', name: 'Home Decor & Furnishings' },
    { id: 'beauty', name: 'Beauty & Wellness Products' },
    { id: 'art', name: 'Art & Collectibles' },
    { id: 'books', name: 'Books & Stationery' },
    { id: 'other', name: 'Other' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' && (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogoUpload = () => {
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // In a real implementation, you would upload the file to your server/cloud storage
      // and update the shop's logo URL in the database
      console.log('File selected:', file.name);
      
      // For demo purposes, show a success message
      setMessage({ 
        type: 'success', 
        text: `Logo "${file.name}" uploaded successfully! In a real implementation, this would be processed and stored.` 
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ 
        type: 'success', 
        text: 'Shop profile updated successfully!' 
      });
      
      // Scroll to top to show the message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
    
    // In a real implementation, you would call your API here
    // const response = await updateShopProfile(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shop Profile</h1>
      
      {/* Success/Error Message */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.type === 'success' ? (
            <div className="flex items-center">
              <FiCheckCircle className="mr-2" />
              {message.text}
            </div>
          ) : (
            <div className="flex items-center">
              <FiAlertCircle className="mr-2" />
              {message.text}
            </div>
          )}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          {/* Shop Logo Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop Logo & Branding</h2>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* This would display the actual logo in a real implementation */}
                <FiImage className="text-gray-400" size={48} />
              </div>
              <div>
                <button 
                  type="button" 
                  onClick={handleLogoUpload}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center transition duration-200"
                >
                  <FiImage className="mr-2" />
                  Upload Logo
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Recommended size: 500x500 pixels. Max file size: 2MB.
                </p>
              </div>
            </div>
          </div>
          
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="shopName">
                  Shop Name*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ownerName">
                  Owner Name*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email Address*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                  Phone Number*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="alternatePhone">
                  Alternate Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="alternatePhone"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="businessType">
                  Business Type*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiInfo className="text-gray-400" />
                  </div>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
                    required
                  >
                    {businessTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="foundedYear">
                  Founded Year
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiClock className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="foundedYear"
                    name="foundedYear"
                    value={formData.foundedYear}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g. 2018"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Address Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                  Street Address*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="township">
                  Township*
                </label>
                <input
                  type="text"
                  id="township"
                  name="township"
                  value={formData.township}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="city">
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="state">
                  State/Region*
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="postalCode">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
          
          {/* Online Presence */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Online Presence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="website">
                  Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiGlobe className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="facebook">
                  Facebook
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-bold">f</span>
                  </div>
                  <input
                    type="url"
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://facebook.com/"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="instagram">
                  Instagram
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-bold">Ig</span>
                  </div>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://instagram.com/"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Shop Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                  Shop Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">Describe your shop, products, and what makes them special.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="businessHours">
                  Business Hours
                </label>
                <input
                  type="text"
                  id="businessHours"
                  name="businessHours"
                  value={formData.businessHours}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. Mon-Fri: 9:00 AM - 6:00 PM"
                />
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="acceptsReturns"
                    name="acceptsReturns"
                    checked={formData.acceptsReturns}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="acceptsReturns" className="ml-2 block text-sm text-gray-700">
                    Accept Returns
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="returnPolicy">
                  Return Policy
                </label>
                <textarea
                  id="returnPolicy"
                  name="returnPolicy"
                  value={formData.returnPolicy}
                  onChange={handleChange}
                  rows={3}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="shippingInfo">
                  Shipping Information
                </label>
                <textarea
                  id="shippingInfo"
                  name="shippingInfo"
                  value={formData.shippingInfo}
                  onChange={handleChange}
                  rows={3}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
