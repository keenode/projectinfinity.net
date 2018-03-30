import React from 'react'

import PlayerStatus from '../../components/UI/PlayerStatus/PlayerStatus'

import styles from './Play.css'

const play = () => (
  <div className={styles.PageContainer}>
    <PlayerStatus />
    <h1>Play</h1>
  </div>
)

export default play
