import * as actionTypes from '../actions/actionTypes'

const initialState = {
  messages: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      }
    case actionTypes.FETCH_MESSAGES_ERROR:
      return {
        ...state,
        messages: action.messages
      }
    default:
      return state
    }
}

export default reducer
