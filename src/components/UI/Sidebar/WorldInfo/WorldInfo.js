import React from 'react'

import styles from './WorldInfo.css'

const worldInfo = props => (
  <div className={styles.WorldInfo}>
    <div className={styles.WorldInfoInner}>
      <div className={styles.MiniMap}>World Mini-Map</div>
      <div className={styles.DateTimeWeather}>
        <span>Great Basin - Sunny 76&deg;</span>
        <span>13:00 - Monday, 22 July, 2022</span>
      </div>
    </div>
  </div>
)

export default worldInfo
