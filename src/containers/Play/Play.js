import React, { Component } from 'react'
import { connect } from 'react-redux'

import Map from '../../components/World/Map/Map'
import Button from '../../components/UI/Button/Button'
import PlayerStatus from '../../components/UI/PlayerStatus/PlayerStatus'

import * as actionTypes from '../../store/actions'

import styles from './Play.css'

class Play extends Component {
  render () {
    return (
        <div className={styles.PageContainer}>
          <Map />
          <PlayerStatus vam={this.props.vam} />
          <Button clicked={() => { this.props.onUpdateVitality(5) }}>+5 Vitality</Button>
          <Button clicked={() => { this.props.onUpdateVitality(-5) }}>-5 Vitality</Button><br />
          <Button clicked={() => { this.props.onUpdateAction(5) }}>+5 Action</Button>
          <Button clicked={() => { this.props.onUpdateAction(-5) }}>-5 Action</Button><br />
          <Button clicked={() => { this.props.onUpdateMind(5) }}>+5 Mind</Button>
          <Button clicked={() => { this.props.onUpdateMind(-5) }}>-5 Mind</Button><br />
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
    onUpdateVitality: (value) => dispatch({ type: actionTypes.UPDATE_VITALITY, value: value }),
    onUpdateAction: (value) => dispatch({ type: actionTypes.UPDATE_ACTION, value: value }),
    onUpdateMind: (value) => dispatch({ type: actionTypes.UPDATE_MIND, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
