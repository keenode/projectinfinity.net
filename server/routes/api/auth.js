const router = require('express').Router()
const passport = require('passport')

router.post('/login',
  passport.authenticate('local', { session: false }),
  function(req, res) {
    console.log('user logged in: ', req.user)
    res.json({
      message: 'worked!'
    })
})

router.post('/register',
  passport.authenticate('local', { session: false }),
  function(req, res) {
    console.log('user created: ', req.user)
    if (req.user.error) {
      res.status(409).json({
        error: req.user.error
      })
    } else {
      res.json({
        email: req.user.email,
        token: req.user.token
      })
    }
})

router.get('/logout', function(req, res) {
  res.send('Logout!')
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/google/redirect',
  passport.authenticate('google', { session: false }),
  function (req, res) {
    console.log(req.user)
    res.redirect('http://localhost:9000?token=' + req.user.token)
})

module.exports = router
