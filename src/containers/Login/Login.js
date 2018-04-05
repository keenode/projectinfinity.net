import React, { Component } from 'react'

import Input from '../../components/UI/Controls/Input/Input'
import Button from '../../components/UI/Button/Button'

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
        <form onSubmit={this.loginHandler}>
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => { this.inputChangedHandler(event, formElement.id) }} />
          ))}
          <Button type="submit">Login</Button>
        </form>
      </section>
    )
  }
}

export default Login
