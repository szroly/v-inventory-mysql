const express = require('express')

const db = require('./config/db')

const vehicles = require('./routes/vehicles')

const firstaid = require('./routes/firstAid')

const equipments = require('./routes/equipments')

const tires = require('./routes/tires')

const users = require('./routes/users')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/vehicles', vehicles)

app.use('/firstaid', firstaid)

app.use('/equipments', equipments)

app.use('/tires', tires)

app.use('/users', users)



app.listen(3001, () => {
  console.log('server is running on port 3001')
  
})