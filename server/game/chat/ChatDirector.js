const ChatMessage = require('../../models/chat-message')
const Character = require('../../models/character')
let messages = []
const saveIntervalSeconds = 5

class ChatDirector {
  static start() {
    console.log('[ChatDirector] Started')
    setInterval(this.saveChatMessages.bind(this), saveIntervalSeconds * 1000)
  }

  static addMessage(charId, msg, done) {
    findCharacterName(charId, characterName => {
      const newMessage = {
        newModel: new ChatMessage({
          character_id: charId,
          contents: msg
        }),
        characterName
      }
      messages.push(newMessage)
      done(newMessage)
    })
  }

  static saveChatMessages() {
    console.log('[ChatDirector] Saving chat messages...')
    const newMessages = messages.map(message => message.newModel ? {
      ...message.newModel._doc,
      characterName: message.characterName
    } : null).filter(message => message !== null)

    if (newMessages.length > 0) {
      ChatMessage.insertMany(newMessages)
        .then(() => {
          messages = messages.filter(message => message.newModel ? null : message)
          messages.push(...newMessages)
          console.log('[ChatDirector] Chat messages saved')
        })
      }
  }

  static setMessages(msgs) {
    messages = msgs
  }

  static getMessages() {
    return messages
  }
}

// TODO: Handle characters in memory with CharacterDirector
function findCharacterName(charId, done) {
  Character.find().then(characters => {
    const characterName = characters.find(character => character._id.equals(charId)).name
    done(characterName)
  })
}

module.exports = ChatDirector
