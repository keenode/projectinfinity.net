import React from 'react'

import styles from './List.css'

const list = (props) => (
  <ul className={styles.List}>
    {props.children}
  </ul>
)

export default list
