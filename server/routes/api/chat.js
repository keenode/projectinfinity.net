const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')
const ChatMessage = require('../../models/chat-message')

/*
 * GET all chat messages
 */
router.get('/chat/messages', authCheck, function (req, res) {
  ChatMessage.find().then(messages => {
    res.json({ messages })
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
    ChatMessage.find().then(messages => {
      res.json({
        messages,
        sentMessage
      })
    })
  })
})

module.exports = router
