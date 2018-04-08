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
    console.log('attempting user login...')
    const userData = {
      email: email.trim(),
      password: password.trim()
    }
  
    // const newUser = new User(userData)
    User.findOne({ email: userData.email }).then(existingUser => {
      if (!existingUser) {
        console.log('invalid email or password!')
        return done(null, {
          error: 'Invalid email or password!'
        })
      } else {
        existingUser.comparePassword(userData.password, (passwordErr, isMatch) => {
          if (!isMatch) {
            return done(null, {
              error: 'Invalid email or password!'
            })
          }
    
          jwt.sign({ user: existingUser }, config.jwtSecret, { expiresIn: '14 days' }, (err, token) => {
            existingUser.token = token
            console.log('logged in as user: ', existingUser)
            return done(null, existingUser)
          })
        })
      }
    })
  }
)
