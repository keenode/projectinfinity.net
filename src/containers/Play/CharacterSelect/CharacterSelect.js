import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'

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
        <ul className={styles.List}>
          <li className={styles.ListItem}>
              <div className={styles.Avatar}></div>
              <div className={styles.Info}>
                <span className={styles.Label}>keenode</span>
                <div className={styles.Stats}>
                  <span>Lvl: 1</span>
                  <span>Location: Corelisto</span>
                </div>
              </div>
          </li>
        </ul>
        <Button>Create New Character</Button>
      </div>
    )
  }
}

export default CharacterSelect
