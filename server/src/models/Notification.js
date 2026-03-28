import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, default: '' },
    level: { type: String, enum: ['info', 'warning', 'critical'], default: 'info' },
    read: { type: Boolean, default: false },
    meta: { type: Object, default: {} },
  },
  { timestamps: true },
);

export const Notification = mongoose.model('Notification', notificationSchema);
