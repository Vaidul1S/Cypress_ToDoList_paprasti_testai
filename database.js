require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

pool.on('error', (err, client) => {
    console.log('Something is wrong', err);
    process.exit(-1);    
});

module.exports = pool;  // konstanta priskiriam moduli, galime naudoti kituose scripuose ar panasiai