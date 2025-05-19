const express = require('express');
const adminRouter = express.Router();
const {promoteToAdmin} = require('./admin.controller');
const {verifySession} = require('../../middlewares/verifySession');
const {adminAuth} = require('../../middlewares/adminAuth')

adminRouter.post('/toAdmin', adminAuth, verifySession, promoteToAdmin);

module.exports = {adminRouter};