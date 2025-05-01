const express = require('express');
const cartRouter = express.Router();
const {
    addToCart,
    getCart
} = require('./cart.controller');
const {verifyToken} = require('../../middlewares/verifyToken.js')


cartRouter.post('/',verifyToken, addToCart);
cartRouter.get('/:cartId',verifyToken, getCart);

module.exports = {cartRouter};
