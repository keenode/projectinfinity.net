import * as PIXI from 'pixi.js'
import mapSettings from '../Map/map-settings'

class MoveChoiceUI {
  isActive = false
  PIXIContainerTiles =  new PIXI.Container()
  PIXIContainer = new PIXI.Container()

  constructor() {
    console.log('[MoveChoiceUI] constructed')
    this.tiles = [
      // {
      //   label: 'Up Left',
      //   graphics: this.drawTile(-mapSettings.tileSize, -mapSettings.tileSize)
      // },
      {
        label: 'Up',
        graphics: this.drawTile(0, -mapSettings.tileSize)
      },
      // {
      //   label: 'Up Right',
      //   graphics: this.drawTile(mapSettings.tileSize, -mapSettings.tileSize)
      // },
      {
        label: 'Left',
        graphics: this.drawTile(-mapSettings.tileSize, 0)
      },
      {
        label: 'Right',
        graphics: this.drawTile(mapSettings.tileSize, 0)
      },
      // {
      //   label: 'Down Left',
      //   graphics: this.drawTile(-mapSettings.tileSize, mapSettings.tileSize)
      // },
      {
        label: 'Down',
        graphics: this.drawTile(0, mapSettings.tileSize)
      },
      // {
      //   label: 'Down Right',
      //   graphics: this.drawTile(mapSettings.tileSize, mapSettings.tileSize)
      // }
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
    rect.drawRect(xPos, yPos, mapSettings.tileSize, mapSettings.tileSize)
    rect.endFill()
    return rect
  }

  drawUIText() {
    const uiTextContainer = new PIXI.Container()
    const centerXMod = mapSettings.tileSize * 0.37
    const centerYMod = mapSettings.tileSize * 0.25
    const uiTextPositions = [
      // { label: '7', x: centerXMod - mapSettings.tileSize, y: centerYMod - mapSettings.tileSize },
      { label: 'W', x: centerXMod - 6, y: centerYMod - mapSettings.tileSize },
      // { label: '9', x: centerXMod + mapSettings.tileSize, y: centerYMod - mapSettings.tileSize },
      { label: 'A', x: centerXMod - mapSettings.tileSize, y: centerYMod },
      { label: 'D', x: centerXMod + mapSettings.tileSize - 4, y: centerYMod },
      // { label: '1', x: centerXMod - mapSettings.tileSize, y: centerYMod + mapSettings.tileSize },
      { label: 'S', x: centerXMod + 1, y: centerYMod + mapSettings.tileSize },
      // { label: '3', x: centerXMod + mapSettings.tileSize, y: centerYMod + mapSettings.tileSize }
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
      uiText.alpha = 0.75
      uiTextContainer.addChild(uiText)
    }
    return uiTextContainer
  }
}

export default MoveChoiceUI
