import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(RESEND_API_KEY);

export async function verifyTransport() {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set. Emails will fail.');
  } else {
    console.log('Resend client configured.');
  }
}

export async function sendMail({ to, subject, text, html }) {
  const from = process.env.MAIL_FROM; // e.g., "Elmasna3 <no-reply@yourdomain.com>"
  if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY must be set');
  if (!from) throw new Error('MAIL_FROM must be set for Resend');
  console.log(`Sending email via Resend → to: ${to}, subject: "${subject}", from: ${from}`);
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    text,
    html,
  });
  if (error) {
    console.error('Resend send error:', error);
    const msg = error?.message || (typeof error === 'string' ? error : 'Unknown Resend error');
    throw new Error(`Resend email failed: ${msg}`);
  }
  console.log('Resend email queued. id:', data?.id || '(no id)');
  return data;
}

export default { sendMail, verifyTransport };
