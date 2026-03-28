import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { signToken } from '../utils/jwt.js';

export function sanitizeUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    authProvider: user.authProvider,
    avatarUrl: user.avatarUrl,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
}

export async function registerUser(payload) {
  const existingUser = await User.findOne({ email: payload.email.toLowerCase() });

  if (existingUser) {
    throw new ApiError(409, 'An account already exists with this email.');
  }

  const passwordHash = await bcrypt.hash(payload.password, 12);
  const user = await User.create({
    fullName: payload.fullName,
    email: payload.email.toLowerCase(),
    passwordHash,
    authProvider: 'local',
  });

  const token = signToken({ sub: user._id, role: user.role });

  return { user: sanitizeUser(user), token };
}

export async function loginUser(payload) {
  const user = await User.findOne({ email: payload.email.toLowerCase() });

  if (!user || !user.passwordHash) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const isValidPassword = await bcrypt.compare(payload.password, user.passwordHash);

  if (!isValidPassword) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const token = signToken({ sub: user._id, role: user.role });

  return { user: sanitizeUser(user), token };
}

export async function getUserById(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found.');
  }

  return user;
}

export async function upsertGoogleUser(profile) {
  const email = profile.emails?.[0]?.value?.toLowerCase();

  if (!email) {
    throw new ApiError(400, 'Google profile email is required.');
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      fullName: profile.displayName || email.split('@')[0],
      email,
      authProvider: 'google',
      googleId: profile.id,
      avatarUrl: profile.photos?.[0]?.value || '',
      isEmailVerified: true,
    });
  } else if (!user.googleId) {
    user.googleId = profile.id;
    user.authProvider = 'google';
    user.avatarUrl = profile.photos?.[0]?.value || user.avatarUrl;
    user.isEmailVerified = true;
    await user.save();
  }

  return user;
}