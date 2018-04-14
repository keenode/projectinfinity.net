import React, { Component } from 'react'
import { connect } from 'react-redux'

import InputField from '../../../components/UI/Controls/InputField/InputField'
import Button from '../../../components/UI/Button/Button'

import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

import styles from './Login.css'

class Login extends Component {
  state = {
    form: {
      isValid: false,
      controls: {
        email: {
          label: 'Email',
          elementType: 'input',
          elementConfig: {
            type: 'email',
            name: 'email'
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
          label: 'Password',
          elementType: 'input',
          elementConfig: {
            type: 'password',
            name: 'password'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        }
        // rememberMe: {
        //   label: 'Remember Me',
        //   elementType: 'input',
        //   elementConfig: {
        //     type: 'checkbox',
        //     checked: false
        //   },
        //   value: false,
        //   valid: true
        // }
      }
    }
  }

  componentDidMount() {
    document.getElementById('email').focus()
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/')
    }
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

  loginHandler = event => {
    event.preventDefault()
    const formData = {}
    for (let formControl in this.state.form.controls) {
      formData[formControl] = this.state.form.controls[formControl].value
    }
    console.log('[loginHandler] formData: ', formData)
    this.props.onLogin(formData.email, formData.password)
  }

  oauthLogin = service => {
    if (service === 'google') {
      window.location = 'http://localhost:9001/api/auth/google'
    }
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
      <section className={styles.Login}>
        <div className="grid-container">
          <h1>Login to Your Account</h1>
          <div className={styles.SocialLogin}>
            <Button>Login w/ Facebook</Button>
            <Button clicked={() => { this.oauthLogin('google') }}>Login w/ Google</Button>
          </div>
          <form className={styles.LoginForm} onSubmit={this.loginHandler}>
            {form}
            <footer>
              <Button type="submit" disabled={!this.state.form.isValid}>Login</Button>
            </footer>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
