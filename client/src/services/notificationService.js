import { apiClient } from './apiClient';

export const notificationService = {
  async getNotifications() {
    const res = await apiClient.get('/dashboard/notifications');
    return res.data;
  },
};
