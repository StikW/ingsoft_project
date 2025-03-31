import { Notification } from '../types';

class NotificationService {
  private notifications: Notification[] = [];

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notifications
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      read: false,
    };
    this.notifications.push(newNotification);
    return newNotification;
  }

  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    this.notifications
      .filter(n => n.userId === userId && !n.read)
      .forEach(n => n.read = true);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notifications.filter(n => n.userId === userId && !n.read).length;
  }
}

export const notificationService = new NotificationService(); 