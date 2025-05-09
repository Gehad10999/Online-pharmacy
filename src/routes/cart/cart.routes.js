const express = require('express');
const cartRouter = express.Router();
const {
    addToCart,
    getCart
} = require('./cart.controller');
const {
    cartValidation,
    getCartValidation
} = require('../../middlewares/Validation.js')
const {verifySession} = require('../../middlewares/verifySession.js');
const {validateRequest} = require('../../middlewares/validateRequest.js');


cartRouter.post(
    '/',
    cartValidation,
    validateRequest,
    verifySession,
    addToCart
);

cartRouter.get(
    '/:cartId',
    getCartValidation,
    validateRequest,
    verifySession,
    getCart
);

module.exports = {cartRouter};
