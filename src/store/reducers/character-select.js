import * as actionTypes from '../actions/actionTypes'

const initialState = {
  characters: [],
  slots: 0,
  slotsMax: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHARACTER_SELECTION_DATA:
      return {
        characters: action.characters,
        slots: action.slots,
        slotsMax: action.slotsMax
      }
    default:
      return state
  }
}

export default reducer
