const Db = require('pg').Pool
const pool = new Db({
    user: 'malinatrash',
    host: 'localhost',
    database: 'Polyclinic',
    password: 'root',
    port: 5432,
});

module.exports = pool