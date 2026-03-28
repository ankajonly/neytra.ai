import { Router } from 'express';
import { listTestimonials, createTestimonial } from '../controllers/testimonial.controller.js';
import { listServices, createService } from '../controllers/service.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

router.get('/testimonials', listTestimonials);
router.post('/testimonials', protect, requireRole('admin', 'team'), createTestimonial);

router.get('/services', listServices);
router.post('/services', protect, requireRole('admin', 'team'), createService);

export default router;
