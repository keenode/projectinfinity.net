import React, { Component } from 'react'

import Map from '../../components/World/Map/Map'

import styles from './GameMaster.css'

class GameMaster extends Component {
  render() {
    return (
      <div id="game-container" className={styles.GameContainer}>
        <Map mode="GameMaster" />
      </div>
    )
  }
}

export default GameMaster
