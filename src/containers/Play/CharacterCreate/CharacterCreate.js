import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Controls/Input/Input'

import * as actions from '../../../store/actions'

import styles from './CharacterCreate.css'

class CharacterCreate extends Component {
  state = {
    createCharacterForm: {
      name: {
        elementType: 'input',
        label: 'Character Name',
        elementConfig: {
          type: 'text',
          name: 'name',
          placeholder: 'Character Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      gender: {
        elementType: 'select',
        label: 'Gender',
        elementConfig: {
          name: 'gender',
          options: [
            { value: 'male', displayValue: 'Male' },
            { value: 'female', displayValue: 'Female' }
          ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: true,
        touched: false
      },
      race: {
        elementType: 'select',
        label: 'Race',
        elementConfig: {
          name: 'race',
          options: [
            { value: 'human', displayValue: 'Human' }
          ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: true,
        touched: false
      },
    },
    formIsValid: false
  }

  checkValidation(value, rules) {
    let isValid = true

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    return isValid
  }

  inputChangedHandler = (event, inputId) => {
    const updatedForm = {
      ...this.state.createCharacterForm
    }
    const updatedFormElement = {
      ...updatedForm[inputId]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedForm[inputId] = updatedFormElement

    let formIsValid = true
    for (let inputId in updatedForm) {
      formIsValid = updatedForm[inputId].valid && formIsValid
    }

    this.setState({ createCharacterForm: updatedForm, formIsValid: formIsValid })
  }

  backHandler = () => {
    this.props.onPlayModeChanged('CharacterSelect')
  }

  createCharacterHandler = (event) => {
    event.preventDefault()
    const formData = {}
    for (let formElementId in this.state.createCharacterForm) {
      formData[formElementId] = this.state.createCharacterForm[formElementId].value
    }
    console.log('[createCharacterHandler] formData: ', formData)
    this.props.onCreateCharacter(formData.name, formData.gender, formData.race)
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.createCharacterForm) {
      formElementsArray.push({
        id: key,
        config: this.state.createCharacterForm[key]
      })
    }
    return (
      <div className={styles.CharacterCreate}>
        <h3>Character Create</h3>
        <Button clicked={this.backHandler}>Back</Button>
        <hr />
        <form onSubmit={this.createCharacterHandler}>
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              id={'input-' + formElement.id}
              elementType={formElement.config.elementType}
              label={formElement.config.label}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => { this.inputChangedHandler(event, formElement.id) }} />
          ))}
          <hr />
          <Button type="submit" disabled={!this.state.formIsValid}>Start</Button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlayModeChanged: mode => dispatch(actions.changePlayMode(mode)),
    onCreateCharacter: characterData => dispatch(actions.createCharacter(characterData))
  }
}

export default connect(null, mapDispatchToProps)(CharacterCreate)
