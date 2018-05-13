import * as PIXI from 'pixi.js'
import mapSettings from '../Map/map-settings'

import MoveChoiceUI from '../Character/MoveChoiceUI'

class Character {
  PIXIContainer = new PIXI.Container()

  constructor(config) {
    console.log('[Character] constructed')
    config = config || {}
    this.PIXIContainer.interactive = true
    this.PIXIContainer.addChild(this.draw())
    if (config.name) {
      this.setName(config.name)
    }
    if (config.position) {
      this.setPosition(config.position.x, config.position.y)
    }
    if (config.isPlayer) {
      this.moveChoiceUI = new MoveChoiceUI()
      this.addEvents()
    }
  }

  addEvents() {
    document.addEventListener('keypress', this.handleKeyPress.bind(this), false)

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
          // case 'Up Left':
          //   this.triggerMoveEvent(-1, -1)
          //   break
          case 'Up':
            this.triggerMoveEvent(0, -1)
            break
          // case 'Up Right':
          //   this.triggerMoveEvent(1, -1)
          //   break
          case 'Left':
            this.triggerMoveEvent(-1, 0)
            break
          case 'Down':
            this.triggerMoveEvent(0, 1)
            break
          case 'Right':
            this.triggerMoveEvent(1, 0)
            break
          // case 'Down Left':
          //   this.triggerMoveEvent(-1, 1)
          //   break
          // case 'Down Right':
          //   this.triggerMoveEvent(1, 1)
          //   break
          default:
            console.log('Not a valid movement direction.')
        }
      })
    }
  }

  handleKeyPress(e) {
    if (e.which === 119) {
      this.triggerMoveEvent(0, -1)
    } else if (e.which === 97) {
      this.triggerMoveEvent(-1, 0)
    } else if (e.which === 115) {
      this.triggerMoveEvent(0, 1)
    } else if (e.which === 100) {
      this.triggerMoveEvent(1, 0)
    }
  }

  triggerMoveEvent(changeX, changeY) {
    const moveEvent = new CustomEvent('CHARACTER_MOVED', { detail: { changeX, changeY } })
    document.dispatchEvent(moveEvent)
  }

  setName(name) {
    this.name = name
    this.PIXIContainer.addChild(this.drawName())
  }

  setPosition(x, y) {
    this.PIXIContainer.x = x * mapSettings.tileSize
    this.PIXIContainer.y = y * mapSettings.tileSize
  }

  drawName() {
    const style = new PIXI.TextStyle({
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: 14,
      fill: 'white',
      stroke: '#061639',
      strokeThickness: 1
    })
    const nameText = new PIXI.Text(this.name, style)
    nameText.x = mapSettings.tileSize * 0.1
    nameText.y = mapSettings.tileSize * 0.1
    return nameText
  }

  draw() {
    const rect = new PIXI.Graphics()
    rect.beginFill(0x0000aa)
    rect.lineStyle(1, 0x333333, 0.15)
    rect.drawRect(0, 0, mapSettings.tileSize, mapSettings.tileSize)
    rect.endFill()
    return rect
  }
}

export default Character
