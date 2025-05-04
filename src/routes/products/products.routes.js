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
} = require('../../middlewares/Validation')

productRouter.post(
    '/add',
    productValidation,
    addProduct
);

productRouter.get(
    '/',
    getProducts
);

productRouter.put(
    '/price',
    updatePriceValidation,
    updatePrice
);

productRouter.get(
    '/:productId',
    getSpecificProductValidation,
    getSpicificProduct
);


module.exports = {productRouter} ;