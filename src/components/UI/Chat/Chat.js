import React from 'react'

import styles from './Chat.css'

const chat = props => (
  <div className={styles.Chat}>
    <ul className={styles.ChatRoomTabs}>
      <li className={styles.ChatRoomTab}>System</li>
      <li className={styles.ChatRoomTab}>Combat</li>
      <li className={[styles.ChatRoomTab, styles.ChatRoomTabActive].join(' ')}>General</li>
      <li className={styles.ChatRoomTab}>Region</li>
    </ul>
    <div className={styles.MessagesContainer}>
      <p className={styles.Message}>
        <span className={styles.MessageTimestamp}>[8:50pm]:</span> {props.messages}
      </p>
    </div>
  </div>
)

export default chat
