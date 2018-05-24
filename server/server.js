const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('./config')
const db = require('./db')
const io = require('socket.io')()

const app = express()

db.connect(config.dbUri)

const routes = require('./routes/api/api')
const authRoutes = require('./routes/api/auth')

const API_PORT = process.env.PORT || 9001
const SOCKET_PORT = process.env.SOCKET_PORT || 9002
const CLIENT_ORIGIN = 'http://localhost:9000'

app.use(passport.initialize())

const googleStrategy = require('./passport/google-strategy')
const localLoginStrategy = require('./passport/local/local-login')
const localRegisterStrategy = require('./passport/local/local-register')
passport.use('google', googleStrategy)
passport.use('local-login', localLoginStrategy)
passport.use('local-register', localRegisterStrategy)

// CORS Middleware
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_ORIGIN)
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('PI Server API'))
app.get('/api', (req, res) => res.json({ message: 'Hello from PI API!' }))

app.get('/api/mock-login', function(req, res) {
  const user = { id: 1 }
  jwt.sign({ user }, config.jwtSecret, { expiresIn: '14 days' }, (err, token) => {
    res.json({ token })
  })
})

app.use('/api', routes)
app.use('/api/auth', authRoutes)

// Error handling middleware
app.use(function(err, req, res, next) {
  // console.log(err)
  res.status(422).send({ error: err.message })
})

const TickDirector = require('./game/time/TickDirector')
TickDirector.start()

const chatWs = require('./websockets/ChatWS')

io.on('connection', socket => {
  console.log(`[${new Date().toUTCString()}] A user connected.`)

  chatWs.addEvents(socket, io)

  socket.on('disconnect', () => {
    console.log(`[${new Date().toUTCString()}] A user disconnected.`)
  })
})

io.listen(SOCKET_PORT)

app.listen(API_PORT, () => console.log('PI API Server listening on port ' + API_PORT))
