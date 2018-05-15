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

// Ocean
const o = {
  gfxId: 0,
  terrainName: 'Ocean'
}

// Grassland
const G = {
  gfxId: 1,
  terrainName: 'Grasslands'
}

// Proposed /worlds/:id/maps/:id
// Each world is composed of multiple "maps"
// Map with 'isMain: true' is the central overview map
router.get('/worlds/:id', authCheck, function (req, res) {
  // World.findOne({ _id: req.params.id }).then(function (world) {
  //   res.json({ world })
  // })
  res.json({
    world: {
      tiles: [
        [G, G, o, o, G, G, o, G, G, G, o, o, G, G, o, G, G, G, G, G, G, G, o, G, G, G, o, o, G, G, o, G],
        [G, G, o, o, G, o, o, G, G, G, o, o, G, o, o, G, G, G, G, o, G, G, o, G, G, G, o, o, G, G, G, G],
        [G, o, o, o, o, o, G, o, G, o, o, o, o, o, G, o, G, G, G, G, G, G, o, G, G, G, o, o, G, G, G, G],
        [G, G, o, G, G, o, o, G, G, G, o, G, G, o, o, G, G, G, o, G, G, G, o, G, G, G, o, o, G, G, G, G],
        [G, G, G, G, o, o, G, G, G, G, G, G, o, o, G, G, G, G, o, o, G, G, o, G, G, G, o, o, G, G, o, G],
        [G, G, G, G, G, G, G, G, G, G, G, G, o, o, G, G, G, G, o, o, G, G, o, G, G, G, o, o, G, G, o, G],
        [G, G, G, G, G, G, G, G, G, G, G, G, o, o, G, G, G, G, o, o, G, G, o, G, G, G, o, o, G, G, o, G],
        [G, G, G, G, o, G, G, G, G, G, G, G, o, o, G, G, G, G, o, G, G, G, G, G, G, G, o, o, G, G, o, G],
        [G, G, G, G, o, o, G, G, G, G, G, G, o, o, G, G, G, G, G, o, G, G, o, G, G, G, o, o, G, G, o, G],
        [G, G, G, G, o, o, G, G, G, G, G, G, o, o, G, G, G, G, o, o, G, G, o, G, G, G, o, o, G, G, o, G],
        [G, G, G, G, o, o, G, G, G, G, G, G, o, o, G, G, G, G, o, o, G, G, o, G, G, G, G, o, G, G, o, G],
        [G, G, G, G, o, o, G, G, G, G, G, G, o, o, G, G, G, G, o, o, G, G, o, G, G, G, o, o, G, G, o, G],
        [G, G, G, G, o, o, G, G, G, G, G, G, o, o, G, G, G, G, o, o, G, G, o, G, G, G, o, o, G, G, o, G]
      ]
    }
  })
})

module.exports = router
