const nodemailer = require('nodemailer');

async function sendTestEmail() {
  let transporter = nodemailer.createTransport({
    host: 'localhost',
    auth: {
      user: 'smtp_c5583a27f338',
      pass: 'gA9e29JFDGRAtoT-',
    },
    port: 2525,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
    from: 'Alice <alice@example.com>',
    to: 'bob@example.com',
    subject: 'Hello from custom SMTP',
    text: 'This is a test email',
    html: '<b>This is a test email</b>',
  });

  console.log('Message sent: %s', info.messageId);
}

sendTestEmail().catch(console.error);
