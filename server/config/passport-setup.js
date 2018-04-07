const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const jwt = require('jsonwebtoken')
const keys = require('./keys')
const User = require('../models/user')
const config = require('../config')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user.id)
  })
})

passport.use(
  new GoogleStrategy({
    callbackURL: '/api/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // console.log(profile)
    User.findOne({ googleId: profile.id }).then(currentUser => {
      if (currentUser) {
        console.log('user is: ', currentUser)
        jwt.sign({ currentUser }, config.jwtSecret, { expiresIn: '14 days' }, (err, token) => {
          console.log('token: ' + token)
          currentUser.token = token
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
          done(null, newUser)
        })
      }
    })
  })
)
