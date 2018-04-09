import React from 'react'

import styles from './CharacterStatus.css'

const characterStatus = (props) => (
  <div className={styles.CharacterStatus}>
    <div className={styles.Avatar} />
    <hr />
    <span className={styles.PlayerName}>Keenan Staffieri</span>
    <hr />
    <span><b>Lvl:</b> 1</span>
    <span><b>Lvl Exp:</b> 0 / 1000</span>
    <hr />
    <span><b>Vitality:</b> {props.vam.vitality} / {props.vam.maxVitality}</span>
    <span><b>Action:</b> {props.vam.action} / {props.vam.maxAction}</span>
    <span><b>Mind:</b> {props.vam.mind} / {props.vam.maxMind}</span>
  </div>
)

export default characterStatus
