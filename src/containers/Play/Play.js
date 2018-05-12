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

    document.addEventListener('CHARACTER_MOVED', e => {
      console.log('CHARACTER_MOVED: ', e.detail)
      const reqX = this.props.character.position.x + e.detail.changeX
      const reqY = this.props.character.position.y + e.detail.changeY
      this.props.onUpdatePosition(this.props.character.id, reqX, reqY)
    }, false)
  }

  componentDidUpdate() {
    if (this.props.playMode === 'CharacterCreate') {
      document.getElementById('name').focus()
    }
  }

  render () {
    const map = this.props.world.tiles.length > 0 ? <Map characterData={{coords: this.props.character.position }} tilesData={this.props.world.tiles} /> : null
    return (
      <div id="game-container" className={styles.GameContainer}>
        {map}
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
          <Button btnType="Danger" clicked={() => { this.props.onUpdateVitality(this.props.character.id, -5, this.props.character.vam) }}>-5 Vitality</Button>
          <Button clicked={() => { this.props.onUpdateVitality(this.props.character.id, 5, this.props.character.vam) }}>+5 Vitality</Button><br />
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
      id: state.character.id,
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
      },
      position: state.character.position
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
    onUpdateVitality: (charId, reqVitality, curVAM) => dispatch(actions.updateVitality(charId, reqVitality, curVAM)),
    onUpdateAction: changeAmt => dispatch(actions.updateAction(changeAmt)),
    onUpdateMind: changeAmt => dispatch(actions.updateMind(changeAmt)),
    onUpdatePosition: (charId, reqX, reqY) => dispatch(actions.updatePosition(charId, reqX, reqY)),
    onLoadWorld: () => dispatch(actions.getWorld()),
    onInitChatMessages: () => dispatch(actions.initMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
