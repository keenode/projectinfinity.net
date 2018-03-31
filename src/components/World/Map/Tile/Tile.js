import * as PIXI from 'pixi.js'

class Tile {
  TILE_SIZE = 80

  constructor (x, y, data) {
    console.log('[Tile] constructed')
    this.xPos = x * this.TILE_SIZE
    this.yPos = y * this.TILE_SIZE
    this.data = data
  }

  draw () {
    const rect = new PIXI.Graphics()
    const tileColor = this.data === 1 ? 0x009900 : 0x000099
    rect.beginFill(tileColor)
    rect.lineStyle(1, 0x333333, 0.15)
    rect.drawRect(this.xPos, this.yPos, this.TILE_SIZE, this.TILE_SIZE)
    rect.endFill()
    return rect
  }
}

export default Tile
