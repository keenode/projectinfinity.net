import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import InputField from '../../../components/UI/Controls/InputField/InputField'
import ModalHeader from '../../../components/UI/Modal/ModalHeader/ModalHeader'
import ModalFooter from '../../../components/UI/Modal/ModalFooter/ModalFooter'

import * as actions from '../../../store/actions'
import { updateObject, checkValidity } from '../../../shared/utility'

import styles from './CharacterCreate.css'

class CharacterCreate extends Component {
  state = {
    form: {
      isValid: false,
      controls: {
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
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]
          },
          validation: {
            required: true
          },
          value: '',
          valid: false,
          touched: false
        },
        race: {
          label: 'Race',
          elementType: 'select',
          elementConfig: {
            name: 'race',
            options: [
              { value: 'human', label: 'Human' }
            ]
          },
          validation: {
            required: true
          },
          value: '',
          valid: false,
          touched: false
        }
      }
    }
  }

  inputChangedHandler = (event, controlName) => {
    console.log(controlName)
    const value = event.hasOwnProperty('target') ? event.target.value : event.value
    const updatedControls = updateObject(this.state.form.controls, {
      [controlName]: updateObject(this.state.form.controls[controlName], {
        value,
        valid: checkValidity(value, this.state.form.controls[controlName].validation),
        touched: true
      })
    })
    let formIsValid = true
    for (let controlName in updatedControls) {
      formIsValid = updatedControls[controlName].valid && formIsValid
    }
    this.setState({form: { controls: updatedControls, isValid: formIsValid }})
  }

  backHandler = e => {
    e.preventDefault()
    this.props.onPlayModeChanged('CharacterSelect')
  }

  createCharacterHandler = event => {
    event.preventDefault()
    const formData = {}
    for (let formElementId in this.state.form.controls) {
      formData[formElementId] = this.state.form.controls[formElementId].value
    }
    console.log('[createCharacterHandler] formData: ', formData)
    this.props.onCreateCharacter(formData)
    // TODO: Handle loading state before changing mode
    this.props.onPlayModeChanged('Playing')
  }

  render() {
    const formControls = []
    for (let key in this.state.form.controls) {
      formControls.push({
        id: key,
        config: this.state.form.controls[key]
      })
    }

    const form = formControls.map(formElement => (
      <InputField 
        key={formElement.id}
        id={formElement.id}
        elementType={formElement.config.elementType}
        label={formElement.config.label}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => { this.inputChangedHandler(event, formElement.id) }} />
    ))

    return (
      <div className={styles.CharacterCreate}>
        <ModalHeader title="Character Create" />
        <form onSubmit={this.createCharacterHandler}>
          <div className={styles.FormControls}>
            {form}
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
