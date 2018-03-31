import * as PIXI from 'pixi.js'

import Tile from './Tile/Tile'

class MapRenderer {
  tiles = new PIXI.Container()

  constructor (mapSelectorId, tileData) {
    console.log('[MapRenderer] constructed')
    this.map = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      // antialias: true
    })
    this.map.renderer.backgroundColor = 0x061639
    // app.renderer.autoResize = true
    // app.renderer.resize(window.innerWidth, window.innerHeight)
    document.getElementById(mapSelectorId).appendChild(this.map.view)

    this.generate(tileData)

    this.map.ticker.add(delta => this.gameLoop(delta))
  }

  generate (tileData) {
    for (let y = 0; y < tileData.length; y++) {
      for (let x = 0; x < tileData[y].length; x++) {
        this.tiles.addChild(new Tile(x, y, tileData[y][x]).draw())
      }
    }
    this.map.stage.addChild(this.tiles)
    this.tiles.x = 300
    this.tiles.y = 100
    console.log('generated tiles: ', this.tiles)
  }

  gameLoop (delta) {
    // console.log(delta)
  }

  render () {
    // for (let y = 0; y < this.tiles.length; y++) {
    //   for (let x = 0; x < this.tiles[y].length; x++) {
    //     this.tiles[y][x].draw()
    //   }
    // }
  }
}

export default MapRenderer
