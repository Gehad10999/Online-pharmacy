const express = require('express');
const countRouter = express.Router();
const {count} = require('./count.controller');
const {adminAuth} = require('../../middlewares/adminAuth');

countRouter.get('/',
    adminAuth,
    count
);

module.exports = {
    countRouter
};