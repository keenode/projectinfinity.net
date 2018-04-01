import * as actionTypes from './actionTypes'
import axios from 'axios'

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
    axios.get('http://localhost:9001/api')
      .then(res => {
        dispatch(getMessages(res.data.message))
      })
      .catch(err => {
        dispatch(fetchMessagesFailed())
      })
  }
}
