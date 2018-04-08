const LocalStrategy = require('passport-local')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const config = require('../../config')

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  },
  function(req, email, password, done) {
    console.log('attempting user registration...')
    const userData = {
      email: email.trim(),
      password: password.trim()
    }
  
    User.findOne({ email: userData.email }).then(existingUser => {
      if (existingUser) {
        console.log('user already exists!')
        return done(null, {
          error: 'User already exists!'
        })
      }
      
      new User(userData)
      .save()
      .then(newUser => {
        jwt.sign({ user: newUser }, config.jwtSecret, { expiresIn: '14 days' }, (err, token) => {
          newUser.token = token
          console.log('new local user: ', newUser)
          return done(null, newUser)
        })
      })
    })
  }
)
