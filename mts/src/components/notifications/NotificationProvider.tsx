'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'order' | 'shop';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  shopId?: string;
  orderId?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useUser();
  const isAuthenticated = !!user;

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedNotifications = localStorage.getItem(`notifications_${user.sub}`);
      if (savedNotifications) {
        try {
          const parsed: Notification[] = JSON.parse(savedNotifications);
          setNotifications(parsed.map((n) => ({
            ...n,
            timestamp: new Date(n.timestamp)
          })));
        } catch (error) {
          console.error('Error loading notifications:', error);
        }
      }
    }
  }, [isAuthenticated, user]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user && notifications.length > 0) {
      localStorage.setItem(`notifications_${user.sub}`, JSON.stringify(notifications));
    }
  }, [notifications, isAuthenticated, user]);

  // Fetch notifications from server
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchNotifications();
      
      // Set up polling for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications.map((n: Notification) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Send to server
    if (isAuthenticated) {
      fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNotification)
      }).catch(error => console.error('Error saving notification:', error));
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );

    // Update on server
    if (isAuthenticated) {
      fetch(`/api/notifications`, {
        method: 'PATCH',
        body: JSON.stringify({ notificationId: id, read: true }),
      }).catch(error => console.error('Error marking notification as read:', error));
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );

    // Update on server
    if (isAuthenticated) {
      fetch('/api/notifications', {
        method: 'PATCH',
        body: JSON.stringify({ markAllAsRead: true }),
      }).catch(error => console.error('Error marking all notifications as read:', error));
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));

    // Remove from server
    if (isAuthenticated) {
      fetch(`/api/notifications?id=${id}`, {
        method: 'DELETE'
      }).catch(error => console.error('Error removing notification:', error));
    }
  };

  const clearAll = () => {
    setNotifications([]);

    // Clear on server
    if (isAuthenticated) {
      fetch('/api/notifications?clearAll=true', {
        method: 'DELETE'
      }).catch(error => console.error('Error clearing notifications:', error));
    }
  };

  const refreshNotifications = async () => {
    await fetchNotifications();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    refreshNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}