import * as PIXI from 'pixi.js'

class MoveChoiceUI {
  // TODO: refactor so this setting is in its own config
  TILE_SIZE = 80
  PIXIContainer = new PIXI.Container()

  constructor(character) {
    console.log('[MoveChoiceUI] constructed')
    this.xPos = character.xPos
    this.yPos = character.yPos
    this.PIXIContainer.addChild(this.draw())
    this.PIXIContainer.interactive = true
  }

  draw() {
    const rect = new PIXI.Graphics()
    rect.beginFill(0x0000ff)
    rect.lineStyle(1, 0xffffff, 0.75)
    rect.drawRect(this.xPos, this.yPos, this.TILE_SIZE, this.TILE_SIZE)
    rect.endFill()
    rect.alpha = 0.5
    return rect
  }
}

export default MoveChoiceUI
