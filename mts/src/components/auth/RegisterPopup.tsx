'use client';

import { useState } from 'react';

interface RegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function RegisterPopup({ isOpen, onClose, onLoginClick }: RegisterPopupProps) {
  const [formData, setFormData] = useState({
    shopName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  if (!isOpen) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Redirect to Auth0 signup
    window.location.href = '/api/auth/signup';
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Register as Partnership Shop</h2>
        
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded border border-yellow-200">
          <p className="font-medium">Auth0 Integration Temporarily Unavailable</p>
          <p className="text-sm mt-1">The authentication system is currently being set up. Please check back later.</p>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
          >
            Register
          </button>
        </form>
        
        <p className="text-center">
          Already have an account?{' '}
          <button 
            onClick={onLoginClick}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}