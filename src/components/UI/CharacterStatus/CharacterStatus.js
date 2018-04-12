import React from 'react'

import styles from './CharacterStatus.css'

const characterStatus = (props) => (
  <div className={styles.CharacterStatus}>
    <div className={styles.Avatar} />
    <span className={styles.PlayerName}>{props.character.name}</span>
    <span><b>Lvl:</b> {props.character.level}</span>
    <span><b>Lvl Exp:</b> {props.character.exp} / {props.character.expMax}</span>
    <span><b>Energy:</b> 10 / 10</span>
    <span><b>Vitality:</b> {props.character.vam.vitality} / {props.character.vam.vitalityMax}</span>
    <span><b>Action:</b> {props.character.vam.action} / {props.character.vam.actionMax}</span>
    <span><b>Mind:</b> {props.character.vam.mind} / {props.character.vam.mindMax}</span>
  </div>
)

export default characterStatus
