import React from 'react'

import styles from './MenuBox.css'

const menuBox = props => (
  <div className={styles.MenuBox}>
    <ul className={styles.MenuItems}>
      <li className={styles.MenuItem}>(I)nventory</li>
      <li className={styles.MenuItem}>(E)mail</li>
      <li className={styles.MenuItem}>(P)rofile</li>
      <li className={styles.MenuItem}>(K)nowledge Base</li>
    </ul>
  </div>
)

export default menuBox
