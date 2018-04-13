import React, { Component } from 'react'
import * as PIXI from 'pixi.js'

import Camera from '../Camera/Camera';
import Tile from './Tile/Tile'

import styles from './Map.css'

class Map extends Component {
  camera = new Camera()
  map = new PIXI.Container()
  tiles = new PIXI.Container()
  coords = new PIXI.Container()

  componentDidMount() {
    console.log('[Map] Did Mount')
    console.log('tiles: ', this.props.tilesData)
    setTimeout(() => {
      this.setupPIXI('canvas-world')
      this.prepareTiles()
      this.mapApp.ticker.add(delta => this.gameLoop(delta));
    }, 200)
  }

  setupPIXI(mapSelectorId) {
    const $gameContainer = document.getElementById('game-container')
    this.mapApp = new PIXI.Application({
      width: $gameContainer.offsetWidth,
      height: $gameContainer.offsetHeight,
      // antialias: true
    })
    this.mapApp.renderer.backgroundColor = 0x050404
    this.mapApp.renderer.autoResize = true

    document.getElementById(mapSelectorId).appendChild(this.mapApp.view)

    window.onresize = () => {
      this.mapApp.renderer.resize($gameContainer.offsetWidth, $gameContainer.offsetHeight)      
    }
  }

  prepareTiles() {
    for (let y = 0; y < this.props.tilesData.length; y++) {
      for (let x = 0; x < this.props.tilesData[y].length; x++) {
        const tile = new Tile(x, y, this.props.tilesData[y][x])
        this.tiles.addChild(tile.draw())
        if (this.props.mode === 'GameMaster') {
          this.coords.addChild(tile.drawCoords())
        }
      }
    }
    this.map.addChild(this.tiles)
    this.map.addChild(this.coords)
    this.mapApp.stage.addChild(this.map)
    this.camera.assignScene(this.map)
    // temp positioning...
    // this.tiles.x = 300
    // this.tiles.y = 100
    // this.coords.x = 300
    // this.coords.y = 100
    console.log('generated tiles: ', this.tiles)
  }

  gameLoop(delta) {
    // console.log(delta)
  }

  render() {
    return (
      <div id="canvas-world" className={[styles.Map, 'fade-in'].join(' ')}></div>
    )
  }
}

export default Map
