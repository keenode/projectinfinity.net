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
    this.PIXIContainer.addChild(this.drawUIText())
    this.PIXIContainer.interactive = true
  }

  draw() {
    const rect = new PIXI.Graphics()
    rect.beginFill(0x0000ff, 0.15)
    rect.lineStyle(1, 0xffffff, 0.75)
    rect.drawRect(this.xPos - this.TILE_SIZE, this.yPos - this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE)
    rect.drawRect(this.xPos, this.yPos - this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE)
    rect.drawRect(this.xPos + this.TILE_SIZE, this.yPos - this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE)
    rect.drawRect(this.xPos - this.TILE_SIZE, this.yPos, this.TILE_SIZE, this.TILE_SIZE)
    rect.drawRect(this.xPos + this.TILE_SIZE, this.yPos, this.TILE_SIZE, this.TILE_SIZE)
    rect.drawRect(this.xPos - this.TILE_SIZE, this.yPos + this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE)
    rect.drawRect(this.xPos, this.yPos + this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE)
    rect.drawRect(this.xPos + this.TILE_SIZE, this.yPos + this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE)
    rect.endFill()
    return rect
  }

  drawUIText() {
    const uiTextContainer = new PIXI.Container()
    const centerXMod = this.TILE_SIZE * 0.37
    const centerYMod = this.TILE_SIZE * 0.25
    const uiTextPositions = [
      { label: '7', x: this.xPos + centerXMod - this.TILE_SIZE, y: this.yPos + centerYMod - this.TILE_SIZE },
      { label: '8', x: this.xPos + centerXMod, y: this.yPos + centerYMod - this.TILE_SIZE },
      { label: '9', x: this.xPos + centerXMod + this.TILE_SIZE, y: this.yPos + centerYMod - this.TILE_SIZE },
      { label: '4', x: this.xPos + centerXMod - this.TILE_SIZE, y: this.yPos + centerYMod },
      { label: '6', x: this.xPos + centerXMod + this.TILE_SIZE, y: this.yPos + centerYMod },
      { label: '1', x: this.xPos + centerXMod - this.TILE_SIZE, y: this.yPos + centerYMod + this.TILE_SIZE },
      { label: '2', x: this.xPos + centerXMod, y: this.yPos + centerYMod + this.TILE_SIZE },
      { label: '3', x: this.xPos + centerXMod + this.TILE_SIZE, y: this.yPos + centerYMod + this.TILE_SIZE }
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
