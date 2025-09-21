import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true, // true for 465, false for 587
  pool: true,
  maxConnections: Number(process.env.SMTP_MAX_CONNECTIONS || 5),
  maxMessages: Number(process.env.SMTP_MAX_MESSAGES || 100),
  connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 15000), // 15s
  greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT || 10000), // 10s
  socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 20000), // 20s
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
  return transporter.sendMail({ from, to, subject, text, html });
}

export default { sendMail, verifyTransport };
