import { apiClient } from './apiClient';

export const contactService = {
  async createInquiry(payload) {
    const res = await apiClient.post('/contact', payload);
    return res.data || { message: 'Inquiry submitted' };
  },
  async getInquiries() {
    const res = await apiClient.get('/contact');
    return res.data || { items: [] };
  },
};