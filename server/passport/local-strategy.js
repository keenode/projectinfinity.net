const LocalStrategy = require('passport-local')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
    passReqToCallback: true,
    session: false
  },
  function(req, email, password, done) {
    const userData = {
      email: email.trim(),
      password: password.trim(),
      name: req.body.name.trim()
    }
  
    const newUser = new User(userData)
    newUser.save(err => {
      if (err) { return done(err) }
      return done(null)
    })
  }
)
