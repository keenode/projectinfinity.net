import React, { Component } from 'react'
import * as PIXI from 'pixi.js'

import styles from './Map.css'

class Map extends Component {
  componentDidMount () {
    console.log('[Map] Did Mount')
    const app = new PIXI.Application()
    document.getElementById('world').appendChild(app.view)
  }

  render () {
    return (
      <div id="world" className={styles.Map}></div>
    )
  }
}

export default Map
