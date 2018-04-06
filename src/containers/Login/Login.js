import React, { Component } from 'react'

import Input from '../../components/UI/Controls/Input/Input'
import Button from '../../components/UI/Button/Button'

import styles from './Login.css'

class Login extends Component {
  state = {
    loginForm: {
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
          required: true,
          isEmail: true
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
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      rememberMe: {
        elementType: 'input',
        label: 'Remember Me',
        elementConfig: {
          type: 'checkbox',
          checked: false
        },
        value: false,
        valid: true
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
    const updatedLoginForm = {
      ...this.state.loginForm
    }
    const updatedFormElement = {
      ...updatedLoginForm[inputId]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedLoginForm[inputId] = updatedFormElement

    let formIsValid = true
    for (let inputId in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputId].valid && formIsValid
    }

    this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid })
  }

  loginHandler = (event) => {
    event.preventDefault()
    const formData = {}
    for (let formElementId in this.state.loginForm) {
      formData[formElementId] = this.state.loginForm[formElementId].value
    }
    console.log('[loginHandler] formData: ', formData)
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key]
      })
    }
    return (
      <section className={styles.Login}>
        <h1>Login</h1>
        <hr />
        <Button>Login w/ Facebook</Button>
        <Button>Login w/ Google</Button>
        <hr />
        <form onSubmit={this.loginHandler}>
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
          <Button type="submit" disabled={!this.state.formIsValid}>Login</Button>
        </form>
      </section>
    )
  }
}

export default Login
