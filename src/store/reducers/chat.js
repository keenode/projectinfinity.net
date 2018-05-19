import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  messages: [],
  loadingMessages: false
}

/*
 * Get Chat Messages
 */
const geChatMessagesStart = (state, action) => {
  return updateObject(state, { loadingMessages: true })
}

const geChatMessagesSuccess = (state, action) => {
  return updateObject(state, {
    messages: action.messages,
    loadingMessages: false
  })
}

const geChatMessagesError = (state, action) => {
  return updateObject(state, { loadingMessages: false })
}

/*
 * Reducer Switch
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHAT_MESSAGES_START: return geChatMessagesStart(state, action)
    case actionTypes.GET_CHAT_MESSAGES_SUCCESS: return geChatMessagesSuccess(state, action)
    case actionTypes.GET_CHAT_MESSAGES_ERROR: return geChatMessagesError(state, action)
    default:
      return state
  }
}

export default reducer
