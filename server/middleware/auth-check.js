const jwt = require('jsonwebtoken')
// const User = require('mongoose').model('User')
const User = require('../models/user')
const config = require('../config')

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401)
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1]

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.sendStatus(401) }

    const userId = decoded.user.id
    console.log('determine access for user: ', userId)

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.sendStatus(401)
      }

      return next()
    })
  })
}
