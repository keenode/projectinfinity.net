const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401)
  }

  // Get the last part from a authorization header string like "Bearer <token-value>"
  const token = req.headers.authorization.split(' ')[1]

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    console.log('starting auth check...')
    console.log(decoded)
    
    if (err) { return res.sendStatus(401) }

    const userId = decoded.user._id
    console.log('determine access for user: ', userId)

    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.sendStatus(401)
      }

      return next()
    })
  })
}
