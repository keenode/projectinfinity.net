import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Aux from 'react-aux'

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home'
import Play from './containers/Play/Play'
import Login from './containers/Auth/Login/Login'
import Register from './containers/Auth/Register/Register'
import Logout from './containers/Auth/Logout/Logout'

import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount() {
    // Check if auth token was passed via query string
    const search = this.props.location.search
    const params = new URLSearchParams(search)
    const token = params.get('token')
    
    if (token) {
      console.log('token found, setting token!')
      localStorage.setItem('token', token)
      // TODO Pass expires in and figure this out!
      // const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
      const expDate = new Date(new Date().getTime() + 1209600 * 1000) // 14 days?
      localStorage.setItem('expDate', expDate)
      const cleanUri = window.location.protocol + '//' + window.location.host + window.location.pathname
      window.history.replaceState({}, document.title, cleanUri)
    }
    this.props.onLoginAttempt()
  }

  render() {
    const protectedRoutes = (
      <Aux>
        <Route path="/play" component={Play} />
        <Route path="/auth/logout" component={Logout} />
      </Aux>
    )

    const routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
        {this.props.isLoggedIn ? protectedRoutes : null}
      </Switch>      
    )

    return (
      <Layout>
        {routes}
      </Layout>
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
    onLoginAttempt: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
