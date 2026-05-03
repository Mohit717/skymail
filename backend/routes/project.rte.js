const express = require('express');
const projectCtrl = require('../controllers/project.ctrl');
const { authenticateToken } = require('../middleware/authenticate');
const projectRte = express.Router();

projectRte.post('/', authenticateToken, projectCtrl.create)
projectRte.get('/', authenticateToken, projectCtrl.listProjects)

module.exports = projectRte;