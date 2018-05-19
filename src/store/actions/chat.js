import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

/*
 * GET_CHAT_MESSAGES
 */
export const getChatMessages = () => {
  return dispatch => {
    dispatch(getChatMessagesStart())
    axios.get('/api/chat/messages')
      .then(res => {
        dispatch(getChatMessagesSuccess(res.data.messages))
      })
      .catch(err => {
        dispatch(getChatMessagesError())
      })
  }
}

export const getChatMessagesStart = () => {
  return {
    type: actionTypes.GET_CHAT_MESSAGES_START
  }
}

export const getChatMessagesSuccess = messages => {
  return {
    type: actionTypes.GET_CHAT_MESSAGES_SUCCESS,
    messages
  }
}

export const getChatMessagesError = () => {
  return {
    type: actionTypes.GET_CHAT_MESSAGES_ERROR
  }
}

/*
 * SEND_CHAT_MESSAGE
 */
export const sendChatMessages = message => {
  return dispatch => {
    dispatch(sendChatMessagesStart())
    axios.post('/api/chat/messages', message)
      .then(res => {
        dispatch(sendChatMessagesSuccess(res.data.messages))
      })
      .catch(err => {
        dispatch(sendChatMessagesError())
      })
  }
}

export const sendChatMessagesStart = () => {
  return {
    type: actionTypes.SEND_CHAT_MESSAGE_START
  }
}

export const sendChatMessagesSuccess = messages => {
  return {
    type: actionTypes.SEND_CHAT_MESSAGE_SUCCESS,
    messages
  }
}

export const sendChatMessagesError = () => {
  return {
    type: actionTypes.SEND_CHAT_MESSAGE_ERROR
  }
}
