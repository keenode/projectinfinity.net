import React from 'react'

import styles from './ModalFooter.css'

const modalFooter = (props) => (
  <footer className={styles.ModalFooter}>
    {props.children}
  </footer>
)

export default modalFooter
