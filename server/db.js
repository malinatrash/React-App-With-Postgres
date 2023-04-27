const Db = require('pg').Pool
const pool = new Db({
    user: 'malinatrash',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});

module.exports = pool