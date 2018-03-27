import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home'
import Play from './containers/Play/Play'

class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/play">Play</Link></li>
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/play" component={Play} />
          </nav>
        </Router>
      </Layout>
    )
  }
}

export default App
