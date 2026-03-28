import { Router } from 'express';
import { subscribe, listSubscribers } from '../controllers/newsletter.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

router.post('/subscribe', subscribe);
router.get('/subscribers', protect, requireRole('admin', 'team'), listSubscribers);

export default router;
