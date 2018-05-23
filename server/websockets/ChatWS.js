const ChatDirector = require('../game/chat/ChatDirector')

class ChatWS {
  static addEvents(socket, io) {
    socket.on('chat message', function(msg) {
      console.log('message: ' + msg)
      ChatDirector.addMessage('5af75e19f5a7f67278440877', msg)
      io.emit('chat message', msg)
    })
  }
}

module.exports = ChatWS
