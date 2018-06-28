/**
 * Start Mongo:
 * "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
 * TODO:
 * -- 3. Chat
 * - Port over websocket functionality for character movement
 * - Port over websocket functionality for world datetime
 * 
 * -- 4. Character Select refactor
 * - Only show characters that belong to the account, consider /user/:id/characters route... 
 * - Add loader while fetching available characters
 * - Handle slots properly
 * - TLC the styles a bit and dim the delete button
 * - Add "Are You Sure" alert component prior to deleting character, ask user to type 'delete CHARACTER_NAME'
 * 
 * -- 5. Character Create refactor
 * - TLC the styles
 * - Focus the character name input
 * - Add proper error validation for character creation process (client & server side)
 * 
 * -- 6. Play Mode UI touchups
 * - Chat - add alerts for incomplete functionality, comment out 'Region' tab
 * - Chat format date time nicer
 * - MenuBox - add alerts for incomplete functionality
 * - Interaction Pane - style up current players, and make area scrollable
 * - Interaction Pane = add alerts for incomplete functionality
 * - ESC key should unquery selected tile
 * - ESC key should unselect player characteqr move choice UI
 * - Clicking away from chat message UI should hide it
 * - Tile Inspector - No tile queried should increase with of current player tile to 100%
 * - Add region name and randomize weather conditions to database schema for tiles on map, and update WorldInfo component
 * - Hot Toolbar = add alerts for incomplete functionality
 * - Add functionality to click on player to query them in the tile inspector
 * - Handle loading / adding event listeners properly when switching between Home / Play
 * - Add an option to the Menu Box to return the user back to the Character Selelction screen... handle this state transition properly
 * - Add an alert before the user logs out of their account
 * 
 * -- 7. Login
 * - TLC the styles
 * - Fix default field focus refs
 * - Add proper error validation (client & server side)
 * 
 * -- 8. Register
 * - TLC the styles
 * - Fix default field focus refs
 * - Add proper error validation (client & server side)
 * 
 * -- 9. Auth - General
 * - Update user schema to be more flexible with oAuth ids and logging in to a local account
 * - Add facebook oauth
 * - Clean up and test client side cookie logic and auto-logoff
 * - Look deeper in json web tokens and invalidate them?
 * 
 * -- 10. Homepage
 * - Style up the homepage and come up with some marketing mumbo-jumbo
 * 
 * -- 11. Final Touches for MVP
 * - Add live total players online count near the top right of the black Title Bar
 * - Prepare configs for production, test test test
 * - Deploy to new AWS box for production
 * - Update readme and supporting docs to make it look pro
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import chatReducer from './store/reducers/chat'
import authReducer from './store/reducers/auth'
import playReducer from './store/reducers/play'
import characterReducer from './store/reducers/character'
import worldReducer from './store/reducers/world'

import './index.css'

const socket = io('http://localhost:9002')
const socketIoMiddleware = createSocketIoMiddleware(socket, 'ws/')

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
    applyMiddleware(thunk, socketIoMiddleware)
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
