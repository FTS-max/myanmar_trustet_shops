'use client';

import React from 'react';
import { FiBell, FiShoppingBag, FiUser, FiCheck, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { notificationService } from '@/services/notificationService';

const NotificationDemo: React.FC = () => {
  const { addNotification } = useNotifications();

  const demoNotifications = [
    {
      title: 'Order Placed Successfully',
      message: 'Your order from Golden Dragon Restaurant has been placed successfully.',
      type: 'order' as const,
      icon: FiShoppingBag,
      color: 'blue'
    },
    {
      title: 'Shop Application Approved',
      message: 'Congratulations! Your shop "Tech Paradise" has been approved and is now live.',
      type: 'success' as const,
      icon: FiCheck,
      color: 'green'
    },
    {
      title: 'New Review Received',
      message: 'Your shop "Fashion Hub" received a new 5-star review.',
      type: 'shop' as const,
      icon: FiUser,
      color: 'purple'
    },
    {
      title: 'Low Stock Alert',
      message: 'iPhone 15 Pro is running low in stock (3 remaining).',
      type: 'warning' as const,
      icon: FiAlertTriangle,
      color: 'yellow'
    },
    {
      title: 'Payment Failed',
      message: 'Payment for your order failed. Please try again.',
      type: 'error' as const,
      icon: FiAlertTriangle,
      color: 'red'
    },
    {
      title: 'New Promotion Available',
      message: 'Summer Sale - Get 30% off on selected items!',
      type: 'info' as const,
      icon: FiInfo,
      color: 'gray'
    }
  ];

  const handleAddNotification = async (demo: typeof demoNotifications[0]) => {
    await addNotification({
      title: demo.title,
      message: demo.message,
      type: demo.type,
      actionUrl: '/dashboard'
    });
  };

  const handleServiceNotification = async (type: string) => {
    switch (type) {
      case 'order':
        await notificationService.notifyOrderPlaced('ORD-001', 'Golden Dragon Restaurant');
        break;
      case 'payment':
        await notificationService.notifyPaymentReceived('ORD-001', 25000, 'MMK');
        break;
      case 'shop':
        await notificationService.notifyShopApproved('SHOP-001', 'Tech Paradise');
        break;
      case 'review':
        await notificationService.notifyNewReview('SHOP-001', 'Fashion Hub', 5);
        break;
      case 'stock':
        await notificationService.notifyLowStock('SHOP-001', 'iPhone 15 Pro', 3);
        break;
      case 'security':
        await notificationService.notifySecurityAlert('Login from new device', 'Yangon, Myanmar');
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FiBell className="w-6 h-6 mr-3 text-blue-600" />
            Notification System Demo
          </h2>
          <p className="text-gray-600 mt-2">
            Test the notification system by clicking the buttons below. Check the notification bell in the header to see the results.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manual Notifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Notifications</h3>
              <div className="space-y-3">
                {demoNotifications.map((demo, index) => {
                  const IconComponent = demo.icon;
                  const colorClasses = {
                    blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
                    green: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
                    purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
                    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100',
                    red: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100',
                    gray: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  };

                  return (
                    <button
                      key={index}
                      onClick={() => handleAddNotification(demo)}
                      className={`w-full p-3 border rounded-lg transition-colors duration-200 flex items-center space-x-3 text-left ${
                        colorClasses[demo.color as keyof typeof colorClasses]
                      }`}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{demo.title}</p>
                        <p className="text-sm opacity-75 truncate">{demo.message}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service Notifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Notifications</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleServiceNotification('order')}
                  className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-left"
                >
                  <p className="font-medium text-blue-900">Order Notification</p>
                  <p className="text-sm text-blue-700">Trigger order placed notification</p>
                </button>
                
                <button
                  onClick={() => handleServiceNotification('payment')}
                  className="w-full p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200 text-left"
                >
                  <p className="font-medium text-green-900">Payment Notification</p>
                  <p className="text-sm text-green-700">Trigger payment received notification</p>
                </button>
                
                <button
                  onClick={() => handleServiceNotification('shop')}
                  className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-left"
                >
                  <p className="font-medium text-purple-900">Shop Notification</p>
                  <p className="text-sm text-purple-700">Trigger shop approved notification</p>
                </button>
                
                <button
                  onClick={() => handleServiceNotification('review')}
                  className="w-full p-3 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-left"
                >
                  <p className="font-medium text-indigo-900">Review Notification</p>
                  <p className="text-sm text-indigo-700">Trigger new review notification</p>
                </button>
                
                <button
                  onClick={() => handleServiceNotification('stock')}
                  className="w-full p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors duration-200 text-left"
                >
                  <p className="font-medium text-yellow-900">Stock Alert</p>
                  <p className="text-sm text-yellow-700">Trigger low stock notification</p>
                </button>
                
                <button
                  onClick={() => handleServiceNotification('security')}
                  className="w-full p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-200 text-left"
                >
                  <p className="font-medium text-red-900">Security Alert</p>
                  <p className="text-sm text-red-700">Trigger security notification</p>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How to Use:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Click any button above to trigger a notification</li>
              <li>• Check the notification bell icon in the header (top right)</li>
              <li>• Click the bell to see all notifications in a dropdown</li>
              <li>• Visit <a href="/notifications" className="underline hover:text-blue-900">/notifications</a> for the full notifications page</li>
              <li>• Notifications persist in localStorage and sync with the API</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDemo;