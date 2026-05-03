const express = require('express');
const emailRte = express.Router();
const { authenticateToken } = require('../middleware/authenticate');
const emailCtrl = require('../controllers/email.ctrl');

emailRte.get('/emails', authenticateToken, emailCtrl.fetchEmails);
emailRte.get('/:id', authenticateToken, emailCtrl.fetchEmailById);
emailRte.delete('/:id', authenticateToken, emailCtrl.deleteEmailById);

module.exports = emailRte;