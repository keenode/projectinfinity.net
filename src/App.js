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
    this.props.onTryAutoSignup()
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/play" component={Play} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
        </Switch>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
