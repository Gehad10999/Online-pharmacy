const http = require('http');
const app = require('./app');
const PORT = 5000 ;
const server = http.createServer(app);
const { pool , database} = require('./models/config');

async function startServer() {
    //connecting to SQL database 
    await pool.getConnection()
    .then((conn) => {
        console.log(`✅ Connected to ${database} database!`);
        conn.release();
    })
    .catch((err) => {
        console.error('❌ Error connecting to MySQL:', err.message);
        process.exit(1);
    });
    server.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`);
    });
}

startServer();

