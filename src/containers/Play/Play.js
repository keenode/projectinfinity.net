import React, { Component } from 'react'
import { connect } from 'react-redux'

import Map from '../../components/World/Map/Map'
import Button from '../../components/UI/Button/Button'
import CharacterStatus from '../../components/UI/CharacterStatus/CharacterStatus'
import Chat from '../../components/UI/Chat/Chat'
import Modal from '../../components/UI/Modal/Modal'

import CharacterSelect from './CharacterSelect/CharacterSelect'
import CharacterCreate from './CharacterCreate/CharacterCreate'

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
        <CharacterStatus name={this.props.name} vam={this.props.vam} />
        <Chat messages={this.props.chat.messages} />
        <div className={styles.TestActions}>
          <Button clicked={() => { this.props.onUpdateVitality(5) }}>+5 Vitality</Button>
          <Button clicked={() => { this.props.onUpdateVitality(-5) }}>-5 Vitality</Button><br />
          <Button clicked={() => { this.props.onUpdateAction(5) }}>+5 Action</Button>
          <Button clicked={() => { this.props.onUpdateAction(-5) }}>-5 Action</Button><br />
          <Button clicked={() => { this.props.onUpdateMind(5) }}>+5 Mind</Button>
          <Button clicked={() => { this.props.onUpdateMind(-5) }}>-5 Mind</Button><br />
        </div>
        <Modal show={this.props.playMode === 'CharacterSelect'}>
          <CharacterSelect />
        </Modal>
        <Modal show={this.props.playMode === 'CharacterCreate'}>
          <CharacterCreate />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.character.name,
    vam: {
      vitality: state.character.vam.vitality,
      maxVitality: state.character.vam.maxVitality,
      action: state.character.vam.action,
      maxAction: state.character.vam.maxAction,
      mind: state.character.vam.mind,
      maxMind: state.character.vam.maxMind
    },
    chat: {
      messages: state.chat.messages
    },
    playMode: state.play.mode
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
