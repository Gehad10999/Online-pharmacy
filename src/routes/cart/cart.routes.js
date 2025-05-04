const express = require('express');
const cartRouter = express.Router();
const {
    addToCart,
    getCart
} = require('./cart.controller');
const {verifyToken} = require('../../middlewares/verifyToken.js')
const {
    cartValidation,
    getCartValidation
} = require('../../middlewares/Validation.js')


cartRouter.post(
    '/',
    verifyToken,
    cartValidation,
    addToCart
);

cartRouter.get(
    '/:cartId',
    verifyToken,
    getCartValidation,
    getCart
);

module.exports = {cartRouter};
