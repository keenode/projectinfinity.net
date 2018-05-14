import React from 'react'

import styles from './TileInfo.css'

const tileInfo = props => (
  <div className={styles.TileInfo}>
    <div className={[styles.TileColumn, styles.TileCurrent].join(' ')}>
      <div className={styles.Tile}></div>
      <span className={styles.TerrainName}>Grasslands</span>
    </div>
    <div className={[styles.TileColumn, styles.TileQuery].join(' ')}>
      <div className={styles.Tile}></div>
      <span className={styles.TerrainName}>Grasslands</span>
    </div>
  </div>
)

export default tileInfo
