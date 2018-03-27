import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

import Home from './containers/Home/Home'
import Play from './containers/Play/Play'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <nav>
            <Link to="/">Home</Link><br />
            <Link to="/play">Play</Link>

            <Route exact path="/" component={Home} />
            <Route path="/play" component={Play} />
          </nav>
        </Router>
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
