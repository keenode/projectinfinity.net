import React from 'react'

import styles from './TileInspector.css'

const tileTypeData = {
  Grasslands: {
    color: '#59a928',
    info: 'Open land full of fertile grass.'
  },
  Ocean: {
    color: '#4486dc',
    info: 'Treading murky waters...'
  }
}

const tileInspector = props => {
  let queriedTile = null
  if (props.queriedTile) {
    const terrainName = props.queriedTile.terrainName
    queriedTile = (
      <div className={[styles.TileInfo, styles.TileInfoQuery].join(' ')}>
        <div className={styles.Tile} style={{ backgroundColor: tileTypeData[terrainName].color }}></div>
        <div>
          <span className={styles.TerrainName}>{terrainName}</span>
          <span className={styles.Coords}>{props.queriedTile.location.xCoord}, {props.queriedTile.location.yCoord}</span>
        </div>
      </div>
    )
  }

  const terrainName = props.playerTile.terrainName
  return (
    <div className={styles.TileInspector}>
      <div className={[styles.TileInfo, styles.TileInfoCurrent].join(' ')}>
        <div className={styles.Tile} style={{ backgroundColor: tileTypeData[terrainName].color }}>
          <span>{props.playerTile.location.xCoord}, {props.playerTile.location.yCoord}</span>
        </div>
        <div className={styles.TileStats}>
          <span className={styles.TerrainName}>{terrainName}</span>
          <span className={styles.TerrainDescription}>{tileTypeData[terrainName].info}</span>
        </div>
      </div>
      {queriedTile}
    </div>
  )
}

export default tileInspector
