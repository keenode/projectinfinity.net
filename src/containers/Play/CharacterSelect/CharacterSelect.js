import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import List from '../../../components/UI/List/List'
import ListItem from '../../../components/UI/List/ListItem/ListItem'

import * as actions from '../../../store/actions'

import styles from './CharacterSelect.css'

class CharacterSelect extends Component {
  componentDidMount() {
    this.props.onGetAvailableCharacters()
  }

  selectCharacterHandler = (charId) => {
    console.log('[selectCharacterHandler]: ' + charId)
  }

  gotoCreateCharacterHandler = () => {
    this.props.onPlayModeChanged('CharacterCreate')
  }

  deleteCharacterHandler = (charId) => {
    console.log('[deleteCharacterHandler]: ' + charId)
  }

  render() {
    return (
      <div className={styles.CharacterSelect}>
        <h3>Character Select</h3>
        Slots Available: {this.props.slots} / {this.props.slotsMax}
        <hr />
        <List>
          {this.props.characters.map(character => (
            <ListItem key={character.id}>
              <div className={styles.Avatar}></div>
              <div className={styles.Info}>
                <span className={styles.Label}>{character.name}</span>
                <div className={styles.Stats}>
                  <span>Lvl: {character.level}</span>
                  <span>Race: {character.race}</span>
                  <span>Gender: {character.gender}</span>
                  <span>Location: Corelisto</span>
                </div>
                <Button clicked={() => { this.selectCharacterHandler(character.id) }}>Play</Button>
                <Button clicked={() => { this.deleteCharacterHandler(character.id) }}>Delete</Button>
              </div>
            </ListItem>
          ))}
        </List>
        <hr />
        <Button clicked={this.gotoCreateCharacterHandler}>Create Character</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.character.characters,
    slots: state.character.slots,
    slotsMax: state.character.slotsMax
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetAvailableCharacters: () => dispatch(actions.getAvailableCharacters()),
    onPlayModeChanged: mode => dispatch(actions.changePlayMode(mode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect)
