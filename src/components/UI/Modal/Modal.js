import React from 'react'

import styles from './Modal.css'

const modal = (props) => (
  <div className={styles.Modal} style={{ display: props.show ? 'block' : 'none' }}>
    {props.children}
  </div>
)

export default modal
