const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')

const Ninja = require('../../models/ninja')

router.get('/ninjas', function (req, res) {
  Ninja.find().then(function (ninjas) {
    res.send(ninjas)
  })
})

router.post('/ninjas', function (req, res, next) {
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja)
    })
    .catch(next)
})

router.put('/ninjas/:id', function (req, res) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Ninja.findOne({ _id: req.params.id })
        .then(function (ninja) {
          res.send(ninja)
        })
    })
})

router.delete('/ninjas/:id', function (req, res) {
  Ninja.findByIdAndRemove({ _id: req.params.id })
    .then(function (ninja) {
      res.send(ninja)
    })
})

// *** Chat ***

router.get('/chat/messages', authCheck, function (req, res) {
  res.send({
    messages: 'Welcome to Project Infinity!'
  })
})

module.exports = router
