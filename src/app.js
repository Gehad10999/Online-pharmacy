const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {router} = require('./routes/auth/auth.routes')

const app = express();


app.use(express.json());
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

app.use(morgan('combined'));

app.use('/auth', router);

module.exports = app; 