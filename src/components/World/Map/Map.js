import React, { Component } from 'react'
import * as PIXI from 'pixi.js'

import styles from './Map.css'

class Map extends Component {
  componentDidMount () {
    console.log('[Map] Did Mount')
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      // antialias: true
    })
    app.renderer.backgroundColor = 0x061639
    // app.renderer.autoResize = true
    // app.renderer.resize(window.innerWidth, window.innerHeight)
    document.getElementById('world').appendChild(app.view)
  }

  render () {
    return (
      <div id="world" className={styles.Map}></div>
    )
  }
}

export default Map
