
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const smtpServer = require('./config/smtpServer');
const router = require('./routes');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use('/attachments', express.static(path.join(__dirname, 'attachments')));
app.use('/api', router);

connectDB();

const PORT = process.env.PORT || 4000;
smtpServer.listen(2525, () => {
    console.log('SMTP server listening on port 2525');
});
app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
});
