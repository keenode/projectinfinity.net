import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import List from '../../../components/UI/List/List'
import ListItem from '../../../components/UI/List/ListItem/ListItem'

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
        stuff
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
