import React from 'react'

import styles from './InteractionPane.css'

const interactionPane = props => {
  const list = props.otherCharacters.map(character => (
    <li key={character.name}>{character.name}</li>
  ))

  return (
    <div className={styles.InteractionPane}>
      <ul className={styles.Filters}>
        <li className={styles.Filter_Active}>All</li>
        <li>Players</li>
        <li>NPCs</li>
        <li>Monsters</li>
        <li>Buildings</li>
      </ul>
      <ul className={styles.List}>
        {list}
      </ul>
    </div>
  )
}

export default interactionPane
