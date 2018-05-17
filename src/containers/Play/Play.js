import React, { Component } from 'react'
import { connect } from 'react-redux'

import Map from '../../components/World/Map/Map'
import Button from '../../components/UI/Button/Button'
import CharacterStatus from '../../components/UI/CharacterStatus/CharacterStatus'
import HotToolbar from '../../components/UI/HotToolbar/HotToolbar'
import Sidebar from '../../components/UI/Sidebar/Sidebar'
import ExamineOptions from '../../components/UI/Sidebar/ExamineOptions/ExamineOptions'
import TileInspector from '../../components/UI/Sidebar/ExamineOptions/TileInspector/TileInspector'
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
  previousMode = null

  state = {
    queriedTile: null
  }

  componentDidMount () {
    document.addEventListener('CHARACTER_MOVED', e => {
      console.log('[Play] CHARACTER_MOVED: ', e.detail)
      const reqX = this.props.character.position.x + e.detail.changeX
      const reqY = this.props.character.position.y + e.detail.changeY
      this.props.onUpdatePosition(this.props.character.id, reqX, reqY)
    }, false)

    document.addEventListener('TILE_QUERIED', e => {
      console.log('[Play] TILE_QUERIED: ', e.detail)
      this.setState({
        ...this.state,
        queriedTile: e.detail
      })
    }, false)

    document.addEventListener('TILE_UNQUERIED', e => {
      console.log('[Play] TILE_UNQUERIED: ', e.detail)
      this.setState({
        ...this.state,
        queriedTile: null
      })
    }, false)

    document.addEventListener('CHARACTER_CLICKED', e => {
      console.log('[Play] CHARACTER_CLICKED: ', e.detail)
      this.setState({
        ...this.state,
        queriedTile: null
      })
    }, false)
  }

  componentDidUpdate() {
    if (this.previousMode !== this.props.playMode) {
      if (this.props.playMode === 'Playing' && this.props.character.id) {
        this.props.onLoadWorld()
        // TODO: Use websockets instead of polling
        setInterval(() => {
          console.log('-- characters update poll')
          this.props.onLoadWorldCharacters(this.props.character.id)
        }, 1000)
        this.props.onInitChatMessages()
        this.previousMode = this.props.playMode
      }
    } else if (this.props.playMode === 'CharacterCreate') {
      document.getElementById('name').focus()
    }
  }

  render () {
    let map = null
    let characterStatus = null
    let hotToolbar = null
    let sidebar = null
    let chat = null
    let menuBox = null
    // TODO: Refactor
    if (this.props.playMode === 'Playing' && this.props.character.id && this.props.world.map.tiles.length > 0 && this.props.world.otherCharacters.length > 0) {
      map = (
        <Map
          mode={this.props.playMode}
          playerCharacter={this.props.character}
          characters={this.props.world.otherCharacters}
          tilesData={this.props.world.map.tiles} />
      )
      characterStatus = <CharacterStatus character={this.props.character} />
      hotToolbar = <HotToolbar />
      const playerTile = this.props.world.map.tiles[this.props.character.position.y][this.props.character.position.x]
      const currentTileCharacters = this.props.world.otherCharacters.filter(character => character.position.x === this.props.character.position.x && character.position.y === this.props.character.position.y)
      sidebar = (
        <Sidebar>
          <WorldInfo />
          <ExamineOptions>
            <TileInspector playerTile={playerTile} queriedTile={this.state.queriedTile} />
            <InteractionPane currentTileCharacters={currentTileCharacters} />
          </ExamineOptions>
        </Sidebar>
      )
      chat = <Chat messages={this.props.chat.messages} />
      menuBox = <MenuBox />
    }

    return (
      <div id="game-container" className={styles.GameContainer}>
        {map}
        {characterStatus}
        {hotToolbar}
        {sidebar}
        {chat}
        {menuBox}
        <div className={styles.TestActions} style={{ display: this.props.playMode === 'Playing' ? 'block' : 'none' }}>
          <Button btnType="Danger" clicked={() => { this.props.onUpdateVitality(this.props.character.id, -5, this.props.character.vam) }}>-5 Vitality</Button>
          <Button clicked={() => { this.props.onUpdateVitality(this.props.character.id, 5, this.props.character.vam) }}>+5 Vitality</Button><br />
          <Button btnType="Danger" clicked={() => { this.props.onUpdateAction(this.props.character.id, -5, this.props.character.vam) }}>-5 Action</Button>
          <Button clicked={() => { this.props.onUpdateAction(this.props.character.id, 5, this.props.character.vam) }}>+5 Action</Button><br />
          <Button btnType="Danger" clicked={() => { this.props.onUpdateMind(this.props.character.id, -5, this.props.character.vam) }}>-5 Mind</Button>
          <Button clicked={() => { this.props.onUpdateMind(this.props.character.id, 5, this.props.character.vam) }}>+5 Mind</Button>
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
      name: state.world.name,
      map: {
        size: state.world.map.size,
        tiles: state.world.map.tiles
      },
      otherCharacters: state.world.otherCharacters
    },
    chat: {
      messages: state.chat.messages
    },
    playMode: state.play.mode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateVitality: (charId, changeAmt, curVAM) => dispatch(actions.updateVitality(charId, changeAmt, curVAM)),
    onUpdateAction: (charId, changeAmt, curVAM) => dispatch(actions.updateAction(charId, changeAmt, curVAM)),
    onUpdateMind: (charId, changeAmt, curVAM) => dispatch(actions.updateMind(charId, changeAmt, curVAM)),
    onUpdatePosition: (charId, reqX, reqY) => dispatch(actions.updatePosition(charId, reqX, reqY)),
    onLoadWorld: () => dispatch(actions.getWorld()),
    onLoadWorldCharacters: charId => dispatch(actions.getWorldCharacters(charId)),
    onInitChatMessages: () => dispatch(actions.initMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
