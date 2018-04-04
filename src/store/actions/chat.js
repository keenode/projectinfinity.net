import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

export const getMessages = (messages) => {
  return {
    type: actionTypes.GET_MESSAGES,
    messages: messages
  }
}

export const fetchMessagesFailed = () => {
  return {
    type: actionTypes.FETCH_MESSAGES_ERROR
  }
}

export const initMessages = () => {
  return dispatch => {
    axios.get('/api/chat/messages')
      .then(res => {
        dispatch(getMessages(res.data.messages))
      })
      .catch(err => {
        dispatch(fetchMessagesFailed())
      })
  }
}
