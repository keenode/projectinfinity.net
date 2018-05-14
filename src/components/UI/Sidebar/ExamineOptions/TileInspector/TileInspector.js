import React from 'react'

import styles from './TileInspector.css'

const tileInspector = props => (
  <div className={styles.TileInspector}>
    <div className={[styles.TileInfo, styles.TileInfoCurrent].join(' ')}>
      <div className={styles.Tile}></div>
      <div className={styles.TileStats}>
        <span className={styles.TerrainName}>Grasslands</span>
        <span className={styles.TerrainDescription}>Open land full of fertile grass.</span>
      </div>
    </div>
    <div className={[styles.TileInfo, styles.TileInfoQuery].join(' ')}>
      <div className={styles.Tile}></div>
      <span className={styles.TerrainName}>Grasslands</span>
    </div>
  </div>
)

export default tileInspector
