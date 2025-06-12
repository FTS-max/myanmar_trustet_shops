'use client';

import React, { useState, useEffect } from 'react';
import { FiBell, FiCheck, FiTrash2, FiRefreshCw, FiFilter, FiSearch } from 'react-icons/fi';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { formatDistanceToNow } from 'date-fns';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

interface NotificationFilters {
  type: string;
  read: string;
  search: string;
}

const NotificationsPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll, refreshNotifications } = useNotifications();
  
  const [filters, setFilters] = useState<NotificationFilters>({
    type: 'all',
    read: 'all',
    search: ''
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isLoading, router]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshNotifications();
    setIsRefreshing(false);
  };

  const filteredNotifications = notifications.filter(notification => {
    // Type filter
    if (filters.type !== 'all' && notification.type !== filters.type) {
      return false;
    }
    
    // Read status filter
    if (filters.read === 'read' && !notification.read) {
      return false;
    }
    if (filters.read === 'unread' && notification.read) {
      return false;
    }
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        notification.title.toLowerCase().includes(searchLower) ||
        notification.message.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const getNotificationIcon = (type: string) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case 'order':
        return <FiBell className={`${iconClass} text-blue-500`} />;
      case 'shop':
        return <FiBell className={`${iconClass} text-purple-500`} />;
      case 'success':
        return <FiCheck className={`${iconClass} text-green-500`} />;
      case 'warning':
        return <FiBell className={`${iconClass} text-yellow-500`} />;
      case 'error':
        return <FiBell className={`${iconClass} text-red-500`} />;
      default:
        return <FiBell className={`${iconClass} text-gray-500`} />;
    }
  };

  const getNotificationBgColor = (type: string, read: boolean) => {
    const baseClass = read ? 'bg-white' : 'bg-blue-50';
    const borderClass = read ? 'border-gray-200' : 'border-blue-200';
    return `${baseClass} ${borderClass}`;
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FiBell className="w-8 h-8 mr-3 text-blue-600" />
                Notifications
              </h1>
              <p className="text-gray-600 mt-2">
                {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <FiCheck className="w-4 h-4" />
                  <span>Mark all read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Clear all</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4 flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <FiFilter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            
            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="order">Order</option>
              <option value="shop">Shop</option>
            </select>
            
            {/* Read Status Filter */}
            <select
              value={filters.read}
              onChange={(e) => setFilters({ ...filters, read: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FiBell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {notifications.length === 0 ? 'No notifications yet' : 'No notifications match your filters'}
              </h3>
              <p className="text-gray-500">
                {notifications.length === 0 
                  ? "We'll notify you when something important happens"
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  getNotificationBgColor(notification.type, notification.read)
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          notification.type === 'success' ? 'bg-green-100 text-green-800' :
                          notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          notification.type === 'error' ? 'bg-red-100 text-red-800' :
                          notification.type === 'order' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'shop' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;