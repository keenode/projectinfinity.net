import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import List from '../../../components/UI/List/List'
import ListItem from '../../../components/UI/List/ListItem/ListItem'
import ModalHeader from '../../../components/UI/Modal/ModalHeader/ModalHeader'
import ModalFooter from '../../../components/UI/Modal/ModalFooter/ModalFooter'

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
        <ModalHeader title="Character Select" />
        <div className={styles.CharactersScrollRegion}>
          <List>
            {this.props.characters.map(character => (
              <ListItem key={character._id}>
                <div className={styles.Avatar}></div>
                <div className={styles.Info}>
                  <div className={styles.Stats}>
                    <span className={styles.Label}>{character.name}</span>
                    <div className={styles.Details}>
                      <span>Level {character.level}</span><br />
                      <span>{character.race}, {character.gender}</span>
                    </div>
                  </div>
                  <div className={styles.Actions}>
                    <Button btnType="Subtle" clicked={() => { this.deleteCharacterHandler(character._id) }} style={{ marginRight: '20px' }}>Delete</Button>
                    <Button clicked={() => { this.selectCharacterHandler(character._id) }}>Play</Button>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        </div>
        <ModalFooter>
          <span className={styles.InfoText}>Slots Available: {this.props.slots} / {this.props.slotsMax}</span>          
          <Button clicked={this.gotoCreateCharacterHandler}>Create Character</Button>
        </ModalFooter>
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
