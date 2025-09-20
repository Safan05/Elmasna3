import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",  // or use SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export async function sendMail({ to, subject, text, html }) {
  const from = process.env.EMAIL_USER;
  console.log(from);
  console.log(to, subject, text, html);
  if (!from) throw new Error('EMAIL_USER must be set');
  return await transporter.sendMail({ from, to, subject, text, html });
}

export default { sendMail };
