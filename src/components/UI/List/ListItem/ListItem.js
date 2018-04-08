import React from 'react'

import styles from './ListItem.css'

const listItem = (props) => (
  <li className={styles.ListItem}>
    {props.children}
  </li>
)

export default listItem
