import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { Service } from '../models/Service.js';

export const listServices = asyncHandler(async (req, res) => {
  const items = await Service.find().sort({ createdAt: -1 });
  return sendSuccess(res, { data: { services: items } });
});

export const createService = asyncHandler(async (req, res) => {
  const { title, description, points } = req.body;
  const s = await Service.create({ title, description, points });
  return sendSuccess(res, { statusCode: 201, data: { service: s } });
});
