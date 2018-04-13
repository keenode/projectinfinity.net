const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')
// const World = require('../../models/world')

// router.get('/worlds', authCheck, function (req, res) {
//   World.find().then(function (worlds) {
//     res.json({
//       worlds
//     })
//   })
// })

router.get('/worlds/:id', authCheck, function (req, res) {
  // World.findOne({ _id: req.params.id }).then(function (world) {
  //   res.json({ world })
  // })
  res.json({
    world: {
      tiles: [
        [0, 0, 1, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 1, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0, 0]
      ]
    }
  })
})

module.exports = router
