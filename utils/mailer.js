import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: "gmail",  // or use SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function verifyTransport() {
  try {
    await transporter.verify();
    console.log('SMTP transporter verified and ready');
  } catch (err) {
    console.error('SMTP transporter verification failed:', err.message);
  }
}

export async function sendMail({ to, subject, text, html }) {
  const from = process.env.MAIL_FROM || process.env.EMAIL_USER;
  if (!from) throw new Error('MAIL_FROM or EMAIL_USER must be set');
  console.log(from,to,subject,text,html);
    try {
    await transporter.verify();
    console.log('SMTP transporter verified and ready');
  } catch (err) {
    console.error('SMTP transporter verification failed:', err.message);
  }
  return transporter.sendMail({ from, to, subject, text, html });
}

export default { sendMail, verifyTransport };
