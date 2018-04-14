import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import InputField from '../../../components/UI/Controls/InputField/InputField'
import ModalHeader from '../../../components/UI/Modal/ModalHeader/ModalHeader'
import ModalFooter from '../../../components/UI/Modal/ModalFooter/ModalFooter'

import * as actions from '../../../store/actions'

import styles from './CharacterCreate.css'

class CharacterCreate extends Component {
  state = {
    form: {
      isValid: false,
      fields: {
        name: {
          label: 'Character Name',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            name: 'name'
          },
          validation: {
            required: true
          },
          value: '',
          valid: false,
          touched: false
        },
        gender: {
          label: 'Gender',
          elementType: 'select',
          elementConfig: {
            name: 'gender',
            options: [
              { value: 0, displayValue: '- Select -' },
              { value: 'male', displayValue: 'Male' },
              { value: 'female', displayValue: 'Female' }
            ]
          },
          validation: {
            required: true
          },
          value: '',
          valid: true,
          touched: false
        },
        race: {
          label: 'Race',
          elementType: 'select',
          elementConfig: {
            name: 'race',
            options: [
              { value: 0, displayValue: '- Select -' },
              { value: 'human', displayValue: 'Human' }
            ]
          },
          validation: {
            required: true
          },
          value: '',
          valid: true,
          touched: false
        }
      }
    }
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
      ...this.state.form.fields
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

    this.setState({
      form: {
        isValid: formIsValid,
        fields: updatedForm
      }
    })
  }

  backHandler = e => {
    e.preventDefault()
    this.props.onPlayModeChanged('CharacterSelect')
  }

  createCharacterHandler = event => {
    event.preventDefault()
    const formData = {}
    for (let formElementId in this.state.form) {
      formData[formElementId] = this.state.form[formElementId].value
    }
    console.log('[createCharacterHandler] formData: ', formData)
    this.props.onCreateCharacter(formData)
    // TODO: Handle loading state before changing mode
    this.props.onPlayModeChanged('Playing')
  }

  render() {
    const formFields = []
    for (let key in this.state.form.fields) {
      formFields.push({
        id: key,
        config: this.state.form.fields[key]
      })
    }
    return (
      <div className={styles.CharacterCreate}>
        <ModalHeader title="Character Create" />
        <form onSubmit={this.createCharacterHandler}>
          <div className={styles.FormFields}>
            {formFields.map(formElement => (
              <InputField 
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
          </div>
          <ModalFooter>
            <Button clicked={this.backHandler}>Back</Button>            
            <Button type="submit" disabled={!this.state.form.isValid}>Start Adventure</Button>
          </ModalFooter>
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
