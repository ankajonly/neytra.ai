import { env, isProduction } from '../config/env.js';
import { getUserById, loginUser, registerUser, sanitizeUser } from '../services/auth.service.js';
import crypto from 'crypto';
import { sendMail } from '../services/email.service.js';
import { User } from '../models/User.js';
import { AuthSession } from '../models/AuthSession.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { attachAuthCookie, clearAuthCookie, signToken } from '../utils/jwt.js';
import { sendSuccess } from '../utils/response.js';

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  // attach cookie and send verification email for local users
  attachAuthCookie(res, result.token);

  // create refresh session
  try {
    await createRefreshSession(result.user.id, req, res);
  } catch (err) {
    // ignore
  }

  try {
    if (result.user && result.user.authProvider === 'local') {
      const token = crypto.randomBytes(20).toString('hex');
      const user = await User.findById(result.user.id);
      if (user) {
        user.emailVerificationToken = token;
        user.emailVerificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h
        await user.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
        await sendMail({ to: user.email, subject: 'Verify your email', html: `<p>Verify here: <a href="${verifyUrl}">${verifyUrl}</a></p>` });
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to send verification email', err);
  }

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Account created successfully.',
    data: result,
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);
  attachAuthCookie(res, result.token);

  try {
    await createRefreshSession(result.user.id, req, res);
  } catch (err) {
    // ignore
  }

  return sendSuccess(res, {
    message: 'Signed in successfully.',
    data: result,
  });
});

async function createRefreshSession(userId, req, res) {
  const refresh = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
  await AuthSession.create({ user: userId, token: refresh, ip: req.ip, userAgent: req.get('User-Agent') || '', expiresAt });
  res.cookie('neytr_refresh', refresh, { httpOnly: true, secure: isProduction, sameSite: isProduction ? 'none' : 'lax', maxAge: 1000 * 60 * 60 * 24 * 30 });
}

export const me = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user.id);

  return sendSuccess(res, {
    message: 'Profile fetched successfully.',
    data: { user: sanitizeUser(user) },
  });
});

export const logout = asyncHandler(async (_req, res) => {
  const req = _req;
  // revoke refresh token if present
  const refresh = req.cookies?.neytr_refresh || req.body?.refreshToken;
  if (refresh) {
    await AuthSession.findOneAndUpdate({ token: refresh }, { revoked: true }).catch(() => null);
  }
  clearAuthCookie(res);
  res.clearCookie('neytr_refresh');

  return sendSuccess(res, {
    message: 'Signed out successfully.',
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refresh = req.cookies?.neytr_refresh || req.body?.refreshToken;
  if (!refresh) {
    return res.status(401).json({ success: false, message: 'Refresh token required.' });
  }

  const session = await AuthSession.findOne({ token: refresh, revoked: false, expiresAt: { $gt: new Date() } });
  if (!session) {
    return res.status(401).json({ success: false, message: 'Invalid or expired refresh token.' });
  }

  const token = signToken({ sub: session.user, role: 'client' });
  attachAuthCookie(res, token);

  // rotate refresh token
  const newRefresh = crypto.randomBytes(32).toString('hex');
  session.token = newRefresh;
  session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await session.save();
  res.cookie('neytr_refresh', newRefresh, { httpOnly: true, secure: isProduction, sameSite: isProduction ? 'none' : 'lax', maxAge: 1000 * 60 * 60 * 24 * 30 });

  return sendSuccess(res, { message: 'Token refreshed.' });
});

export const googleCallback = asyncHandler(async (req, res) => {
  const token = signToken({ sub: req.user._id, role: req.user.role });
  attachAuthCookie(res, token);

  return res.redirect(`${env.CLIENT_URL}/login?token=${token}`);
});

export const googleUnavailable = (_req, res) => {
  return res.status(503).json({
    success: false,
    message: 'Google OAuth is not configured yet.',
  });
};

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body || {};

  const user = await User.findOne({ email: email?.toLowerCase() });

  if (!user) {
    // respond success to avoid account enumeration
    return sendSuccess(res, { message: 'If an account exists, a password reset email was sent.' });
  }

  const token = crypto.randomBytes(24).toString('hex');
  user.passwordResetToken = token;
  user.passwordResetExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  await sendMail({ to: user.email, subject: 'Reset your password', html: `<p>Reset here: <a href="${resetUrl}">${resetUrl}</a></p>` });

  return sendSuccess(res, { message: 'If an account exists, a password reset email was sent.' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: new Date() } });

  if (!user) {
    throw { statusCode: 400, message: 'Invalid or expired reset token.' };
  }

  // update password
  const bcrypt = await import('bcryptjs');
  user.passwordHash = await bcrypt.hash(password, 12);
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  return sendSuccess(res, { message: 'Password updated successfully.' });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ emailVerificationToken: token, emailVerificationExpires: { $gt: new Date() } });

  if (!user) {
    throw { statusCode: 400, message: 'Invalid or expired verification token.' };
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;
  await user.save();

  return sendSuccess(res, { message: 'Email verified successfully.' });
});