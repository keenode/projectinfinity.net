import React from 'react'

import styles from './ModalHeader.css'

const modalHeader = (props) => (
  <header className={styles.ModalHeader}>
    <h3>{props.title}</h3>
    {props.children}
  </header>
)

export default modalHeader
