const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {router} = require('./routes/auth/auth.routes');
const {cartRouter} = require('./routes/cart/cart.routes');
const {productRouter} = require('./routes/products/products.routes');
const app = express();


app.use(express.json());
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

app.use(morgan('combined'));

app.use('/auth', router);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

module.exports = app; 