const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')
const Character = require('../../models/character')

router.get('/characters', authCheck, function (req, res) {
  Character.find().then(function (characters) {
    res.json({
      characters,
      slots: 0,
      slotsMax: 2
    })
  })
})

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
    }
  })
  .save()
  .then(newCharacter => {
    console.log('new character created: ', newCharacter)
    res.json({
      character: newCharacter
    })
  })
})

module.exports = router
