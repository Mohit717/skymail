const express = require('express');
const userCtrl = require('../controllers/user.ctrl');
const { authenticateToken } = require('../middleware/authenticate');
const { validateUsername, validateEmail } = require('../middleware/validate');
const userRte = express.Router();

userRte.get('/username', authenticateToken, userCtrl.uniqueUsername)
userRte.post('/register', validateUsername, validateEmail, authenticateToken, userCtrl.registerUser)
userRte.post('/reset-password', authenticateToken, userCtrl.resetPassword)
userRte.get('/me', authenticateToken, userCtrl.profile)

module.exports = userRte;