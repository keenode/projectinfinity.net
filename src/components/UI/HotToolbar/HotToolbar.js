import React from 'react'

import styles from './HotToolbar.css'

const hotToolbar = props => (
  <div className={styles.HotToolbar}>
    <ul className={styles.Slots}>
      <li className={styles.Slot}>1</li>
      <li className={styles.Slot}>2</li>
      <li className={styles.Slot}>3</li>
      <li className={styles.Slot}>4</li>
      <li className={styles.Slot}>5</li>
      <li className={styles.Slot}>6</li>
      <li className={styles.Slot}>7</li>
      <li className={styles.Slot}>8</li>
      <li className={styles.Slot}>9</li>
      <li className={styles.Slot}>0</li>
    </ul>
  </div>
)

export default hotToolbar
