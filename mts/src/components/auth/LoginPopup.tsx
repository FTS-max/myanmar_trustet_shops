'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export default function LoginPopup({ isOpen, onClose, onRegisterClick }: LoginPopupProps) {
  const { login, isLoading } = useAuth();
  const [isPartnershipShop, setIsPartnershipShop] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  if (!isOpen) return null;
  
  const handleYesClick = () => {
    setIsPartnershipShop(true);
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the login function from our Auth context
    login();
    // Close the popup
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Login</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <p>Or</p>
              <button 
                onClick={() => login()}
                disabled={isLoading}
                className="mt-2 w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:bg-gray-600"
              >
                {isLoading ? 'Logging in...' : 'Continue with Auth0'}
              </button>
            </div>
            
            <p className="mt-4 text-center">
              Don&apos;t have an account?{' '}
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
