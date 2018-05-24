const ChatDirector = require('../game/chat/ChatDirector')

class ChatWS {
  static addEvents(socket, io) {
    socket.on('action', action => {
      if (action.type === 'ws/chat-message-sent') {
        console.log('charId: ' + action.charId)
        console.log('message: ' + action.message)
        ChatDirector.addMessage(action.charId, action.message, newMessage => {
          io.emit('action', {
            type: 'ws/chat-message-added',
            message: {
              ...newMessage.newModel._doc,
              characterName: newMessage.characterName
            }
          })
        })
      }
    })
  }
}

module.exports = ChatWS
