import React, { Component } from 'react'
import { connect } from 'react-redux'

import Map from '../../components/World/Map/Map'
import Button from '../../components/UI/Button/Button'
import PlayerStatus from '../../components/UI/PlayerStatus/PlayerStatus'
import Chat from '../../components/UI/Chat/Chat'
import Modal from '../../components/UI/Modal/Modal'

import CharacterSelect from './CharacterSelect/CharacterSelect'

import * as actions from '../../store/actions'

import styles from './Play.css'

class Play extends Component {
  state = {
    mode: 'CharacterSelect'
  }

  componentDidMount () {
    this.props.onInitChatMessages()
  }
  
  render () {
    return (
      <div id="game-container" className={styles.GameContainer}>
        <Map />
        <PlayerStatus vam={this.props.vam} />
        <Chat messages={this.props.chat.messages} />
        <div className={styles.TestActions}>
          <Button clicked={() => { this.props.onUpdateVitality(5) }}>+5 Vitality</Button>
          <Button clicked={() => { this.props.onUpdateVitality(-5) }}>-5 Vitality</Button><br />
          <Button clicked={() => { this.props.onUpdateAction(5) }}>+5 Action</Button>
          <Button clicked={() => { this.props.onUpdateAction(-5) }}>-5 Action</Button><br />
          <Button clicked={() => { this.props.onUpdateMind(5) }}>+5 Mind</Button>
          <Button clicked={() => { this.props.onUpdateMind(-5) }}>-5 Mind</Button><br />
        </div>
        <Modal show={this.state.mode === 'CharacterSelect'}>
          <CharacterSelect />
        </Modal>
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
    },
    chat: {
      messages: state.chat.messages
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateVitality: (changeAmt) => dispatch(actions.updateVitality(changeAmt)),
    onUpdateAction: (changeAmt) => dispatch(actions.updateAction(changeAmt)),
    onUpdateMind: (changeAmt) => dispatch(actions.updateMind(changeAmt)),
    onInitChatMessages: () => dispatch(actions.initMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
