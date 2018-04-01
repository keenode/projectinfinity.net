import React, { Component } from 'react'
import { connect } from 'react-redux'

import Map from '../../components/World/Map/Map'
import Button from '../../components/UI/Button/Button'
import PlayerStatus from '../../components/UI/PlayerStatus/PlayerStatus'
import Chat from '../../components/UI/Chat/Chat'

import * as playerActions from '../../store/actions'

import styles from './Play.css'

class Play extends Component {
  render () {
    return (
        <div id="game-container" className={styles.GameContainer}>
          <Map />
          <PlayerStatus vam={this.props.vam} />
          <Chat />
          <div className={styles.TestActions}>
            <Button clicked={() => { this.props.onUpdateVitality(5) }}>+5 Vitality</Button>
            <Button clicked={() => { this.props.onUpdateVitality(-5) }}>-5 Vitality</Button><br />
            <Button clicked={() => { this.props.onUpdateAction(5) }}>+5 Action</Button>
            <Button clicked={() => { this.props.onUpdateAction(-5) }}>-5 Action</Button><br />
            <Button clicked={() => { this.props.onUpdateMind(5) }}>+5 Mind</Button>
            <Button clicked={() => { this.props.onUpdateMind(-5) }}>-5 Mind</Button><br />
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    vam: {
      vitality: state.player.vam.vitality,
      maxVitality: state.player.vam.maxVitality,
      action: state.player.vam.action,
      maxAction: state.player.vam.maxAction,
      mind: state.player.vam.mind,
      maxMind: state.player.vam.maxMind
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateVitality: (changeAmt) => dispatch(playerActions.updateVitality(changeAmt)),
    onUpdateAction: (changeAmt) => dispatch(playerActions.updateAction(changeAmt)),
    onUpdateMind: (changeAmt) => dispatch(playerActions.updateMind(changeAmt))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
