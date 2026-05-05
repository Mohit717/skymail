import smtpServer from "./lib/smtpServer";

const SMTP_PORT = Number(process.env.SMTP_PORT || 2525);

smtpServer.listen(SMTP_PORT, "0.0.0.0", () => {
  console.log(`SMTP server running on port ${SMTP_PORT}`);
});