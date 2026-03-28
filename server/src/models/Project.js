import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    clientName: { type: String, required: false, trim: true },
    status: { type: String, enum: ['planning', 'active', 'paused', 'completed'], default: 'planning' },
    summary: { type: String, default: '' },
    techStack: { type: [String], default: [] },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

export const Project = mongoose.model('Project', projectSchema);
