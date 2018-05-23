const messages = []

class ChatDirector {
  static addMessage(msg) {
    messages.push(msg)
    console.log(messages)
  }

  static getMessages() {
    return messages
  }
}

module.exports = ChatDirector
