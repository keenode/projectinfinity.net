import React from 'react'

import styles from './ExamineSidebar.css'

const examineSidebar = props => (
  <div className={styles.ExamineSidebar}>
    {props.children}
  </div>
)

export default examineSidebar
