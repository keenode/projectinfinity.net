import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import List from '../../../components/UI/List/List'
import ListItem from '../../../components/UI/List/ListItem/ListItem'

import styles from './CharacterSelect.css'

class CharacterSelect extends Component {
  state = {
    characters: [
      {
        name: 'keenode',
        level: 1
      },
      {
        name: 'keenie',
        level: 4
      }
    ],
    slotsAvailable: 1,
    slotsMax: 2
  }

  render() {
    return (
      <div className={styles.CharacterSelect}>
        <h3>Character Select</h3>
        Slots Available: {this.state.slotsAvailable} / {this.state.slotsMax}
        <hr />
        <List>
          {this.state.characters.map(character => (
            <ListItem key={character.name}>
              <div className={styles.Avatar}></div>
              <div className={styles.Info}>
                <span className={styles.Label}>{character.name}</span>
                <div className={styles.Stats}>
                  <span>Lvl: {character.level}</span>
                  <span>Location: Corelisto</span>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
        <hr />
        <Button>Create New Character</Button>
      </div>
    )
  }
}

export default CharacterSelect
