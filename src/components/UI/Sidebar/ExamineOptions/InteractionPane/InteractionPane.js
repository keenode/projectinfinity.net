import React from 'react'

import styles from './InteractionPane.css'

const interactionPane = props => (
  <div className={styles.InteractionPane}>
    <ul className={styles.Filters}>
      <li className={styles.Filter_Active}>All</li>
      <li>Players</li>
      <li>NPCs</li>
      <li>Monsters</li>
      <li>Buildings</li>
    </ul>
  </div>
)

export default interactionPane
