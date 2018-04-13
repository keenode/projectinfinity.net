import * as actionTypes from '../actions/actionTypes'

const initialState = {
  mode: 'CharacterSelect'
  // mode: 'Playing'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY_MODE_CHANGED:
      return {
        mode: action.mode
      }
    default:
      return state
  }
}

export default reducer
