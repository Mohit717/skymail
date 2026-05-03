const express = require('express');
const authRte = require('./auth.rte');
const userRte = require('./user.rte');
const emailRte = require('./email.rte');
const projectRte = require('./project.rte');
const router = express.Router();

router.use('/auth', authRte)
router.use('/user', userRte)
router.use('/email', emailRte)
router.use('/project', projectRte)

module.exports = router;