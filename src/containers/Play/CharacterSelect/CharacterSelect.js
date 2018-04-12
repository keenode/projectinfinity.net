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
    this.props.onSelectCharacter(charId)
    this.props.onPlayModeChanged('Playing')
  }

  gotoCreateCharacterHandler = () => {
    this.props.onPlayModeChanged('CharacterCreate')
  }

  deleteCharacterHandler = (charId) => {
    console.log('[deleteCharacterHandler]: ' + charId)
    this.props.onDeleteCharacter(charId)
  }

  render() {
    return (
      <div className={styles.CharacterSelect}>
        <h3>Character Select</h3>
        Slots Available: {this.props.slots} / {this.props.slotsMax}
        <List>
          {this.props.characters.map(character => (
            <ListItem key={character._id}>
              <div className={styles.Avatar}></div>
              <div className={styles.Info}>
                <span className={styles.Label}>{character.name}</span>
                <div className={styles.Stats}>
                  <span>Lvl: {character.level}</span>
                  <span>Race: {character.race}</span>
                  <span>Gender: {character.gender}</span>
                </div>
                <Button clicked={() => { this.selectCharacterHandler(character._id) }}>Play</Button>
                <Button btnType="Danger" clicked={() => { this.deleteCharacterHandler(character._id) }}>Delete</Button>
              </div>
            </ListItem>
          ))}
        </List>
        <Button clicked={this.gotoCreateCharacterHandler}>Create Character</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.character.availableCharacters,
    slots: state.character.slots,
    slotsMax: state.character.slotsMax
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetAvailableCharacters: () => dispatch(actions.getAvailableCharacters()),
    onSelectCharacter: charId => dispatch(actions.selectCharacter(charId)),
    onDeleteCharacter: charId => dispatch(actions.deleteCharacter(charId)),
    onPlayModeChanged: mode => dispatch(actions.changePlayMode(mode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect)
