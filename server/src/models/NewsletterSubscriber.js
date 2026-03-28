import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    name: { type: String },
    confirmed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const NewsletterSubscriber = mongoose.model('NewsletterSubscriber', subscriberSchema);
