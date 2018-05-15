import React from 'react'

import styles from './TileInspector.css'

const tileGraphicMap = {
  Grasslands: '#59a928',
  Ocean: '#4486dc'
}

const tileInspector = props => {
  let queriedTile = null
  if (props.queriedTile) {
    const terrainName = props.queriedTile.terrainName
    queriedTile = (
      <div className={[styles.TileInfo, styles.TileInfoQuery].join(' ')}>
        <div className={styles.Tile} style={{ backgroundColor: tileGraphicMap[terrainName] }}></div>
        <span className={styles.TerrainName}>{terrainName}</span>
      </div>
    )
  }

  return (
    <div className={styles.TileInspector}>
      <div className={[styles.TileInfo, styles.TileInfoCurrent].join(' ')}>
        <div className={styles.Tile}></div>
        <div className={styles.TileStats}>
          <span className={styles.TerrainName}>Grasslands</span>
          <span className={styles.TerrainDescription}>Open land full of fertile grass.</span>
        </div>
      </div>
      {queriedTile}
    </div>
  )
}

export default tileInspector
