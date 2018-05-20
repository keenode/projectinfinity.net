import React from 'react'

import styles from './MessageEntry.css'

const messageEntry = props => {
  return (
    <div className={styles.MessageEntry}>
      <span>Send:</span>
      <div className={styles.MessageEntryInner}>
        <input type="text" />
      </div>
    </div>
  )
}

export default messageEntry
