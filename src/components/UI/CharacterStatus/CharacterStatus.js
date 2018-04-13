import React from 'react'

import VAM from './VAM/VAM'
import LevelExp from './LevelExp/LevelExp'

import styles from './CharacterStatus.css'

const characterStatus = props => (
  <div className={styles.CharacterStatus}>
    <div className={styles.Avatar} />
    <div className={styles.NameVitals}>
      <div className={styles.NameEnergy}>
        <span className={styles.Name}>{props.character.name}</span>
        <span className={styles.Energy}>E: 10 / 10</span>      
      </div>
      <VAM vam={props.character.vam} />    
    </div>
    <LevelExp level={props.character.level} exp={props.character.exp} expMax={props.character.expMax} />
  </div>
)

export default characterStatus
