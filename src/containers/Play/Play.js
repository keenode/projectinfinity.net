import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../components/UI/Button/Button'
import PlayerStatus from '../../components/UI/PlayerStatus/PlayerStatus'

import * as actionTypes from '../../store/actions'

import styles from './Play.css'

class Play extends Component {
  render () {
    return (
        <div className={styles.PageContainer}>
          V: {this.props.vitality}<br />
          A: {this.props.action}<br />
          M: {this.props.mind}<br />
          <Button clicked={() => { this.props.onUpdateVitality(5) }}>+5 Vitality</Button>
          <Button clicked={() => { this.props.onUpdateVitality(-5) }}>-5 Vitality</Button><br />
          <Button clicked={() => { this.props.onUpdateAction(5) }}>+5 Action</Button>
          <Button clicked={() => { this.props.onUpdateAction(-5) }}>-5 Action</Button><br />
          <Button clicked={() => { this.props.onUpdateMind(5) }}>+5 Mind</Button>
          <Button clicked={() => { this.props.onUpdateMind(-5) }}>-5 Mind</Button><br />
          <PlayerStatus />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    vitality: state.player.vam.vitality,
    action: state.player.vam.action,
    mind: state.player.vam.mind
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
