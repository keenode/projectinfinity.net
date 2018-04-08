import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import List from '../../../components/UI/List/List'
import ListItem from '../../../components/UI/List/ListItem/ListItem'

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

  characterSelectedHandler = (charId) => {
    console.log('charId: ' + charId)
  }

  createCharacterHandler = () => {
    console.log('create character clicked')
  }

  render() {
    return (
      <div className={styles.CharacterSelect}>
        <h3>Character Select</h3>
        Slots Available: {this.state.slotsAvailable} / {this.state.slotsMax}
        <hr />
        <List>
          {this.state.characters.map(character => (
            <ListItem key={character.id} clicked={() => { this.characterSelectedHandler(character.id) }}>
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
        <Button clicked={this.createCharacterHandler}>Create Character</Button>
      </div>
    )
  }
}

export default CharacterSelect
