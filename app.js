const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {router} = require('./src/routes/auth/auth.routes');
const {cartRouter} = require('./src/routes/cart/cart.routes');
const {productRouter} = require('./src/routes/products/products.routes');
const {Session} = require('./src/models/session');
const { orderRouter } = require('./src/routes/orders/order.routes');
const {countRouter} = require('./src/routes/counts/count.routes');
const app = express();
const path = require('path');


app.use(express.json());
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     origin: '*'
// }));

app.use(cors({
    origin: "http://localhost:5000", 
    credentials: true
}));

app.use(morgan('combined'));

app.use(Session);

app.use(express.static('public'));

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use('/auth', router);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter)
app.use('/count', countRouter);

app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/404.html');
    res.status(404).json({status: "Error", message: "Route Not Found" });
});

module.exports = app; 