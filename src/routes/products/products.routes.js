const express = require('express');
const productRouter = express.Router();
const {
    addProduct,
    updatePrice,
    getProducts,
    getSpicificProduct
} = require('./products.controller');

productRouter.post('/add', addProduct);
productRouter.get('/', getProducts);
productRouter.put('/price', updatePrice);
productRouter.get('/:productId', getSpicificProduct);


module.exports = {productRouter} ;
