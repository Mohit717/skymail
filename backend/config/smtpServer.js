const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const Email = require('../models/email.mdl');
const fs = require('fs');
const projectMdl = require('../models/project.mdl');

const smtpServer = new SMTPServer({
    authOptional: false, // no auth required (for dev)

    // Handle login
    onAuth(auth, session, callback) {
        // Make the callback async to use await
        (async () => {
            try {
                const project = await projectMdl.findOne({ 
                    smtpUsername: auth.username, 
                    smtpPassword: auth.password 
                }).select('_id');

                if (project) {
                    session.authenticatedUser = { smtpUsername: auth.username, projectId: project._id };
                    return callback(null, { user: auth.username });
                }

                console.log(`❌ Auth failed for user: ${auth.username}`);
                return callback(new Error('Authentication failed'));
            } catch (err) {
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
                    for (const att of parsed.attachments) {
                        const safeFilename = `${Date.now()}_${att.filename}`;
                        const filePath = path.join(__dirname, 'attachments', safeFilename);
                        fs.writeFileSync(filePath, att.content);

                        // Replace cid: links with actual URLs in HTML
                        if (att.cid) {
                            htmlContent = htmlContent.replace(
                                new RegExp(`cid:${att.cid}`, 'g'),
                                `/attachments/${safeFilename}`
                            );
                        }

                        attachmentMeta.push({
                            filename: att.filename,
                            contentType: att.contentType,
                            size: att.size,
                            path: `/attachments/${safeFilename}`,
                        });
                    }
                }

                // Get projectId from authenticated SMTP user
                const authenticatedUser = session.authenticatedUser;
                
                const email = new Email({
                    projectId: authenticatedUser?.projectId,
                    from: parsed.from?.text || '',
                    to: parsed.to?.text || '',
                    subject: parsed.subject || '(No subject)',
                    text: parsed.text || '',
                    html: htmlContent, // use modified HTML
                    attachments: attachmentMeta,
                    date: new Date(),
                });

                await email.save();
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

module.exports = smtpServer;