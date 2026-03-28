import { ContactInquiry } from '../models/ContactInquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { sendContactNotification } from '../services/email.service.js';

export const createInquiry = asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.create(req.body);

  // send notification email to admin (best-effort)
  try {
    // do not await blocking; keep it best-effort but log failures
    await sendContactNotification(inquiry);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Contact notification failed', err);
  }

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Inquiry received. We will reach out shortly.',
    data: { inquiryId: inquiry._id },
  });
});

export const listInquiries = asyncHandler(async (req, res) => {
  // only allow admin or team users
  const role = req.user?.role;

  if (role !== 'admin' && role !== 'team') {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  const inquiries = await ContactInquiry.find().sort({ createdAt: -1 }).limit(200);

  return sendSuccess(res, {
    message: 'Inquiries fetched successfully.',
    data: { inquiries },
  });
});