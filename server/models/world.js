const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorldSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  datetime: {
    day: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    hour: {
      type: Number,
      required: true
    },
    minute: {
      type: Number,
      required: true
    }
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
