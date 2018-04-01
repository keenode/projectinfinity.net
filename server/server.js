const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/projectinfinity')
mongoose.Promise = global.Promise

const routes = require('./routes/api')

const SERVER_PORT = process.env.PORT || 9001
const CLIENT_ORIGIN = 'http://localhost:9000'

// CORS Middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_ORIGIN)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('PI Server API'))
app.get('/api', (req, res) => res.send({ message: 'Hello from PI API!' }))

app.use('/api', routes)

// Error handling middleware
app.use(function (err, req, res, next) {
  // console.log(err)
  res.status(422).send({ error: err.message })
})

app.listen(SERVER_PORT, () => console.log('PI Server listening on port ' + SERVER_PORT))
