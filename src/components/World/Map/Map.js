import React, { Component } from 'react'

import MapRenderer from './MapRenderer'

import styles from './Map.css'

class Map extends Component {
  tileData = [
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0]
  ]

  componentDidMount () {
    console.log('[Map] Did Mount')
    const mapRenderer = new MapRenderer('world', this.tileData)
    mapRenderer.render()
  }

  render () {
    return (
      <div id="world" className={styles.Map}></div>
    )
  }
}

export default Map
