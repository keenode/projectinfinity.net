import React, { Component } from 'react'

import styles from './MessageEntry.css'

class MessageEntry extends Component {
  constructor(props) {
    super(props)
    this.messageInputRef = React.createRef()
  }

  componentDidMount() {
    this.messageInputRef.current.focus()
  }

  render() {
    return (
      <form className={styles.MessageEntry} onSubmit={this.props.submitted}>
        <span>Chat:</span>
        <div className={styles.MessageEntryInner}>
          <input
            ref={this.messageInputRef}
            type="text"
            onChange={this.props.changed}
            value={this.props.message} />
          <button className={[styles.SendBtn, this.props.message.length > 0 ? styles.IsEnabled : null].join(' ')}
            type="submit">
            Send
          </button>
        </div>
      </form>
    )
  }
}

export default MessageEntry
