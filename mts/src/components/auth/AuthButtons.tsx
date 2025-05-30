'use client';

import { useState } from 'react';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';

export default function AuthButtons() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLoginPopup = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegisterPopup = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closePopups = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <>
      {/* Auth Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <button 
          onClick={openLoginPopup}
          className="text-purple-600 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors duration-200"
        >
          Log in
        </button>
        <button 
          onClick={openRegisterPopup}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Sign up
        </button>
      </div>

      {/* Mobile menu button with auth options */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={openLoginPopup}
          className="text-purple-600 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors duration-200 mr-2"
        >
          Log in
        </button>
        <button 
          onClick={openRegisterPopup}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Sign up
        </button>
      </div>

      {/* Login Popup */}
      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={closePopups} 
        onRegisterClick={openRegisterPopup} 
      />

      {/* Register Popup */}
      <RegisterPopup 
        isOpen={isRegisterOpen} 
        onClose={closePopups} 
        onLoginClick={openLoginPopup} 
      />
    </>
  );
}
