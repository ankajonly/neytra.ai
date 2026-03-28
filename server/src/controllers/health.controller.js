import { sendSuccess } from '../utils/response.js';

export function getHealth(_req, res) {
  return sendSuccess(res, {
    message: 'Server is healthy.',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    },
  });
}