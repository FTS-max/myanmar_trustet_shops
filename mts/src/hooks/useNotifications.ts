import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'order' | 'shop';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationHook {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  removeNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

export const useNotifications = (): NotificationHook => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/notifications');
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      const formattedNotifications = data.notifications.map((n: Notification) => ({
        ...n,
        id: n.id,
        timestamp: new Date(n.timestamp)
      }));

      setNotifications(formattedNotifications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Add new notification
  const addNotification = useCallback(async (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    if (!user) return;

    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      if (!response.ok) {
        throw new Error('Failed to create notification');
      }

      const newNotification = await response.json();
      const formattedNotification = {
        ...newNotification,
        id: newNotification._id,
        timestamp: new Date(newNotification.timestamp)
      };

      setNotifications(prev => [formattedNotification, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add notification');
      console.error('Error adding notification:', err);
    }
  }, [user]);

  // Mark notification as read
  const markAsRead = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId: id, read: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }

      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark as read');
      console.error('Error marking notification as read:', err);
    }
  }, [user]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markAllAsRead: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }

      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark all as read');
      console.error('Error marking all notifications as read:', err);
    }
  }, [user]);

  // Remove notification
  const removeNotification = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/notifications?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }

      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove notification');
      console.error('Error removing notification:', err);
    }
  }, [user]);

  // Clear all notifications
  const clearAll = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/notifications?clearAll=true', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to clear all notifications');
      }

      setNotifications([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear notifications');
      console.error('Error clearing all notifications:', err);
    }
  }, [user]);

  // Refresh notifications
  const refreshNotifications = useCallback(async () => {
    await fetchNotifications();
  }, [fetchNotifications]);

  // Load notifications on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [user, fetchNotifications]);

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    refreshNotifications,
  };
};