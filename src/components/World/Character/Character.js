import * as PIXI from 'pixi.js'

import MoveChoiceUI from '../Character/MoveChoiceUI'

class Character {
  // TODO: refactor so this setting is in its own config
  TILE_SIZE = 80
  PIXIContainer = new PIXI.Container()
  moveChoiceUI = null

  constructor(x, y) {
    console.log('[Character] constructed')
    // this.xCoord = x
    // this.yCoord = y
    this.PIXIContainer.x = x * this.TILE_SIZE
    this.PIXIContainer.y = y * this.TILE_SIZE
    this.PIXIContainer.interactive = true
    this.PIXIContainer.addChild(this.draw())

    this.moveChoiceUI = new MoveChoiceUI()
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
        const moveDir = this.moveChoiceUI.getTileLabel(i)
        console.log('MOVE: ' + moveDir)
        switch (moveDir) {
          case 'Up Left':
            this.move(-1, -1)
            break
          case 'Up':
            this.move(0, -1)
            break
          case 'Up Right':
            this.move(1, -1)
            break
          case 'Left':
            this.move(-1, 0)
            break;
          case 'Right':
            this.move(1, 0)
            break
          case 'Down Left':
            this.move(-1, 1)
            break
          case 'Down':
            this.move(0, 1)
            break
          case 'Down Right':
            this.move(1, 1)
            break
          default:
            console.log('Not a valid movement direction.')
        }
      })
    }
  }

  move(xMov, yMov) {
    this.PIXIContainer.x += xMov * this.TILE_SIZE
    this.PIXIContainer.y += yMov * this.TILE_SIZE
    const moveEvent = new CustomEvent('CHARACTER_MOVED', { detail: { x: xMov, y: yMov } })
    document.dispatchEvent(moveEvent)
  }

  draw() {
    const rect = new PIXI.Graphics()
    rect.beginFill(0xff0000)
    rect.lineStyle(1, 0x333333, 0.15)
    rect.drawRect(0, 0, this.TILE_SIZE, this.TILE_SIZE)
    rect.endFill()
    return rect
  }
}

export default Character
