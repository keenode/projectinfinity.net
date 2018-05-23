const ChatDirector = require('../game/chat/ChatDirector')

class ChatWS {
  static addEvents(socket, io) {
    socket.on('chat message', function(msg) {
      console.log('message: ' + msg)
      ChatDirector.addMessage(msg)
      io.emit('chat message', msg)
    })
  }
}

module.exports = ChatWS
