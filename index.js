const express = require('express')
const app = express()
const mongoose = require('mongoose') //ORM for mongodb
const bodyParser = require('body-parser')
//const router = require('./config/router')// ge router module
//const logger = require('./lib/logger')
const { dbURI, port } = require('./config/environment')

mongoose.connect(
  dbURI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('mongo is connected. ')  
) // connect our db first

app.use(bodyParser.json()) //bp middleware

//app.use(logger)// registering custom logger

app.get('/*', (req, res) => res.status(404).json({ message: 'Not Found checking' })) // catch all

app.listen(port, () => console.log(`server listening on port ${port}`))

module.exports = app
