/**
 * Start Mongo:
 * "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
 * TODO:
 * - Add player name text on character display tile
 * - Render all other players on the map
 * - Style up info contents of right-hand panel a bit better
 * - Update right-hand panel with current tile info
 * - Update right-hand panel with character listing
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import chatReducer from './store/reducers/chat'
import authReducer from './store/reducers/auth'
import playReducer from './store/reducers/play'
import characterReducer from './store/reducers/character'
import worldReducer from './store/reducers/world'

import './index.css'

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  play: playReducer,
  character: characterReducer,
  world: worldReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
