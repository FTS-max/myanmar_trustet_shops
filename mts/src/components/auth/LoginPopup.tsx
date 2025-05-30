'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export default function LoginPopup({ isOpen, onClose, onRegisterClick }: LoginPopupProps) {
  const router = useRouter();
  const [isPartnershipShop, setIsPartnershipShop] = useState(false);
  
  if (!isOpen) return null;
  
  const handleYesClick = () => {
    setIsPartnershipShop(true);
    // Continue to login
  };
  
  const handleLogin = () => {
    // Temporarily disabled Auth0 login
    // window.location.href = '/api/auth/login';
    alert('Auth0 login is temporarily unavailable. Please try again later.');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        
        {!isPartnershipShop ? (
          <>
            <p className="mb-4">Are you a partnership shop?</p>
            <div className="flex space-x-4">
              <button 
                onClick={handleYesClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Yes
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded border border-yellow-200">
              <p className="font-medium">Auth0 Integration Temporarily Unavailable</p>
              <p className="text-sm mt-1">The authentication system is currently being set up. Please check back later.</p>
            </div>
            <button 
              onClick={handleLogin}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
            >
              Login with Auth0
            </button>
            <p className="text-center">
              Don't have an account?{' '}
              <button 
                onClick={onRegisterClick}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
