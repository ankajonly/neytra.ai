import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { Testimonial } from '../models/Testimonial.js';

export const listTestimonials = asyncHandler(async (req, res) => {
  const items = await Testimonial.find({ active: true }).sort({ createdAt: -1 });
  return sendSuccess(res, { data: { testimonials: items } });
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const { author, title, quote } = req.body;
  const item = await Testimonial.create({ author, title, quote });
  return sendSuccess(res, { statusCode: 201, data: { testimonial: item } });
});
