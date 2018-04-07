const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/users')

passport.use(
  new GoogleStrategy({
    callbackURL: '/api/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    console.log('passport cb function fired!')
    console.log(profile)
    new User({
      email: profile.emails.find(email => email.type === 'account').value,
      googleId: profile.id
    })
    .save()
    .then(newUser => {
      console.log('new user created: ', newUser)
    })
  })
)
