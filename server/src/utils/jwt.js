import jwt from 'jsonwebtoken';
import { env, isProduction } from '../config/env.js';

export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}

export function attachAuthCookie(res, token) {
  res.cookie('neytr_token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie(res) {
  res.clearCookie('neytr_token');
}