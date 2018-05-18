const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorldSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  map: {
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
  }
})

const World = mongoose.model('world', WorldSchema)

module.exports = World
