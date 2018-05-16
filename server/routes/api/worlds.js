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

const MAP_W = 30
const MAP_H = 20

function generateTiles() {
  const tiles = []
  for (let y = 0; y < MAP_H; y++) {
    const row = []
    for (let x = 0; x < MAP_W; x++) {
      const terrainProps = Math.random() * 5 < 4 ? G : o 
      row.push({
        ...terrainProps,
        location: {
          xCoord: x,
          yCoord: y
        }
      })
    }
    tiles.push(row)
  }
  return tiles
}

// Proposed /worlds/:id/maps/:id
// Each world is composed of multiple "maps"
// Map with 'isMain: true' is the central overview map
router.get('/worlds/:id', authCheck, function (req, res) {
  // World.findOne({ _id: req.params.id }).then(function (world) {
  //   res.json({ world })
  // })
  const tiles = generateTiles()
  res.json({
    world: {
      tiles
    }
  })
})

module.exports = router
