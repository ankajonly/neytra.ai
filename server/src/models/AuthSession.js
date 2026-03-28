import mongoose from 'mongoose';

const authSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    ip: { type: String },
    userAgent: { type: String },
    revoked: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const AuthSession = mongoose.model('AuthSession', authSessionSchema);
