require('dotenv').config();

const mysql = require('mysql2/promise');

const dburl = process.env.DATABASE_URL || '';
if (!dburl) {
    throw new Error('DATABASE_URL belum dibuat atau belum disetting di file .env');
}

const url = new URL(dburl);

const pool = mysql.createPool({
    host: url.hostname,
    port: url.port,
    user: url.username,
    password: url.password,
    database: url.pathname.replace(/^\//,'')
});

module.exports = pool;