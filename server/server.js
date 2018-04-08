/**
 * Notes:
 * https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
 */
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('./config')
const db = require('./db')
const authCheck = require('./middleware/auth-check')

const app = express()

db.connect(config.dbUri)

const routes = require('./routes/api/api')
const authRoutes = require('./routes/api/auth')

const SERVER_PORT = process.env.PORT || 9001
const CLIENT_ORIGIN = 'http://localhost:9000'

app.use(passport.initialize())

const googleStrategy = require('./passport/google-strategy')
passport.use('google', googleStrategy)

// CORS Middleware
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_ORIGIN)
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

app.get('/api/protected', authCheck, function(req, res) {
  // jwt.verify(req.token, config.jwtSecret, function(err, data) {
    // console.log(err)
    // if (err) {
    //   res.sendStatus(403)
    // } else {
      res.json({
        message: 'protected!',
        // data
      })
    // }
  // })
})

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers['authorization']
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ')
//     const bearerToken = bearer[1]
//     req.token = bearerToken
//     next()
//   } else {
//     res.sendStatus(403)
//   }
// }

app.use('/api', routes)
app.use('/api/auth', authRoutes)

// Error handling middleware
app.use(function(err, req, res, next) {
  // console.log(err)
  res.status(422).send({ error: err.message })
})

app.listen(SERVER_PORT, () => console.log('PI Server listening on port ' + SERVER_PORT))
