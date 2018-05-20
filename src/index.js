/**
 * Start Mongo:
 * "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
 * TODO:
 * -- 3. Chat
 * - Begin first websock implementation for chat
 * - Port over websocket functionality for character movement
 * * - Port over websocket functionality for world datetime
 * -- 4. Character Select refactor
 * - Add loader while fetching available characters
 * - Only show characters that belong to the account, consider /user/:id/characters route...
 * - Handle slots properly
 * - TLC the styles a bit and dim the delete button
 * - Add "Are You Sure" alert component prior to deleting character, ask user to type 'delete CHARACTER_NAME'
 * -- 5. Character Create refactor
 * - TLC the styles
 * - Focus the character name input
 * - Add proper error validation for character creation process
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
