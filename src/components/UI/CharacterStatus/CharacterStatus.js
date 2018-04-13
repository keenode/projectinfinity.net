import React from 'react'

import VAM from './VAM/VAM'

import styles from './CharacterStatus.css'

const characterStatus = (props) => (
  <div className={styles.CharacterStatus}>
    <div className={styles.Avatar} />
    <span className={styles.PlayerName}>{props.character.name}</span>
    <span><b>Lvl:</b> {props.character.level}</span>
    <span><b>Lvl Exp:</b> {props.character.exp} / {props.character.expMax}</span>
    <span><b>Energy:</b> 10 / 10</span>
    <VAM vam={props.character.vam} />
  </div>
)

export default characterStatus
