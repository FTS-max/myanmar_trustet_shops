'use client';

import { useState } from 'react';
import { FiUser, FiLock, FiMail, FiPhone, FiShield, FiSave } from 'react-icons/fi';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    name: 'Shop Owner',
    email: 'owner@example.com',
    phone: '+95 9123456789',
    shopName: 'My Myanmar Shop',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ 
        type: 'success', 
        text: 'Account information updated successfully!' 
      });
    }, 1500);
    // In a real implementation, you would call your API here
    // const response = await updateUserProfile(formData);
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setIsLoading(false);
      setMessage({ 
        type: 'error', 
        text: 'New passwords do not match!' 
      });
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ 
        type: 'success', 
        text: 'Password updated successfully!' 
      });
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }, 1500);
    
    // In a real implementation, you would call your API here
    // const response = await updatePassword(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Partner Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <ul>
              <li 
                className={`p-3 rounded-md cursor-pointer mb-2 ${activeTab === 'account' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('account')}
              >
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  <span>Account Information</span>
                </div>
              </li>
              <li 
                className={`p-3 rounded-md cursor-pointer ${activeTab === 'security' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('security')}
              >
                <div className="flex items-center">
                  <FiLock className="mr-2" />
                  <span>Security</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Success/Error Message */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}
            
            {/* Account Information Tab */}
            {activeTab === 'account' && (
              <form onSubmit={handleAccountUpdate}>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Account Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                      Email Address
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
                      Phone Number
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
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="shopName">
                      Shop Name
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
                </div>
                
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
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordUpdate}>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Security Settings</h2>
                
                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="currentPassword">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="newPassword">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                        minLength={8}
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Password must be at least 8 characters long</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-md font-medium mb-4 flex items-center">
                      <FiShield className="mr-2 text-purple-600" />
                      Additional Security Options
                    </h3>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="twoFactor"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-700">
                        Enable two-factor authentication
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="loginNotifications"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="loginNotifications" className="ml-2 block text-sm text-gray-700">
                        Receive email notifications for new login attempts
                      </label>
                    </div>
                  </div>
                </div>
                
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
                        Updating...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
