const ChatMessage = require('../../models/chat-message')
const Character = require('../../models/character')
let messages = []

// TODO: This class will also manage auto saving to the db after a while

class ChatDirector {
  static addMessage(charId, msg) {
    findCharacterName(charId, characterName => {
      messages.push({
        newModel: new ChatMessage({
          character_id: charId,
          contents: msg
        }),
        characterName
      })
    })
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
