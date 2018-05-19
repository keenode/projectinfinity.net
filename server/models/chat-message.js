const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const ChatMessageSchema = new Schema({
  character_id: {
    type: ObjectId,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sent: {
    type: Date,
    default: Date.now
  }
})

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema, 'chatMessages')

module.exports = ChatMessage
