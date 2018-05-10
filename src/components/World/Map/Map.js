import React, { Component } from 'react'
import * as PIXI from 'pixi.js'

import Camera from '../Camera/Camera';
import Tile from './Tile/Tile'
import Character from '../Character/Character'
import MoveChoiceUI from '../Character/MoveChoiceUI'

import styles from './Map.css'

class Map extends Component {
  camera = new Camera()
  map = new PIXI.Container()
  tiles = new PIXI.Container()
  coords = new PIXI.Container()
  character = null
  moveChoiceUI = null

  componentDidMount() {
    console.log('[Map] Did Mount')
    console.log('tiles: ', this.props.tilesData)
    setTimeout(() => {
      this.setupPIXI('canvas-world')
      this.prepareTiles()
      this.placeCharacter()
      this.addEvents()
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

    // Add FPS counter
    const style = new PIXI.TextStyle({
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: 20,
      fill: 'yellow'
    })
    this.fpsText = new PIXI.Text('', style)
    this.fpsText.x = 15
    this.fpsText.y = 140
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
    this.mapApp.stage.addChild(this.fpsText)    
    this.camera.assignScene(this.map)
    console.log('generated tiles: ', this.tiles)
  }

  placeCharacter() {
    this.character = new Character(this.props.characterData.coords.x, this.props.characterData.coords.y)
    this.map.addChild(this.character.PIXIContainer)
    this.moveChoiceUI = new MoveChoiceUI(this.character)
  }

  addEvents() {
    this.character.PIXIContainer.on('click', event => {
      this.moveChoiceUI.toggle()
      if (this.moveChoiceUI.isActive) {
        this.map.addChild(this.moveChoiceUI.PIXIContainer)
      } else {
        this.map.removeChild(this.moveChoiceUI.PIXIContainer)
      }
    })
  }

  gameLoop(delta) {
    this.camera.update(delta)
    this.fpsText.text = Math.round(this.mapApp.ticker.FPS) + ' FPS'
  }

  render() {
    return (
      <div id="canvas-world" className={[styles.Map, 'fade-in'].join(' ')}></div>
    )
  }
}

export default Map
