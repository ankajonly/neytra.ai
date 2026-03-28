import { Router } from 'express';
import authRoutes from './auth.routes.js';
import contactRoutes from './contact.routes.js';
import healthRoutes from './health.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import contentRoutes from './content.routes.js';
import newsletterRoutes from './newsletter.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/health', healthRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/content', contentRoutes);
router.use('/newsletter', newsletterRoutes);

export default router;