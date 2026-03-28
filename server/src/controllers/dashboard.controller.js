import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { Project } from '../models/Project.js';
import { Notification } from '../models/Notification.js';

export const getProjects = asyncHandler(async (req, res) => {
  // allow pagination in future; keep simple for now
  const projects = await Project.find().sort({ updatedAt: -1 }).limit(200);

  return sendSuccess(res, { message: 'Projects fetched', data: { projects } });
});

export const getNotifications = asyncHandler(async (req, res) => {
  const notes = await Notification.find().sort({ createdAt: -1 }).limit(200);
  return sendSuccess(res, { message: 'Notifications fetched', data: { notifications: notes } });
});
