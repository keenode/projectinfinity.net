import React from 'react'

import styles from './Chat.css'

const chat = props => (
  <div className={styles.Chat}>
    <p>{props.messages}</p>
  </div>
)

export default chat
