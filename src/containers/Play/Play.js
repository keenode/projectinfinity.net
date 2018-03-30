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
          V: {this.props.vitality}
          <Button clicked={this.props.onAddVitality}>+5 Vitality</Button>
          <Button clicked={this.props.onSubVitality}>-5 Vitality</Button>
          <PlayerStatus />
          <h1>Play</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    vitality: state.vitality
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddVitality: () => dispatch({ type: actionTypes.ADD_VITALITY, value: 5 }),
    onSubVitality: () => dispatch({ type: actionTypes.SUB_VITALITY, value: 5 })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
