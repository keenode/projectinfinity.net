import React, { Component } from 'react'
import * as PIXI from 'pixi.js'

import Camera from '../Camera/Camera'
import Tile from './Tile/Tile'
import Character from '../Character/Character'

import styles from './Map.css'

class Map extends Component {
  camera = new Camera()
  map = new PIXI.Container()
  tiles = new PIXI.Container()
  tilesData = []
  coords = new PIXI.Container()
  playerCharacter = new Character({ isPlayer: true })
  characters = []

  componentDidMount() {
    console.log('[Map] Did Mount')
    console.log('tiles: ', this.props.tilesData)
    setTimeout(() => {
      this.setupPIXI('canvas-world')
      this.prepareTiles()
      if (this.props.mode === 'Playing') {
        this.setupCharacters()
      }
      this.mapApp.ticker.add(delta => this.gameLoop(delta))
    }, 200)

    document.addEventListener('TILE_QUERIED', e => {
      console.log('[Map] TILE_QUERIED: ', e.detail)
      this.unqueryTiles()
    }, false)

    document.addEventListener('CHARACTER_CLICKED', e => {
      console.log('[Map] CHARACTER_CLICKED: ', e.detail)
      this.unqueryTiles()
    }, false)
  }

  componentDidUpdate() {
    if (this.props.mode === 'Playing') {
      this.playerCharacter.setPosition(this.props.playerCharacter.position.x, this.props.playerCharacter.position.y)
      for (let i = 0; i < this.characters.length; i++) {
        this.characters[i].setPosition(this.props.characters[i].position.x, this.props.characters[i].position.y)
      }
    }
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
    this.fpsText.y = this.props.mode === 'Playing' ? 140 : 15
  }

  prepareTiles() {
    for (let y = 0; y < this.props.tilesData.length; y++) {
      for (let x = 0; x < this.props.tilesData[y].length; x++) {
        const tile = new Tile(this.props.tilesData[y][x])
        this.tilesData.push(tile)
        this.tiles.addChild(tile.PIXIContainer)
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

  setupCharacters() {
    console.log('world characters: ', this.props.characters)
    // Other characters
    for (let i = 0; i < this.props.characters.length; i++) {
      const character = this.props.characters[i]
      this.characters.push(new Character({
        name: character.name,
        position: character.position
      }))
      this.map.addChild(this.characters[i].PIXIContainer)
    }
    console.log('this.characters: ', this.characters)

    // Player character
    this.playerCharacter.setName(this.props.playerCharacter.name)
    this.playerCharacter.setPosition(this.props.playerCharacter.position.x, this.props.playerCharacter.position.y)
    this.map.addChild(this.playerCharacter.PIXIContainer)
  }

  unqueryTiles() {
    for (let i = 0; i < this.tilesData.length; i++) {
      const tile = this.tilesData[i]
      tile.unquery(false)
    }
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
