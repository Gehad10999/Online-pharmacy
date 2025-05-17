const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {router} = require('./server/src/routes/auth/auth.routes');
const {cartRouter} = require('./server/src/routes/cart/cart.routes');
const {productRouter} = require('./server/src/routes/products/products.routes');
const {Session} = require('./server/src/models/session');
const { orderRouter } = require('./server/src/routes/orders/order.routes');
const {countRouter} = require('./server/src/routes/counts/count.routes');
const app = express();
const path = require('path');


app.use(express.json());
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: '*' , credentials: false}));


app.use(morgan('combined'));

app.use(Session);

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'login.html'));
});

app.use('/auth', router);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter)
app.use('/count', countRouter);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'client', '404.html'));
});

module.exports = app; 