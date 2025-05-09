const express = require('express');
const productRouter = express.Router();
const {
    addProduct,
    updatePrice,
    getProducts,
    getSpicificProduct
} = require('./products.controller');
const {
    productValidation,
    updatePriceValidation,
    getSpecificProductValidation
} = require('../../middlewares/Validation');
const {verifySession} = require('../../middlewares/verifySession');
const {validateRequest} = require('../../middlewares/validateRequest');


productRouter.post(
    '/add',
    productValidation,
    validateRequest,
    verifySession,
    addProduct
);

productRouter.get(
    '/',
    verifySession,
    getProducts
);

productRouter.put(
    '/price',
    updatePriceValidation,
    validateRequest,
    verifySession,
    updatePrice
);

productRouter.get(
    '/:productId',
    getSpecificProductValidation,
    validateRequest,
    verifySession,
    getSpicificProduct
);


module.exports = {productRouter} ;