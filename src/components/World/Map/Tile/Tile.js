import * as PIXI from 'pixi.js'

class Tile {
  TILE_SIZE = 80

  constructor(x, y, data) {
    console.log('[Tile] constructed')
    this.xCoord = x
    this.yCoord = y
    this.xPos = x * this.TILE_SIZE
    this.yPos = y * this.TILE_SIZE
    this.data = data
  }

  drawCoords() {
    const style = new PIXI.TextStyle({
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: 16,
      fill: 'white',
      stroke: '#061639',
      strokeThickness: 1
    })
    const coordsText = new PIXI.Text(this.xCoord + ', ' + this.yCoord, style)
    coordsText.x = this.xPos + this.TILE_SIZE * 0.1
    coordsText.y = this.yPos + this.TILE_SIZE * 0.1
    return coordsText
  }

  draw() {
    const rect = new PIXI.Graphics()
    const tileColor = this.data === 1 ? 0x59a928 : 0x4486dc
    rect.beginFill(tileColor)
    rect.lineStyle(1, 0x333333, 0.15)
    rect.drawRect(this.xPos, this.yPos, this.TILE_SIZE, this.TILE_SIZE)
    rect.endFill()
    return rect
  }
}

export default Tile
