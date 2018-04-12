import React from 'react'

import styles from './TileInfo.css'
import Tile from '../../../World/Map/Tile/Tile';

const tileInfo = props => (
  <div className={styles.TileInfo}>
    <div className={styles.Tile}></div>
    <span>Grasslands</span>
  </div>
)

export default tileInfo
