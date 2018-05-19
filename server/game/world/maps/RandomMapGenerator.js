const tileDatabase = {
  'Ocean': { gfxId: 0 },
  'Grasslands': { gfxId: 1 }
}

class RandomMapGenerator {
  static determineTileProps() {
    const tileType = Math.random() * 5 < 4 ? 'Grasslands' : 'Ocean'
    return {
      ...tileDatabase[tileType],
      terrainName: tileType
    }
  }

  static generateTiles(mapW, mapH) {
    const tiles = []
    for (let y = 0; y < mapH; y++) {
      const row = []
      for (let x = 0; x < mapW; x++) {
        const terrainProps = this.determineTileProps()
        row.push({
          ...terrainProps,
          location: {
            xCoord: x,
            yCoord: y
          }
        })
      }
      tiles.push(row)
    }
    return tiles
  }
}

module.exports = RandomMapGenerator
