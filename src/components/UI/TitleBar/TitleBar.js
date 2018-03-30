import React from 'react'

import styles from './TitleBar.css';

const titleBar = (props) => (
  <div className={styles.TitleBar}>
    <span>{props.title}</span>
  </div>
)

export default titleBar
