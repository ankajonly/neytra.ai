import { Router } from 'express';
import { getProjects, getNotifications } from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

// Projects: available to authenticated users
router.get('/projects', protect, getProjects);

// Notifications: team and admin
router.get('/notifications', protect, requireRole('admin', 'team'), getNotifications);

export default router;
