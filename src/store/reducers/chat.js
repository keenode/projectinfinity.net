import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  messages: [],
  loadingMessages: false,
  sendingMessage: false
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
 * Send Chat Message
 */
const sendChatMessageStart = (state, action) => {
  return updateObject(state, { sendingMessage: true })
}

const sendChatMessageSuccess = (state, action) => {
  return updateObject(state, {
    messages: action.messages,
    sendingMessage: false
  })
}

const sendChatMessageError = (state, action) => {
  return updateObject(state, { sendingMessage: false })
}

/*
 * Reducer Switch
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHAT_MESSAGES_START: return getChatMessagesStart(state, action)
    case actionTypes.GET_CHAT_MESSAGES_SUCCESS: return getChatMessagesSuccess(state, action)
    case actionTypes.GET_CHAT_MESSAGES_ERROR: return getChatMessagesError(state, action)
    case actionTypes.SEND_CHAT_MESSAGE_START: return sendChatMessageStart(state, action)
    case actionTypes.SEND_CHAT_MESSAGE_SUCCESS: return sendChatMessageSuccess(state, action)
    case actionTypes.SEND_CHAT_MESSAGE_ERROR: return sendChatMessageError(state, action)
    default:
      return state
  }
}

export default reducer
