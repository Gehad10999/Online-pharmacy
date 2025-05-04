const express = require('express');
const router = express.Router();
const { register, login } = require('./auth.controller');
const {
    loginValidation,
    registerValidation
} = require('../../middlewares/Validation')

router.post(
    '/login',
    loginValidation,
    login 
);

router.post(
    '/register',
    registerValidation,
    register 
);

module.exports = {
    router
}
