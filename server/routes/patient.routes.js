const Router = require('express')
const router = new Router()
const patientController = require('./patient.controller')

router.post('/patient', patientController.createPatient)
router.get('/patients', patientController.getPatients)
router.get('/patient', patientController.getOnePatient)
router.put('/patient', patientController.updatePatient)
router.delete('/patient/:id', patientController.deletePatient)

module.exports = router