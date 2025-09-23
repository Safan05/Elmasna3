export function verificationEmail({ appName = 'Elmasnaa', code, supportEmail, frontendUrl }) {
  const subject = `${appName} verification code`;
  const text = `Your ${appName} verification code is ${code}. It expires in 10 minutes.`;
  const brandColor = '#FF6700';
  const borderColor = '#e5e7eb';
  const textColor = '#111827';
  const mutedColor = '#6b7280';
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${subject}</title>
      <style>
        body { background:#f9fafb; margin:0; padding:24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'; }
        .container { max-width: 560px; margin: 0 auto; background: #fff; border:1px solid ${borderColor}; border-radius:12px; overflow:hidden; }
        .header { padding: 20px 24px; border-bottom:1px solid ${borderColor}; display:flex; align-items:center; }
        .logo { font-weight:700; color:${brandColor}; font-size:18px; }
        .content { padding: 24px; color:${textColor}; }
        h1 { margin: 0 0 12px; font-size: 20px; }
        p { margin: 0 0 12px; line-height:1.55; }
        .code { display:inline-block; letter-spacing: 6px; font-weight: 700; font-size: 28px; padding:12px 16px; border:1px dashed ${brandColor}; border-radius:8px; background:#f0f9ff; color:${brandColor}; }
        .footer { padding: 16px 24px; border-top:1px solid ${borderColor}; color:${mutedColor}; font-size:12px; }
        a { color:${brandColor}; text-decoration:none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">${appName}</div>
        </div>
        <div class="content">
          <h1>Verify your email</h1>
          <p>Use the following code to verify your email address. This code will expire in 10 minutes.</p>
          <p style="margin:20px 0;"><span class="code">${code}</span></p>
          ${frontendUrl ? `<p>You can return to the app here: <a href="${frontendUrl}">${frontendUrl}</a></p>` : ''}
          <p>If you did not request this code, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>Need help? ${supportEmail ? `Contact us at <a href="mailto:${supportEmail}">${supportEmail}</a>.` : ''}</p>
          <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>`;
  return { subject, text, html };
}
