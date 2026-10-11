export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  isRead: boolean;
  createdAt: string;
}
