const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {router} = require('./routes/auth/auth.routes');
const {cartRouter} = require('./routes/cart/cart.routes');
const {productRouter} = require('./routes/products/products.routes');
const {Session} = require('./models/session');
const { orderRouter } = require('./routes/orders/order.routes');
const app = express();
const path = require('path');


app.use(express.json());
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

app.use(morgan('combined'));

app.use(Session);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', router);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter)

app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
    res.status(404).json({status: "Error", message: "Route Not Found" });
});

module.exports = app; 