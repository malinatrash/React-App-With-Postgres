const express = require('express')
const {request} = require("express");
const app = express()
const port = 3001

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'malinatrash',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});


app.get('/', (req, res) => {
    getPatient()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/patients', (req, res) => {
    createPatient(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/patients/:id', (req, res) => {
    deletePatient(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

const getPatient = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM patient', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}
const createPatient = (body) => {
    return new Promise(function (resolve, reject) {
        const {first_name, last_name, phone_number} = body
        pool.query('INSERT INTO patient (first_name, last_name, phone_number) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, phone_number], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new patient has been added added: ${results.rows[0]}`)
        })
    })
}
const deletePatient = () => {
    return new Promise(function (resolve, reject) {
        const id = parseInt(request.params.id)
        pool.query('DELETE FROM patient WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Merchant deleted with ID: ${id}`)
        })
    })
}

module.exports = {
    getPatient,
    createPatient,
    deletePatient,
}