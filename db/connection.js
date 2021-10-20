const mysql = require('mysql2');
const util = require('util');

require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE
},
console.log(
`=======================================

=======================================`
)
);

db.connect()

db.query = util.promisify(db.query);

module.exports = db