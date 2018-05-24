import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  messages: [],
  loadingMessages: false
}

/*
 * Get Chat Messages
 */
const getChatMessagesStart = (state, action) => {
  return updateObject(state, { loadingMessages: true })
}

const getChatMessagesSuccess = (state, action) => {
  return updateObject(state, {
    messages: action.messages,
    loadingMessages: false
  })
}

const getChatMessagesError = (state, action) => {
  return updateObject(state, { loadingMessages: false })
}

/*
 * Chat Message Added
 */
const chatMessageAdded = (state, action) => {
  const messages = [...state.messages, action.message]
  return updateObject(state, {
    messages
  })
}

/*
 * Reducer Switch
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ws/chat-message-added': return chatMessageAdded(state, action)
    case actionTypes.GET_CHAT_MESSAGES_START: return getChatMessagesStart(state, action)
    case actionTypes.GET_CHAT_MESSAGES_SUCCESS: return getChatMessagesSuccess(state, action)
    case actionTypes.GET_CHAT_MESSAGES_ERROR: return getChatMessagesError(state, action)
    default:
      return state
  }
}

export default reducer
