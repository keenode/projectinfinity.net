import React, { Component } from 'react'

import styles from './MessageEntry.css'

class MessageEntry extends Component {
  constructor(props) {
    super(props)
    this.messageInput = React.createRef()
  }

  componentDidMount() {
    this.messageInput.current.focus()
  }

  render() {
    return (
      <form className={styles.MessageEntry} onSubmit={this.props.submitted}>
        <span>Chat:</span>
        <div className={styles.MessageEntryInner}>
          <input ref={this.messageInput} type="text" onChange={this.props.changed} value={this.props.message} />
          <button className={styles.SendBtn} type="submit">Send</button>
        </div>
      </form>
    )
  }
}

export default MessageEntry
