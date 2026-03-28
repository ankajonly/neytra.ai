import { apiClient } from './apiClient';

export const projectService = {
  async getProjects() {
    const res = await apiClient.get('/dashboard/projects');
    return res.data;
  },
};
