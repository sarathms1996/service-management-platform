import api from '@/lib/axios';
import { notifications } from '@/data/mockData';

export const getNotifications = async () => {
  await api.get('/notifications');
  return notifications;
};
