const express = require('express');
const productRouter = express.Router();
const {
    addProduct,
    updatePrice,
    getProducts,
    getSpicificProduct,
    deleteProduct,
    editProduct
} = require('./products.controller');
const {
    productValidation,
    updatePriceValidation,
    getSpecificProductValidation
} = require('../../middlewares/Validation');
const {verifySession} = require('../../middlewares/verifySession');
const {validateRequest} = require('../../middlewares/validateRequest');
const {adminAuth} = require('../../middlewares/adminAuth')


productRouter.post(
    '/add',
    adminAuth,
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

productRouter.get(
    '/:productId',
    getSpecificProductValidation,
    validateRequest,
    verifySession,
    getSpicificProduct
);

productRouter.delete(
    '/:productId',
    adminAuth,
    verifySession,
    deleteProduct
);

productRouter.put(
    '/edit/:productId',
    adminAuth,
    verifySession,
    editProduct
)

module.exports = {productRouter} ;