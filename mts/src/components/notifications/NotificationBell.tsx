'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiX, FiCheck, FiTrash2, FiShoppingBag, FiUser, FiInfo, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { useNotifications } from './NotificationProvider';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <FiShoppingBag className="w-4 h-4 text-blue-500" />;
      case 'shop':
        return <FiUser className="w-4 h-4 text-purple-500" />;
      case 'success':
        return <FiCheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <FiAlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <FiAlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <FiInfo className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-50 border-blue-200';
      case 'shop':
        return 'bg-purple-50 border-purple-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Navigate to action URL if provided
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <FiCheck className="w-4 h-4" />
                  <span>Mark all read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center space-x-1"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Clear all</span>
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <FiBell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No notifications yet</p>
                <p className="text-sm">We'll notify you when something important happens</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-gray-600 ml-2"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/notifications';
                }}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;