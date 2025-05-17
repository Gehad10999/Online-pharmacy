const express = require('express');
const productRouter = express.Router();
const {
    addProduct,
    updatePrice,
    getProducts,
    getSpicificProduct,
    deleteProduct,
    editProduct,
    getLowStockProducts,
    getProductsGroupedByCategory
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
    '/all',
    verifySession,
    getProductsGroupedByCategory
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

productRouter.get(
    '/',
    adminAuth,
    getLowStockProducts
)

module.exports = {productRouter};