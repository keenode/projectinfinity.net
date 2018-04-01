import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home'
import Play from './containers/Play/Play'

class App extends Component {
  state = {
    message: ''
  }

  componentDidMount () {
    axios.get('http://localhost:9001/api')
      .then(res => {
        console.log(res)
        this.setState({ message: res.data.message })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <Layout>
        {/* <p>Message from API: {this.state.message}</p> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/play" component={Play} />
        </Switch>
      </Layout>
    )
  }
}

export default App
