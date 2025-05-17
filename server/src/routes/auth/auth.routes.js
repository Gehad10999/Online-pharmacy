const express = require('express');
const router = express.Router();
const { register, login, logout } = require('./auth.controller');
const {
    loginValidation,
    registerValidation
} = require('../../middlewares/Validation');
const {validateRequest} = require('../../middlewares/validateRequest');

router.post(
    '/login',
    loginValidation,
    validateRequest,
    login 
);

router.post(
    '/register',
    registerValidation,
    validateRequest,
    register 
);

router.post(
    '/logout',
    logout
)

module.exports = {
    router
}
