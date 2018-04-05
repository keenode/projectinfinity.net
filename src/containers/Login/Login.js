import React, { Component } from 'react'

import Input from '../../components/UI/Controls/Input/Input'

import styles from './Login.css'

class Login extends Component {
  state = {
    loginForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          nmame: 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Password'
        },
        value: ''
      },
      rememberMe: {
        elementType: 'input',
        elementConfig: {
          checked: false
        },
        value: false
      }
    }
  }

  inputChangedHandler = (event, inputId) => {
    const updatedLoginForm = {
      ...this.state.loginForm
    }
    const updatedFormElement = {
      ...updatedLoginForm[inputId]
    }
    updatedFormElement.value = event.target.value
    updatedLoginForm[inputId] = updatedFormElement
    this.setState({ loginForm: updatedLoginForm })
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
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => { this.inputChangedHandler(event, formElement.id) }} />
        ))}
      </section>
    )
  }
}

export default Login
