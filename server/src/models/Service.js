import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    points: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Service = mongoose.model('Service', serviceSchema);
