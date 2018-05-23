class ChatWS {
  static addEvents(socket, io) {
    socket.on('chat message', function(msg) {
      console.log('message: ' + msg)
      io.emit('chat message', msg)
    })
  }
}

module.exports = ChatWS
