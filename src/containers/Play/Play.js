import React, { Component } from 'react'
import { connect } from 'react-redux'

import Map from '../../components/World/Map/Map'
import Button from '../../components/UI/Button/Button'
import CharacterStatus from '../../components/UI/CharacterStatus/CharacterStatus'
import HotToolbar from '../../components/UI/HotToolbar/HotToolbar'
import Sidebar from '../../components/UI/Sidebar/Sidebar'
import ExamineOptions from '../../components/UI/Sidebar/ExamineOptions/ExamineOptions'
import TileInfo from '../../components/UI/Sidebar/ExamineOptions/TileInfo/TileInfo'
import InteractionPane from '../../components/UI/Sidebar/ExamineOptions/InteractionPane/InteractionPane'
import WorldInfo from '../../components/UI/Sidebar/WorldInfo/WorldInfo'
import MenuBox from '../../components/UI/MenuBox/MenuBox'
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
    this.props.onLoadWorld()
    this.props.onInitChatMessages()
  }
  
  render () {
    return (
      <div id="game-container" className={styles.GameContainer}>
        <Map tiles={this.props.world.tiles} />
        <CharacterStatus character={this.props.character} />
        <HotToolbar />
        <Sidebar>
          <WorldInfo />
          <ExamineOptions>
            <TileInfo />
            <InteractionPane />
          </ExamineOptions>
        </Sidebar>
        <Chat messages={this.props.chat.messages} />
        <MenuBox />
        <div className={styles.TestActions}>
          <Button btnType="Danger" clicked={() => { this.props.onUpdateVitality(-5) }}>-5 Vitality</Button>
          <Button clicked={() => { this.props.onUpdateVitality(5) }}>+5 Vitality</Button><br />
          <Button btnType="Danger" clicked={() => { this.props.onUpdateAction(-5) }}>-5 Action</Button>
          <Button clicked={() => { this.props.onUpdateAction(5) }}>+5 Action</Button><br />
          <Button btnType="Danger" clicked={() => { this.props.onUpdateMind(-5) }}>-5 Mind</Button>
          <Button clicked={() => { this.props.onUpdateMind(5) }}>+5 Mind</Button>
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
    character: {
      name: state.character.name,
      level: state.character.level,
      exp: state.character.exp,
      expMax: state.character.expMax,
      vam: {
        vitality: state.character.vam.vitality,
        vitalityMax: state.character.vam.vitalityMax,
        action: state.character.vam.action,
        actionMax: state.character.vam.actionMax,
        mind: state.character.vam.mind,
        mindMax: state.character.vam.mindMax
      }
    },
    world: {
      tiles: state.world.tiles
    },
    chat: {
      messages: state.chat.messages
    },
    playMode: state.play.mode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateVitality: changeAmt => dispatch(actions.updateVitality(changeAmt)),
    onUpdateAction: changeAmt => dispatch(actions.updateAction(changeAmt)),
    onUpdateMind: changeAmt => dispatch(actions.updateMind(changeAmt)),
    onLoadWorld: () => dispatch(actions.getWorld()),
    onInitChatMessages: () => dispatch(actions.initMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
