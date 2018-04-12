import React from 'react'

import styles from './Sidebar.css'

const sidebar = props => (
  <div className={styles.Sidebar}>
    {props.children}
  </div>
)

export default sidebar
