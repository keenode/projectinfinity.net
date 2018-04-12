const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')

router.get('/chat/messages', authCheck, function (req, res) {
  res.json({
    messages: 'Welcome to Project Infinity!'
  })
})

module.exports = router
