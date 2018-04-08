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
  User.findOne({ googleId: profile.id }).then(currentUser => {
    if (currentUser) {
      console.log('user already exists: ', currentUser)
      jwt.sign({ user: currentUser }, config.jwtSecret, { expiresIn: '14 days' }, (err, token) => {
        currentUser.token = token
        console.log('currentUser: ', currentUser)
        done(null, currentUser)
      })
    } else {
      new User({
        email: profile.emails.find(email => email.type === 'account').value,
        googleId: profile.id
      })
      .save()
      .then(newUser => {
        console.log('new user created: ', newUser)
        jwt.sign({ user: newUser }, config.jwtSecret, { expiresIn: '14 days' }, (err, token) => {
          newUser.token = token
          done(null, newUser)
        })
      })
    }
  })
})
