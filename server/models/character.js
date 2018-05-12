const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CharacterSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  gender: {
    type: String,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  exp: {
    type: Number,
    required: true
  },
  expMax: {
    type: Number,
    required: true
  },
  vam: {
    vitality: {
      type: Number,
      required: true
    },
    vitalityMax: {
      type: Number,
      required: true
    },
    action: {
      type: Number,
      required: true
    },
    actionMax: {
      type: Number,
      required: true
    },
    mind: {
      type: Number,
      required: true
    },
    mindMax: {
      type: Number,
      required: true
    }
  },
  position: {
    x: Number,
    y: Number
  }
})

const Character = mongoose.model('character', CharacterSchema)

module.exports = Character
