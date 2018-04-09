import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Controls/Input/Input'

import * as actions from '../../../store/actions'

import styles from './CharacterCreate.css'

class CharacterCreate extends Component {
  backHandler = () => {
    this.props.onPlayModeChanged('CharacterSelect')
  }

  startHandler = () => {
    console.log('[createCharacterHandler]')
  }

  render() {
    return (
      <div className={styles.CharacterCreate}>
        <h3>Character Create</h3>
        <Button clicked={this.backHandler}>Back</Button>
        <hr />
        <Input 
          id="input-character-name"
          elementType="input"
          label="Character Name"
          elementConfig={{}} />
        <Input 
          id="input-gender"
          elementType="select"
          label="Gender"
          elementConfig={{
            options: [
              { value: 'male', displayValue: 'Male' },
              { value: 'female', displayValue: 'Female' }
            ]
          }} />
          <Input 
            id="input-race"
            elementType="select"
            label="Race"
            elementConfig={{
              options: [
                { value: 'human', displayValue: 'Human' }
              ]
            }} />
        <hr />
        <Button clicked={this.startHandler}>Start</Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlayModeChanged: mode => dispatch(actions.changePlayMode(mode))
  }
}

export default connect(null, mapDispatchToProps)(CharacterCreate)
