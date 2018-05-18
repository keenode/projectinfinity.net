const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const MapSchema = new Schema({
  world_id: {
    type: ObjectId,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  size: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  tiles: {
    type: Array,
    required: true
  }
})

const Map = mongoose.model('map', MapSchema)

module.exports = Map
