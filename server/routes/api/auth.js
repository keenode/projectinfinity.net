const router = require('express').Router()

router.get('/login', function (req, res) {
  res.send('Auth!')
})

router.get('/logout', function (req, res) {
  res.send('Logout!')
})

router.get('/google', function (req, res) {
  res.send('Google!')
})

module.exports = router
