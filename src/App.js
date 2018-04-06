import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home'
import Play from './containers/Play/Play'
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import Logout from './containers/Logout/Logout'

import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount() {
    // TEMP commented out
    // this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Switch>      
        <Route path="/" exact component={Home} />      
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>      
    )

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />        
          <Route path="/play" component={Play} />
          <Route path="/logout" component={Logout} />
        </Switch>         
      )
    }

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
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
