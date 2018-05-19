import React from 'react'

import styles from './Chat.css'

const chat = props => {
  const messages = props.messages.map(message => {
    // TODO: Format time properly depending on how old it is
    const date = new Date(message.sent)
    const dateSent = date.toUTCString()
    return (
      <li key={message._id} className={styles.Message}>
        <span className={styles.MessageTimestamp}>[{dateSent}]</span>
        <span className={styles.MessageCharacterName}>Keenode{message.characterName}</span>
        {message.contents}
      </li>
    )
  })
  return (
    <div className={styles.Chat}>
      <ul className={styles.ChatRoomTabs}>
        <li className={styles.ChatRoomTab}>System</li>
        <li className={styles.ChatRoomTab}>Combat</li>
        <li className={[styles.ChatRoomTab, styles.ChatRoomTabActive].join(' ')}>General</li>
        <li className={styles.ChatRoomTab}>Region</li>
      </ul>
      <ul className={styles.MessagesContainer}>
        {messages}
      </ul>
    </div>
  )
}

export default chat
