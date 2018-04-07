const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/users')

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
        done(null, currentUser)
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
