import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home'
import Play from './containers/Play/Play'
import Login from './containers/Login/Login'

class App extends Component {
  render () {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/play" component={Play} />
          <Route path="/login" component={Login} />
        </Switch>
      </Layout>
    )
  }
}

export default App
