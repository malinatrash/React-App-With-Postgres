const express = require('express')
const patientRouter = require('./routes/patient.routes')
const PORT = 3001

const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json())
app.use('/api', patientRouter)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})