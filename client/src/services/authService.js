import { apiClient } from './apiClient';
import { GOOGLE_AUTH_URL } from '../utils/constants';

export const authService = {
  async login(payload) {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  },
  async register(payload) {
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },
  async forgotPassword(payload) {
    const response = await apiClient.post('/auth/forgot-password', payload);
    return response.data;
  },
  async resetPassword(payload) {
    const response = await apiClient.post('/auth/reset-password', payload);
    return response.data;
  },
  async verifyEmail(token) {
    const response = await apiClient.get('/auth/verify-email', { params: { token } });
    return response.data;
  },
  async getProfile() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  getGoogleOAuthUrl() {
    return GOOGLE_AUTH_URL;
  },
};