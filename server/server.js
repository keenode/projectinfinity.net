const express = require('express')
const app = express()
// const mongo = require('mongodb')
// const assert = require('assert')
const routes = require('./routes/api')

const url = 'mongodb://localhost:27017/projectinfinity'

const SERVER_PORT = process.env.PORT || 9001
const CLIENT_ORIGIN = 'http://localhost:9000'

// CORS Middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_ORIGIN)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => res.send('PI Server API'))
app.get('/api', (req, res) => res.send({ message: 'Hello from PI API!' }))

app.use('/api', routes)

app.listen(SERVER_PORT, () => console.log('PI Server listening on port ' + SERVER_PORT))
