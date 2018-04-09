import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import List from '../../../components/UI/List/List'
import ListItem from '../../../components/UI/List/ListItem/ListItem'

import styles from './CharacterCreate.css'

class CharacterCreate extends Component {
  render() {
    return (
      <div className={styles.CharacterCreate}>
        <h3>Character Create</h3>
        <hr />
        stuff
        <hr />
        <Button clicked={this.createCharacterHandler}>Create Character</Button>
      </div>
    )
  }
}

export default CharacterCreate
