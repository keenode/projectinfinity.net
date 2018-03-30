import React from 'react'
import { connect } from 'react-redux'

import PlayerStatus from '../../components/UI/PlayerStatus/PlayerStatus'

import styles from './Play.css'

const play = (props) => (
  <div className={styles.PageContainer}>
    V: {props.vitality}
    <PlayerStatus />
    <h1>Play</h1>
  </div>
)

const mapStateToProps = state => {
  return {
    vitality: state.vitality
  }
}

export default connect(mapStateToProps)(play)
