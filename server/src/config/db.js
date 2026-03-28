import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  await mongoose.connect(env.MONGODB_URI, {
    autoIndex: !['production', 'test'].includes(env.NODE_ENV),
  });

  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}