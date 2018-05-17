const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')
// const World = require('../../models/world')

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

/*
 * GET all worlds
 */
router.get('/worlds', authCheck, function (req, res) {
  // World.find().then(function (worlds) {
  //   res.json({
  //     worlds
  //   })
  // })
})

/*
 * GET a world
 */
router.get('/worlds/:id', authCheck, function (req, res) {
  // World.findOne({ _id: req.params.id }).then(function (world) {
  //   res.json({ world })
  // })
  const tiles = generateTiles()
  res.json({
    world: {
      name: 'Corelisto',
      map: {
        size: {
          width: MAP_W,
          height: MAP_H
        },
        tiles
      }
    }
  })
})

/*
 * CREATE a new world
 */
router.post('/worlds', authCheck, function (req, res) {

})

/*
 * UPDATE a world
 */
router.put('/worlds/:id', authCheck, function (req, res) {

})

/*
 * DELETE a world
 */
router.delete('/worlds/:id', authCheck, function (req, res) {

})

/*
 * GET all maps belonging to a world
 */
router.get('/worlds/:id/maps', authCheck, function (req, res) {

})

/*
 * GET a map belonging to a world
 */
router.get('/worlds/:id/maps/:id', authCheck, function (req, res) {
  const tiles = generateTiles()
  res.json({
    map: {
      name: 'Corelisto World Map',
      size: {
        width: MAP_W,
        height: MAP_H
      },
      tiles
    }
  })
})

/*
 * CREATE a new map belonging to a world
 */
router.post('/worlds/:id/maps', authCheck, function (req, res) {

})

/*
 * UPDATE a map belonging to a world
 */
router.put('/worlds/:id/maps/:id', authCheck, function (req, res) {

})

/*
 * DELETE a map belonging to a world
 */
router.delete('/worlds/:id/maps/:id', authCheck, function (req, res) {

})

module.exports = router
