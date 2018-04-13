import React, { Component } from 'react'
import { connect } from 'react-redux'

import Map from '../../components/World/Map/Map'

import * as actions from '../../store/actions'

import styles from './GameMaster.css'

class GameMaster extends Component {
  componentDidMount () {
    this.props.onLoadWorld()
  }

  render() {
    const map = this.props.world.tiles.length > 0 ? <Map mode="GameMaster" tilesData={this.props.world.tiles} /> : null
    return (
      <div id="game-container" className={styles.GameContainer}>
        {map}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    world: {
      tiles: state.world.tiles
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadWorld: () => dispatch(actions.getWorld())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMaster)
