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

  componentDidMount() {
    this.originalState = { ...this.state }
    console.log('this.originalState: ', this.originalState)
  }

  inputChangedHandler = (event, controlName) => {
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

  backHandler = () => {
    this.setState(this.originalState)
    this.props.onPlayModeChanged('CharacterSelect')
  }

  createCharacterHandler = e => {
    e.preventDefault()
    const formData = {}
    for (let formControl in this.state.form.controls) {
      formData[formControl] = this.state.form.controls[formControl].value
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

    const form = formControls.map(control => (
      <InputField 
        key={control.id}
        id={control.id}
        elementType={control.config.elementType}
        label={control.config.label}
        elementConfig={control.config.elementConfig}
        value={control.config.value}
        invalid={!control.config.valid}
        shouldValidate={control.config.validation}
        touched={control.config.touched}
        changed={(event) => { this.inputChangedHandler(event, control.id) }} />
    ))

    return (
      <div className={styles.CharacterCreate}>
        <ModalHeader title="Create New Character" />
        <form onSubmit={this.createCharacterHandler}>
          <div className={styles.FormControls}>
            {form}
          </div>
          <ModalFooter>
            <Button type="button" clicked={this.backHandler}>Back</Button>            
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
