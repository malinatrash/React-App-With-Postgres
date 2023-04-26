const express = require('express')
const patientRouter = require('./routes/patient.routes')

const PORT = 3001

const app = express()

app.use(express.json())
app.use('/api', patientRouter)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})