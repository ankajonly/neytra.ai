import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { ProjectInquiry } from '../models/ProjectInquiry.js';
import { sendContactNotification } from '../services/email.service.js';

export const createProjectInquiry = asyncHandler(async (req, res) => {
  const pi = await ProjectInquiry.create(req.body);
  try {
    await sendContactNotification(pi);
  } catch (err) {
    // swallow
  }
  return sendSuccess(res, { statusCode: 201, data: { id: pi._id }, message: 'Project inquiry received.' });
});

export const listProjectInquiries = asyncHandler(async (req, res) => {
  const role = req.user?.role;
  if (!role || (role !== 'admin' && role !== 'team')) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  const items = await ProjectInquiry.find().sort({ createdAt: -1 }).limit(200);
  return sendSuccess(res, { data: { projectInquiries: items } });
});
