import { Router } from 'express';
import passport from 'passport';
import { login, logout, me, googleCallback, googleUnavailable, register, forgotPassword, resetPassword, verifyEmail, refreshToken } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authRateLimiter } from '../middleware/rateLimit.middleware.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema } from '../validators/auth.validator.js';
import { isGoogleOAuthConfigured } from '../config/env.js';

const router = Router();

router.post('/register', authRateLimiter, validateRequest(registerSchema), register);
router.post('/login', authRateLimiter, validateRequest(loginSchema), login);
router.post('/forgot-password', authRateLimiter, validateRequest(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', authRateLimiter, validateRequest(resetPasswordSchema), resetPassword);
router.get('/verify-email', validateRequest(verifyEmailSchema), verifyEmail);
router.post('/refresh', refreshToken);
router.get('/me', protect, me);
router.post('/logout', logout);

if (isGoogleOAuthConfigured) {
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
  router.get(
    '/google/callback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: '/api/v1/auth/google/unavailable',
    }),
    googleCallback,
  );
} else {
  router.get('/google', googleUnavailable);
  router.get('/google/callback', googleUnavailable);
}

router.get('/google/unavailable', googleUnavailable);

export default router;