import { z } from 'zod';

export const createInquirySchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Provide a valid email'),
    company: z.string().min(1, 'Company is required'),
    projectType: z.string().min(1, 'Project type is required'),
    message: z.string().min(10, 'Please provide more details'),
  }),
});