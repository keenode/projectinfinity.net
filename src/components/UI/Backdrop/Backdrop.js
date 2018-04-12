import React from 'react'

import styles from './Backdrop.css'

const backdrop = (props) => (
  <div className={styles.Backdrop} style={{ display: props.show ? 'block' : 'none' }}>
    {props.children}
  </div>
)

export default backdrop
