const router = require('express').Router()
const passport = require('passport')

router.get('/login', function (req, res) {
  res.send('Auth!')
})

router.get('/logout', function (req, res) {
  res.send('Logout!')
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/google/redirect',
  passport.authenticate('google'),
  function (req, res) {
    res.redirect('http://localhost:9000')
})

module.exports = router
