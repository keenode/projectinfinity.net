import * as PIXI from 'pixi.js'
import mapSettings from '../map-settings'

class Tile {
  PIXIContainer = new PIXI.Container()
  hoverGrid = new PIXI.Container()
  queriedGrid = new PIXI.Container()
  queried = false

  constructor(data) {
    console.log('[Tile] constructed')
    this.data = data
    this.PIXIContainer.x = this.data.location.xCoord * mapSettings.tileSize
    this.PIXIContainer.y = this.data.location.yCoord * mapSettings.tileSize
    this.PIXIContainer.interactive = true
    this.PIXIContainer.addChild(this.draw())
    this.hoverGrid.addChild(this.drawHoverGrid())
    this.queriedGrid.addChild(this.drawQueriedGrid())
    this.addEvents()
  }

  addEvents() {
    this.PIXIContainer.on('mouseover', event => {
      this.PIXIContainer.addChild(this.hoverGrid)
    })

    this.PIXIContainer.on('mouseout', event => {
      this.PIXIContainer.removeChild(this.hoverGrid)
    })

    this.PIXIContainer.on('click', event => {
      if (this.queried) {
        this.unquery()
      } else {
        this.query()
      }
    })
  }

  query() {
    const tileData = this.data
    const tileQueriedEvent = new CustomEvent('TILE_QUERIED', { detail: tileData })
    document.dispatchEvent(tileQueriedEvent)
    this.PIXIContainer.addChild(this.queriedGrid)
    this.queried = true
  }

  unquery(triggerEvent = true) {
    if (triggerEvent) {
      const tileData = this.data
      const tileUnqueriedEvent = new CustomEvent('TILE_UNQUERIED', { detail: tileData })
      document.dispatchEvent(tileUnqueriedEvent)
    }
    this.PIXIContainer.removeChild(this.queriedGrid)
    this.queried = false
  }

  drawCoords() {
    const style = new PIXI.TextStyle({
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: 16,
      fill: 'white',
      stroke: '#061639',
      strokeThickness: 1
    })
    const coordsText = new PIXI.Text(this.data.location.xCoord + ', ' + this.data.location.yCoord, style)
    coordsText.x = this.PIXIContainer.x + mapSettings.tileSize * 0.1
    coordsText.y = this.PIXIContainer.y + mapSettings.tileSize * 0.1
    return coordsText
  }

  drawHoverGrid() {
    const rect = new PIXI.Graphics()
    rect.beginFill(0x000099)
    rect.drawRect(0, 0, mapSettings.tileSize, mapSettings.tileSize)
    rect.endFill()
    rect.alpha = 0.1
    return rect
  }

  drawQueriedGrid() {
    const rect = new PIXI.Graphics()
    rect.lineStyle(1, 0xFFFFFF, 1)
    rect.drawRect(1, 1, mapSettings.tileSize - 2, mapSettings.tileSize - 2)
    rect.endFill()
    return rect
  }

  draw() {
    const rect = new PIXI.Graphics()
    const tileColor = this.data.gfxId === 1 ? 0x59a928 : 0x4486dc
    rect.beginFill(tileColor)
    rect.lineStyle(1, 0x333333, 0.1)
    rect.drawRect(0, 0, mapSettings.tileSize, mapSettings.tileSize)
    rect.endFill()
    return rect
  }
}

export default Tile
