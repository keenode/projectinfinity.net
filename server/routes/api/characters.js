const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')
const Character = require('../../models/character')

/*
 * GET all characters
 */
router.get('/characters', authCheck, function (req, res) {
  Character.find().then(characters => {
    res.json({
      characters,
      slots: 0,
      slotsMax: 2
    })
  })
})

/*
 * GET a character
 */
router.get('/characters/:id', authCheck, function (req, res) {
  Character.findOne({ _id: req.params.id }).then(character => {
    res.json({ character })
  })
})

/*
 * CREATE a character
 */
router.post('/characters', authCheck, function (req, res) {
  new Character({
    name: req.body.name,
    gender: req.body.gender,
    race: req.body.race,
    level: 1,
    exp: 0,
    expMax: 1000,
    vam: {
      vitality: 100,
      vitalityMax: 100,
      action: 100,
      actionMax: 100,
      mind: 100,
      mindMax: 100
    },
    position: {
      x: 0,
      y: 0
    }
  })
  .save()
  .then(newCharacter => {
    res.json({
      character: newCharacter
    })
  })
})

/*
 * UPDATE a character
 */
router.put('/characters/:id', authCheck, function (req, res) {
  Character.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Character.findOne({ _id: req.params.id })
        .then(character => {
          res.json({ character })
        })
    })
})

/*
 * DELETE a character
 */
router.delete('/characters/:id', function (req, res) {
  Character.findByIdAndRemove({ _id: req.params.id })
    .then(character => {
      res.json({ character })
    })
})

module.exports = router
