const nodemailer = require('nodemailer');
const path = require('path');

async function sendTestEmail() {
  let transporter = nodemailer.createTransport({
    host: 'localhost',
    auth: {
      user: 'smtp_6353d7ab6afb',
      pass: 'hSEXomiCOVdK6Fn7',
    },
    port: 2525,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });
  
  let info = await transporter.sendMail({
    from: 'alice@example.com',
    to: 'bob@example.com',
    cc:"abc@cc.com, def@cc.com",
    bcc: "ghi@bcc.com, jkl@bcc.com",
    subject: 'Hello from custom SMTP',
    text: 'This is a test email2',
    html: '<b>This is a test email2</b>',
    keepBcc: true,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, 'public/logo.png'),
      }
    ],
  });

  console.log('Message sent: %s', info.messageId);
}

sendTestEmail().catch(console.error);
