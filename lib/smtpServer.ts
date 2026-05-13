import fs from "fs";
import { SMTPServer, SMTPServerSession } from "smtp-server";
import { simpleParser } from "mailparser";
import { getProject } from "./dal/projectDAL";
import path from "path";
import { createEmail } from "./dal/emailDAL";

// Extend SMTPServerSession to include custom properties
declare module "smtp-server" {
    interface SMTPServerSession {
        authenticatedUser?: {
            smtpUsername: string | undefined;
            projectId: string | number | undefined;
        };
        envelope?: {
            mailFrom: { address: string; args?: any } | false;
            rcptTo: Array<{ address: string; args?: any }>;
        };
    }
}

const smtpServer = new SMTPServer({
    authOptional: false, // no auth required (for dev)

    // Handle login
    onAuth(auth, session, callback) {
        // Make the callback async to use await
        (async () => {
            try {
                const project = await getProject({
                    smtpUsername: auth.username,
                    smtpPassword: auth.password
                })

                if (!project) {
                    console.log(`❌ Auth failed for user: ${auth.username}`);
                    return callback(new Error('Authentication failed'));
                }
                session.authenticatedUser = { smtpUsername: auth.username || '', projectId: project._id.toHexString() };
                return callback(null, { user: auth.username });
            } catch (err: any) {
                console.error('❌ Auth error:', err);
                callback(err);
            }
        })();
    },

    onData(stream, session, callback) {
        simpleParser(stream)
            .then(async parsed => {
                let htmlContent = parsed.html || '';
                const attachmentMeta = [];
                // Save attachments to disk
                if (parsed.attachments && parsed.attachments.length > 0) {
                    const attachmentsDir = path.join(process.cwd(), 'attachments');
                    if (!fs.existsSync(attachmentsDir)) {
                        fs.mkdirSync(attachmentsDir, { recursive: true });
                    }
                    for (const att of parsed.attachments) {
                        const safeFilename = `${Date.now()}_${att.filename}`;
                        const filePath = path.join(attachmentsDir, safeFilename);
                        fs.writeFileSync(filePath, att.content);

                        // Replace cid: links with actual URLs in HTML
                        if (att.cid) {
                            htmlContent = htmlContent.replace(
                                new RegExp(`cid:${att.cid}`, 'g'),
                                `/attachments/${safeFilename}`
                            );
                        }

                        attachmentMeta.push({
                            filename: safeFilename,
                            orgfilename: att.filename,
                            contentType: att.contentType,
                            size: att.size,
                            path: `/attachments/${safeFilename}`,
                        });
                    }
                }

                // Get projectId from authenticated SMTP user
                const authenticatedUser = session.authenticatedUser;

                if (!authenticatedUser?.projectId) {
                    console.error('❌ No authenticated user or projectId found');
                    callback(new Error('Authentication missing'));
                    return;
                }

                await createEmail({
                    projectId: authenticatedUser.projectId,
                    from: Array.isArray(parsed.from) ? parsed.from.map(a => a.text).join(', ') : parsed.from?.text || '',
                    to: Array.isArray(parsed.to) ? parsed.to.map(a => a.text).join(', ') : parsed.to?.text || '',
                    cc: Array.isArray(parsed.cc) ? parsed.cc.map(a => a.text).join(', ') : parsed.cc?.text || '',
                    bcc: Array.isArray(parsed.bcc) ? parsed.bcc.map(a => a.text).join(', ') : parsed.bcc?.text || '',
                    recipients: Array.isArray(session.envelope.rcptTo) ? session.envelope.rcptTo.map(a => a.address).join(', '): '',
                    subject: parsed.subject || '(No subject)',
                    text: parsed.text || '',
                    html: htmlContent, // use modified HTML
                    attachments: attachmentMeta,
                    date: new Date(),
                })
                console.log('📩 Email with attachments saved to MongoDB');
                callback(null);
            })
            .catch(err => {
                console.error('❌ Parsing error:', err);
                callback(err);
            });
    },
    disabledCommands: ['STARTTLS'],
});

export default smtpServer;