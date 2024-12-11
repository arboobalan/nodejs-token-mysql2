const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

if (db) {
    console.log('Database connected.');
}

module.exports = db.promise();