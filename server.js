const express = require('express')

const db = require('./config/db')

const vehicles = require('./routes/vehicles')

const firstaid = require('./routes/firstAid')

const equipments = require('./routes/equipments')

const tires = require('./routes/tires')

const users = require('./routes/users')

const insurances = require('./routes/insurances')

const services = require('./routes/services')

const cleanExpiredTokens = require('./config/cronJobs')

const cors = require('cors')



const app = express()

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use('/vehicles', vehicles)

app.use('/first_aid', firstaid)

app.use('/equipments', equipments)

app.use('/tires', tires)

app.use('/users', users)

app.use('/insurances', insurances)

app.use('/services', services)

cleanExpiredTokens()

app.listen(process.env.PORT || 2000,"0.0.0.0", () => {
  console.log("server started...");
});