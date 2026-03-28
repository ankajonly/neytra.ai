import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String },
    quote: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
