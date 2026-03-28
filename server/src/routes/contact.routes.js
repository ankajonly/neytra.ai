import { Router } from 'express';
import { createInquiry, listInquiries } from '../controllers/contact.controller.js';
import { contactRateLimiter } from '../middleware/rateLimit.middleware.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { createInquirySchema } from '../validators/contact.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', contactRateLimiter, validateRequest(createInquirySchema), createInquiry);
router.get('/', protect, listInquiries);

export default router;