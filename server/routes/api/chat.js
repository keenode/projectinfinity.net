const router = require('express').Router()
const authCheck = require('../../middleware/auth-check')
const ChatMessage = require('../../models/chat-message')
const Character = require('../../models/character')
const ChatDirector = require('../../game/chat/ChatDirector')

// Set messages in memory on startup
getChatMessages(messages => {
  ChatDirector.setMessages(messages)
})

/*
 * GET all chat messages
 */
router.get('/chat/messages', authCheck, function (req, res) {
  const messages = ChatDirector.getMessages().map(message => message.newModel ? {
    ...message.newModel._doc,
    characterName: message.characterName
  } : message)

  res.json({ messages })
  // getChatMessages(messages => {
  //   res.json({ messages })
  // })
})

/*
 * ADD a chat message
 */
router.post('/chat/messages', authCheck, function (req, res) {
  ChatDirector.addMessage(req.body.character_id, req.body.message)
  // new ChatMessage({
  //   character_id: req.body.character_id,
  //   contents: req.body.message
  // })
  // .save()
  // .then(sentMessage => {
  //   ChatMessage.find().lean().then(messages => {
  //     formatChatMessagesWithCharacterName(messages, () => {
  //       res.json({
  //         messages,
  //         sentMessage
  //       })
  //     })
  //   })
  // })
})

function getChatMessages(done) {
  ChatMessage.find().lean().then(messages => {
    formatChatMessagesWithCharacterName(messages, () => {
      done(messages)
    })
  })
}

function formatChatMessagesWithCharacterName(messages, done) {
  Character.find().then(characters => {
    messages.forEach(message => {
      const characterName = characters.find(character => character._id.equals(message.character_id)).name
      message.characterName = characterName
    })
    done()
  })
}

module.exports = router
