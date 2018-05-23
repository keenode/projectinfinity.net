const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')
const ChatMessage = require('../../models/chat-message')
const Character = require('../../models/character')
const ChatDirector = require('../../game/chat/ChatDirector')

/*
 * GET all chat messages
 */
router.get('/chat/messages', authCheck, function (req, res) {
  ChatMessage.find().lean().then(messages => {
    formatChatMessagesWithCharacterName(messages, () => {
      res.json({ messages })
    })
  })
})

/*
 * ADD a chat message
 */
router.post('/chat/messages', authCheck, function (req, res) {
  new ChatMessage({
    character_id: req.body.character_id,
    contents: req.body.message
  })
  .save()
  .then(sentMessage => {
    ChatMessage.find().lean().then(messages => {
      formatChatMessagesWithCharacterName(messages, () => {
        res.json({
          messages,
          sentMessage
        })
      })
    })
  })
})

/*
 * TEST ChatDirector
 */
router.get('/chat/cm-messages', authCheck, function (req, res) {
  res.json({
    messages: ChatDirector.getMessages()
  })
})

function formatChatMessagesWithCharacterName(messages, cb) {
  Character.find().then(characters => {
    messages.forEach(message => {
      const characterName = characters.find(character => character._id.equals(message.character_id)).name
      message.characterName = characterName
    })
    cb()
  })
}

module.exports = router
