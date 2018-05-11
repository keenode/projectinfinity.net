import * as PIXI from 'pixi.js'

import MoveChoiceUI from '../Character/MoveChoiceUI'

class Character {
  // TODO: refactor so this setting is in its own config
  TILE_SIZE = 80
  PIXIContainer = new PIXI.Container()
  moveChoiceUI = null

  constructor(x, y) {
    console.log('[Character] constructed')
    this.xCoord = x
    this.yCoord = y
    this.xPos = x * this.TILE_SIZE
    this.yPos = y * this.TILE_SIZE
    this.PIXIContainer.interactive = true
    this.PIXIContainer.addChild(this.draw())

    this.moveChoiceUI = new MoveChoiceUI(this.xPos, this.yPos)
    this.addEvents()
  }

  addEvents() {
    this.PIXIContainer.on('click', event => {
      this.moveChoiceUI.toggle()
      if (this.moveChoiceUI.isActive) {
        this.PIXIContainer.addChild(this.moveChoiceUI.PIXIContainer)
      } else {
        this.PIXIContainer.removeChild(this.moveChoiceUI.PIXIContainer)
      }
    })

    for (let i = 0; i < this.moveChoiceUI.PIXIContainerTiles.children.length; i++) {
      const moveChoiceGfx = this.moveChoiceUI.PIXIContainerTiles.getChildAt(i)
      moveChoiceGfx.on('click', event => {
        console.log('MOVE: ' + this.moveChoiceUI.getTileLabel(i))
        this.move(1, 1);
      })
    }
  }

  move(xMov, yMov) {
    this.PIXIContainer.x = (this.xCoord + xMov) * this.TILE_SIZE
    this.PIXIContainer.y = (this.yCoord + yMov) * this.TILE_SIZE
    console.log(this.PIXIContainer.x)
    console.log(this.PIXIContainer.y)
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
