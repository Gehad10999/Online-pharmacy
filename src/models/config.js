require('dotenv').config();
const database = 'OnlinePharmacy';
const mysql = require('mysql2/promise'); 


const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: database,
    port: 3308
});

module.exports = {pool, database};