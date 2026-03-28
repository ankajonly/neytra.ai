import mongoose from 'mongoose';

const projectInquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    company: { type: String },
    projectType: { type: String },
    budgetRange: { type: String },
    message: { type: String, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'archived'], default: 'new' },
  },
  { timestamps: true },
);

export const ProjectInquiry = mongoose.model('ProjectInquiry', projectInquirySchema);
