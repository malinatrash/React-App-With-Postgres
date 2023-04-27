const db = require("../db");

class PatientController {
    async createPatient(req, res) {
        const {first_name, last_name, phone_number} = req.body
        const newPatient = await db.query(
            `INSERT INTO patient (id, first_name, last_name, phone_number)
             VALUES (default, $1, $2, $3) RETURNING *`,
            [first_name, last_name, phone_number]
        )
        console.log(first_name)
        res.json(newPatient)
    }

    async getPatients(req, res) {
        const patients = await db.query(
            `SELECT *
             FROM patient`
        )
        res.json(patients)
    }

    async getOnePatient(req, res) {
        const {first_name, last_name, phone_number} = req.body
        const patients = await db.query(
            `SELECT *
             FROM patient
             where first_name = $1 and last_name = $2 and phone_number = $3`, [first_name, last_name, phone_number]
        )
        res.json(patients.rows[0])
    }

    async updatePatient(req, res) {
        const {id, first_name, last_name, phone_number} = req.body
        const patient = await db.query(
            `UPDATE patient
             set first_name   = $1,
                 last_name    = $2,
                 phone_number = $3,
                 where id = $4 RETURNING *`,
            [first_name, last_name, phone_number, id]
        )
        res.json(patient.row[0])
    }

    async deletePatient(req, res) {
        const id = req.params.id
        const patients = await db.query(
            `DELETE
             FROM patient
             where id = $1`, [id]
        )
        res.json(patients.rows[0])
    }
}

module.exports = new PatientController()