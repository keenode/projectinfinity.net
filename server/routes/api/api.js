const router = require('express').Router()
const charactersRoutes = require('./characters')
const worldsRoutes = require('./worlds')
const chatRoutes = require('./chat')

router.use(charactersRoutes)
router.use(worldsRoutes)
router.use(chatRoutes)

// EXL Tutorial Routes...
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

module.exports = router
