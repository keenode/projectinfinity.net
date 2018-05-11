import * as PIXI from 'pixi.js'

class MoveChoiceUI {
  // TODO: refactor so this setting is in its own config
  TILE_SIZE = 80
  isActive = false
  PIXIContainerTiles =  new PIXI.Container()
  PIXIContainer = new PIXI.Container()

  constructor() {
    console.log('[MoveChoiceUI] constructed')
    this.tiles = [
      {
        label: 'Up Left',
        graphics: this.drawTile(-this.TILE_SIZE, -this.TILE_SIZE)
      },
      {
        label: 'Up',
        graphics: this.drawTile(0, -this.TILE_SIZE)
      },
      {
        label: 'Up Right',
        graphics: this.drawTile(this.TILE_SIZE, -this.TILE_SIZE)
      },
      {
        label: 'Left',
        graphics: this.drawTile(-this.TILE_SIZE, 0)
      },
      {
        label: 'Right',
        graphics: this.drawTile(this.TILE_SIZE, 0)
      },
      {
        label: 'Down Left',
        graphics: this.drawTile(-this.TILE_SIZE, this.TILE_SIZE)
      },
      {
        label: 'Down',
        graphics: this.drawTile(0, this.TILE_SIZE)
      },
      {
        label: 'Down Right',
        graphics: this.drawTile(this.TILE_SIZE, this.TILE_SIZE)
      }
    ]
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].graphics.interactive = true
      this.PIXIContainerTiles.addChild(this.tiles[i].graphics)
    }
    this.PIXIContainer.addChild(this.PIXIContainerTiles)
    this.PIXIContainer.addChild(this.drawUIText())
  }

  toggle() {
    this.isActive = !this.isActive
  }

  getTileLabel(index) {
    return this.tiles[index].label
  }

  drawTile(xPos, yPos) {
    const rect = new PIXI.Graphics()
    rect.beginFill(0x0000ff, 0.15)
    rect.lineStyle(1, 0xffffff, 0.75)
    rect.drawRect(xPos, yPos, this.TILE_SIZE, this.TILE_SIZE)
    rect.endFill()
    return rect
  }

  drawUIText() {
    const uiTextContainer = new PIXI.Container()
    const centerXMod = this.TILE_SIZE * 0.37
    const centerYMod = this.TILE_SIZE * 0.25
    const uiTextPositions = [
      { label: '7', x: centerXMod - this.TILE_SIZE, y: centerYMod - this.TILE_SIZE },
      { label: '8', x: centerXMod, y: centerYMod - this.TILE_SIZE },
      { label: '9', x: centerXMod + this.TILE_SIZE, y: centerYMod - this.TILE_SIZE },
      { label: '4', x: centerXMod - this.TILE_SIZE, y: centerYMod },
      { label: '6', x: centerXMod + this.TILE_SIZE, y: centerYMod },
      { label: '1', x: centerXMod - this.TILE_SIZE, y: centerYMod + this.TILE_SIZE },
      { label: '2', x: centerXMod, y: centerYMod + this.TILE_SIZE },
      { label: '3', x: centerXMod + this.TILE_SIZE, y: centerYMod + this.TILE_SIZE }
    ]
    const style = new PIXI.TextStyle({
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: 36,
      fill: 'white',
      stroke: '#061639',
      strokeThickness: 1
    })
    for (let i = 0; i < uiTextPositions.length; i++) {
      const uiText = new PIXI.Text(uiTextPositions[i].label, style)
      uiText.x = uiTextPositions[i].x
      uiText.y = uiTextPositions[i].y
      uiTextContainer.addChild(uiText)
    }
    return uiTextContainer
  }
}

export default MoveChoiceUI
