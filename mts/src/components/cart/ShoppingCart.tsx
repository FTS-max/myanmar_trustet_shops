'use client';

import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  shopId: string;
  shopName: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mts_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('mts_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Here you would integrate with your payment system
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful checkout
      clearCart();
      alert('Order placed successfully!');
      onClose();
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-6">
            <h2 className="text-lg font-medium text-gray-900">
              Shopping Cart ({getTotalItems()})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FiShoppingCart className="h-12 w-12 mb-4" />
                <p>Your cart is empty</p>
                <p className="text-sm">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">{item.shopName}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {item.price.toLocaleString()} MMK
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-400 hover:text-red-500 ml-2"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>{getTotalPrice().toLocaleString()} MMK</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-purple-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="text-purple-600 font-medium hover:text-purple-500"
                    onClick={onClose}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;