const express = require('express');
const authCtrl = require('../controllers/auth.ctrl');
const authRte = express.Router();

authRte.post('/register', authCtrl.register)
authRte.get('/verify', authCtrl.verify)
authRte.post('/login', authCtrl.login)

module.exports = authRte;