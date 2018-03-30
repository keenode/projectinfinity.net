import React from 'react'

import styles from './PlayerStatus.css'

const playerStatus = () => (
  <div className={styles.PlayerStatus}>
    <div className={styles.Avatar} />
    <hr />
    <span className={styles.PlayerName}>Keenan Staffieri</span>
    <hr />
    <span><b>Lvl:</b> 1</span>
    <span><b>Lvl Exp:</b> 0 / 1000</span>
    <hr />
    <span><b>Vitality:</b> 100 / 100</span>
    <span><b>Action:</b> 100 / 100</span>
    <span><b>Mind:</b> 100 / 100</span>
  </div>
)

export default playerStatus
