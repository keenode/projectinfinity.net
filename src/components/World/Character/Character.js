import * as PIXI from 'pixi.js'

class Character {
  // TODO: refactor so this setting is in its own config
  TILE_SIZE = 80

  constructor(x, y) {
    console.log('[World/Character] constructed')
    this.xCoord = x
    this.yCoord = y
    this.xPos = x * this.TILE_SIZE
    this.yPos = y * this.TILE_SIZE
  }

  draw() {
    const rect = new PIXI.Graphics()
    rect.beginFill(0xff0000)
    rect.lineStyle(1, 0x333333, 0.15)
    rect.drawRect(this.xPos, this.yPos, this.TILE_SIZE, this.TILE_SIZE)
    rect.endFill()
    return rect
  }
}

export default Character
