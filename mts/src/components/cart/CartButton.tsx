'use client';

import React, { useState } from 'react';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';

interface CartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    shopId: string;
    shopName: string;
    description?: string;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
}

const CartButton: React.FC<CartButtonProps> = ({ 
  product, 
  className = '', 
  size = 'md',
  variant = 'primary'
}) => {
  const { addToCart, isInCart, getCartItem, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inCart = isInCart(product.id);
  const cartItem = getCartItem(product.id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      if (inCart && cartItem) {
        // If already in cart, increase quantity
        updateQuantity(product.id, cartItem.quantity + 1);
      } else {
        // Add new item to cart
        addToCart(product);
      }
      
      // Show success state
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white border-transparent',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent',
    outline: 'bg-transparent hover:bg-purple-50 text-purple-600 border-purple-600 hover:border-purple-700'
  };

  // Icon size based on button size
  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  if (showSuccess) {
    return (
      <button
        disabled
        className={`
          inline-flex items-center justify-center gap-2 rounded-md border font-medium
          transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
          bg-green-600 text-white border-transparent
          ${sizeClasses[size]}
          ${className}
        `}
      >
        <FiCheck className={iconSize[size]} />
        Added to Cart!
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`
        inline-flex items-center justify-center gap-2 rounded-md border font-medium
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <FiShoppingCart className={iconSize[size]} />
      {isAdding ? (
        'Adding...'
      ) : inCart ? (
        `Add More (${cartItem?.quantity || 0} in cart)`
      ) : (
        'Add to Cart'
      )}
    </button>
  );
};

export default CartButton;