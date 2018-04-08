import React, { Component } from 'react'
import * as PIXI from 'pixi.js'

// import MapRenderer from './MapRenderer'
import Tile from './Tile/Tile'

import styles from './Map.css'

class Map extends Component {
  tilesData = [
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0]
  ]
  tiles = new PIXI.Container()
  coords = new PIXI.Container()

  componentDidMount() {
    console.log('[Map] Did Mount')
    this.setupPIXI('canvas-world')
    this.prepareTiles()
    this.map.ticker.add(delta => this.gameLoop(delta));
  }

  setupPIXI(mapSelectorId) {
    const $gameContainer = document.getElementById('game-container')
    this.map = new PIXI.Application({
      width: $gameContainer.offsetWidth,
      height: $gameContainer.offsetHeight,
      // antialias: true
    })
    this.map.renderer.backgroundColor = 0x061639
    this.map.renderer.autoResize = true

    document.getElementById(mapSelectorId).appendChild(this.map.view)

    window.onresize = () => {
      this.map.renderer.resize($gameContainer.offsetWidth, $gameContainer.offsetHeight)      
    }
  }

  prepareTiles() {
    for (let y = 0; y < this.tilesData.length; y++) {
      for (let x = 0; x < this.tilesData[y].length; x++) {
        const tile = new Tile(x, y, this.tilesData[y][x])
        this.tiles.addChild(tile.draw())
        if (this.props.mode === 'GameMaster') {
          this.coords.addChild(tile.drawCoords())
        }
      }
    }
    this.map.stage.addChild(this.tiles)
    this.map.stage.addChild(this.coords)
    // temp positioning...
    this.tiles.x = 300
    this.tiles.y = 100
    this.coords.x = 300
    this.coords.y = 100
    console.log('generated tiles: ', this.tiles)
  }

  gameLoop(delta) {
    // console.log(delta)
  }

  render() {
    return (
      <div id="canvas-world" className={styles.Map}></div>
    )
  }
}

export default Map
