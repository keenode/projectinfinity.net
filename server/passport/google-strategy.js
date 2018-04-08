const GoogleStrategy = require('passport-google-oauth20')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/user')
const config = require('../config')

module.exports = new GoogleStrategy({
  callbackURL: '/api/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  // console.log(profile)
  User.findOne({ googleId: profile.id }).then(existingUser => {
    if (existingUser) {
      console.log('user already exists: ', existingUser)
      jwt.sign({ user: existingUser }, config.jwtSecret, { expiresIn: '14 days' }, (err, token) => {
        existingUser.token = token
        console.log('existingUser: ', existingUser)
        return done(null, existingUser)
      })
    } else {
      new User({
        email: profile.emails.find(email => email.type === 'account').value,
        googleId: profile.id
      })
      .save()
      .then(newUser => {
        jwt.sign({ user: newUser }, config.jwtSecret, { expiresIn: '14 days' }, (err, token) => {
          newUser.token = token
          console.log('new user created: ', newUser)
          return done(null, newUser)
        })
      })
    }
  })
})
