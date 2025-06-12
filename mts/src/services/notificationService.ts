// Notification Service for triggering notifications from various parts of the application

export interface NotificationData {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'order' | 'shop';
  actionUrl?: string;
  metadata?: Record<string, any>;
  targetUserId?: string; // For admin notifications to specific users
}

class NotificationService {
  private static instance: NotificationService;
  private baseUrl = '/api/notifications';

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Send notification to current user
  async notify(data: NotificationData): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type: data.type || 'info'
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return false;
    }
  }

  // Predefined notification types for common scenarios
  async notifyOrderPlaced(orderId: string, shopName: string): Promise<boolean> {
    return this.notify({
      title: 'Order Placed Successfully',
      message: `Your order from ${shopName} has been placed successfully.`,
      type: 'order',
      actionUrl: `/orders/${orderId}`,
      metadata: { orderId, shopName }
    });
  }

  async notifyOrderStatusUpdate(orderId: string, status: string, shopName: string): Promise<boolean> {
    const statusMessages = {
      confirmed: 'Your order has been confirmed by the shop.',
      preparing: 'Your order is being prepared.',
      ready: 'Your order is ready for pickup/delivery.',
      completed: 'Your order has been completed.',
      cancelled: 'Your order has been cancelled.'
    };

    return this.notify({
      title: 'Order Status Update',
      message: statusMessages[status as keyof typeof statusMessages] || `Order status updated to ${status}.`,
      type: status === 'cancelled' ? 'warning' : 'order',
      actionUrl: `/orders/${orderId}`,
      metadata: { orderId, status, shopName }
    });
  }

  async notifyShopApproved(shopId: string, shopName: string): Promise<boolean> {
    return this.notify({
      title: 'Shop Application Approved',
      message: `Congratulations! Your shop "${shopName}" has been approved and is now live.`,
      type: 'success',
      actionUrl: `/partner/dashboard`,
      metadata: { shopId, shopName }
    });
  }

  async notifyShopRejected(shopId: string, shopName: string, reason?: string): Promise<boolean> {
    return this.notify({
      title: 'Shop Application Rejected',
      message: `Unfortunately, your shop application for "${shopName}" has been rejected.${reason ? ` Reason: ${reason}` : ''}`,
      type: 'error',
      actionUrl: `/partner/applications`,
      metadata: { shopId, shopName, reason }
    });
  }

  async notifyNewReview(shopId: string, shopName: string, rating: number): Promise<boolean> {
    return this.notify({
      title: 'New Review Received',
      message: `Your shop "${shopName}" received a new ${rating}-star review.`,
      type: 'shop',
      actionUrl: `/partner/reviews`,
      metadata: { shopId, shopName, rating }
    });
  }

  async notifyLowStock(shopId: string, productName: string, currentStock: number): Promise<boolean> {
    return this.notify({
      title: 'Low Stock Alert',
      message: `${productName} is running low in stock (${currentStock} remaining).`,
      type: 'warning',
      actionUrl: `/partner/inventory`,
      metadata: { shopId, productName, currentStock }
    });
  }

  async notifyPaymentReceived(orderId: string, amount: number, currency: string = 'MMK'): Promise<boolean> {
    return this.notify({
      title: 'Payment Received',
      message: `Payment of ${amount} ${currency} has been received for your order.`,
      type: 'success',
      actionUrl: `/orders/${orderId}`,
      metadata: { orderId, amount, currency }
    });
  }

  async notifyPaymentFailed(orderId: string, reason?: string): Promise<boolean> {
    return this.notify({
      title: 'Payment Failed',
      message: `Payment for your order failed.${reason ? ` Reason: ${reason}` : ''} Please try again.`,
      type: 'error',
      actionUrl: `/orders/${orderId}/payment`,
      metadata: { orderId, reason }
    });
  }

  async notifyPromotionStarted(promotionId: string, title: string, discount: number): Promise<boolean> {
    return this.notify({
      title: 'New Promotion Available',
      message: `${title} - Get ${discount}% off on selected items!`,
      type: 'info',
      actionUrl: `/promotions/${promotionId}`,
      metadata: { promotionId, title, discount }
    });
  }

  async notifyAccountVerified(): Promise<boolean> {
    return this.notify({
      title: 'Account Verified',
      message: 'Your account has been successfully verified. You can now access all features.',
      type: 'success',
      actionUrl: '/dashboard'
    });
  }

  async notifySecurityAlert(action: string, location?: string): Promise<boolean> {
    return this.notify({
      title: 'Security Alert',
      message: `${action}${location ? ` from ${location}` : ''}. If this wasn't you, please secure your account.`,
      type: 'warning',
      actionUrl: '/account/security',
      metadata: { action, location }
    });
  }

  // Admin notifications (requires admin privileges)
  async notifyUser(userId: string, data: NotificationData): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          targetUserId: userId,
          type: data.type || 'info'
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send notification to user:', error);
      return false;
    }
  }

  // Bulk notifications (for announcements)
  async notifyAllUsers(data: NotificationData): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type: data.type || 'info'
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to broadcast notification:', error);
      return false;
    }
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();

// Export class for testing
export { NotificationService };