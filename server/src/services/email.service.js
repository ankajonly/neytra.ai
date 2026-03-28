import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter;

function getTransporter() {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT || 587,
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  return transporter;
}

export async function sendMail({ to, subject, text, html }) {
  const mailer = getTransporter();

  if (!mailer) {
    // fallback to console logging in development when SMTP not configured
    // eslint-disable-next-line no-console
    console.log('sendMail (mock)', { to, subject, text, html });
    return { accepted: [to] };
  }

  const msg = {
    from: env.SMTP_FROM || `Neytr.ai <noreply@neytr.ai>`,
    to,
    subject,
    text,
    html,
  };

  return mailer.sendMail(msg);
}

export async function sendContactNotification(inquiry) {
  const to = env.CONTACT_RECEIVER || env.SMTP_FROM;
  if (!to) {
    // nothing to send to
    // eslint-disable-next-line no-console
    console.warn('No CONTACT_RECEIVER or SMTP_FROM configured; skipping contact notification');
    return null;
  }

  const subject = `New contact inquiry — ${inquiry.fullName}`;
  const html = `
    <h2>New contact inquiry</h2>
    <p><strong>Name:</strong> ${inquiry.fullName}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Company:</strong> ${inquiry.company}</p>
    <p><strong>Project Type:</strong> ${inquiry.projectType}</p>
    <p><strong>Message:</strong></p>
    <p>${inquiry.message.replace(/\n/g, '<br/>')}</p>
    <p>Submitted at: ${inquiry.createdAt || new Date().toISOString()}</p>
  `;

  try {
    return await sendMail({ to, subject, html, text: inquiry.message });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to send contact notification email', err);
    return null;
  }
}

export async function sendVerificationEmail({ to, fullName, code }) {
  const mailer = getTransporter();

  if (!mailer) {
    console.warn('SMTP not configured. Verification email skipped.');
    return;
  }

  await mailer.sendMail({
    from: env.SMTP_FROM,
    to,
    subject: 'Verify your Neytr.ai access',
    html: `<p>Hello ${fullName},</p><p>Your verification code is <strong>${code}</strong>.</p>`,
  });
}