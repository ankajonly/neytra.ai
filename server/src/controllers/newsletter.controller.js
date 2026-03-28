import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber.js';

export const subscribe = asyncHandler(async (req, res) => {
  const { email, name } = req.body;

  const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });
  if (existing) {
    return sendSuccess(res, { message: 'Already subscribed.' });
  }

  const sub = await NewsletterSubscriber.create({ email: email.toLowerCase(), name });
  return sendSuccess(res, { statusCode: 201, message: 'Subscribed.', data: { id: sub._id } });
});

export const listSubscribers = asyncHandler(async (req, res) => {
  const subs = await NewsletterSubscriber.find().sort({ createdAt: -1 }).limit(1000);
  return sendSuccess(res, { data: { subscribers: subs } });
});
