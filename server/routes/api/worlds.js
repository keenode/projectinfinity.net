const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')
const World = require('../../models/world')
const Map = require('../../models/map')
const RandomMapGenerator = require('../../game/world/maps/RandomMapGenerator')
const TickDirector = require('../../game/time/TickDirector')

/*
 * GET all worlds
 */
router.get('/worlds', authCheck, function (req, res) {
  World.find().then(worlds => {
    res.json({ worlds })
  })
})

/*
 * GET a world
 */
router.get('/worlds/:id', authCheck, function (req, res) {
  World.findOne({ _id: req.params.id }).then(world => {
    res.json({ world })
  })
})

/*
 * GET a world's current datetime
 */
router.get('/worlds/:id/datetime', authCheck, function (req, res) {
  res.json({ datetime: TickDirector.worldDatetime })
})

/*
 * CREATE a new world
 */
router.post('/worlds', authCheck, function (req, res) {
  const mapW = req.body.map.size.width
  const mapH = req.body.map.size.height
  const tiles = RandomMapGenerator.generateTiles(mapW, mapH)
  new World({
    name: req.body.name,
    datetime: {
      day: 1,
      month: 1,
      year: 0,
      hour: 0,
      minute: 0
    },
    map: {
      size: {
        width: mapW,
        height: mapH
      },
      tiles
    }
  })
  .save()
  .then(newWorld => {
    res.json({
      world: newWorld
    })
  })
})

/*
 * UPDATE a world
 */
router.put('/worlds/:id', authCheck, function (req, res) {
  World.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      World.findOne({ _id: req.params.id })
        .then(world => {
          res.json({ world })
        })
    })
})

/*
 * DELETE a world
 */
router.delete('/worlds/:id', authCheck, function (req, res) {
  World.findByIdAndRemove({ _id: req.params.id })
    .then(world => {
      res.json({ world })
    })
})

/*
 * GET all maps belonging to a world
 */
router.get('/worlds/:world_id/maps', authCheck, function (req, res) {
  Map.find({ world_id: req.params.world_id }).then(maps => {
    res.json({
      maps
    })
  })
})

/*
 * GET a map
 */
router.get('/maps/:id', authCheck, function (req, res) {
  Map.findOne({ _id: req.params.id }).then(map => {
    res.json({ map })
  })
})

/*
 * CREATE a new map belonging to a world
 */
router.post('/worlds/:world_id/maps', authCheck, function (req, res) {
  const mapW = req.body.size.width
  const mapH = req.body.size.height
  const tiles = RandomMapGenerator.generateTiles(mapW, mapH)
  new Map({
    world_id: req.params.world_id,
    name: req.body.name,
    size: {
      width: mapW,
      height: mapH
    },
    tiles
  })
  .save()
  .then(newMap => {
    res.json({
      map: newMap
    })
  })
})

/*
 * UPDATE a map
 */
router.put('/maps/:id', authCheck, function (req, res) {
  Map.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Map.findOne({ _id: req.params.id })
        .then(map => {
          res.json({ map })
        })
    })
})

/*
 * DELETE a map
 */
router.delete('/maps/:id', authCheck, function (req, res) {
  Map.findByIdAndRemove({ _id: req.params.id })
    .then(map => {
      res.json({ map })
    })
})

module.exports = router
