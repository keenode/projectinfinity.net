import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import List from '../../../components/UI/List/List'
import ListItem from '../../../components/UI/List/ListItem/ListItem'

import * as actions from '../../../store/actions'

import styles from './CharacterSelect.css'

class CharacterSelect extends Component {
  state = {
    characters: [
      {
        id: 1,
        name: 'keenode',
        level: 1,
        race: 'Human',
        gender: 'M'
      },
      {
        id: 2,
        name: 'keenie',
        level: 4,
        race: 'Human',
        gender: 'M'
      }
    ],
    slotsAvailable: 1,
    slotsMax: 2
  }

  selectCharacterHandler = (charId) => {
    console.log('charId: ' + charId)
  }

  gotoCreateCharacterHandler = () => {
    this.props.onPlayModeChanged('CharacterCreate')
  }

  render() {
    return (
      <div className={styles.CharacterSelect}>
        <h3>Character Select</h3>
        Slots Available: {this.state.slotsAvailable} / {this.state.slotsMax}
        <hr />
        <List>
          {this.state.characters.map(character => (
            <ListItem key={character.id} clicked={() => { this.selectCharacterHandler(character.id) }}>
              <div className={styles.Avatar}></div>
              <div className={styles.Info}>
                <span className={styles.Label}>{character.name}</span>
                <div className={styles.Stats}>
                  <span>Lvl: {character.level}</span>
                  <span>Race: {character.race}</span>
                  <span>Gender: {character.gender}</span>
                  <span>Location: Corelisto</span>
                </div>
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

// TODO: Map to characters listing
const mapStateToProps = state => {
  return {
    playMode: state.play.mode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlayModeChanged: mode => dispatch(actions.changePlayMode(mode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect)
