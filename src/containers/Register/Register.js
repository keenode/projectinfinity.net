import React, { Component } from 'react'

import Input from '../../components/UI/Controls/Input/Input'
import Button from '../../components/UI/Button/Button'

import styles from './Register.css'

class Register extends Component {
  state = {
    registerForm: {
      email: {
        elementType: 'input',
        label: 'Email',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        label: 'Password',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      confirmPassword: {
        elementType: 'input',
        label: 'Confirm Password',
        elementConfig: {
          type: 'password',
          name: 'confirm-password',
          placeholder: 'Confirm Password'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
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
    const updatedregisterForm = {
      ...this.state.registerForm
    }
    const updatedFormElement = {
      ...updatedregisterForm[inputId]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedregisterForm[inputId] = updatedFormElement

    let formIsValid = true
    for (let inputId in updatedregisterForm) {
      formIsValid = updatedregisterForm[inputId].valid && formIsValid
    }

    this.setState({ registerForm: updatedregisterForm, formIsValid: formIsValid })
  }

  registrationHandler = (event) => {
    event.preventDefault()
    const formData = {}
    for (let formElementId in this.state.registerForm) {
      formData[formElementId] = this.state.registerForm[formElementId].value
    }
    console.log('[registerHandler] formData: ', formData)
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.registerForm) {
      formElementsArray.push({
        id: key,
        config: this.state.registerForm[key]
      })
    }
    return (
      <section className={styles.Register}>
        <h1>Register</h1>
        <hr />
        <form onSubmit={this.registrationHandler}>
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
          <Button type="submit" disabled={!this.state.formIsValid}>Register</Button>
        </form>
      </section>
    )
  }
}

export default Register
