import React from 'react'

import styles from './ExamineOptions.css'

const examineOptions = props => (
  <div className={styles.ExamineOptions}>
    {props.children}
  </div>
)

export default examineOptions
