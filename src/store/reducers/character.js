import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  characters: [],
  slots: 0,
  slotsMax: 0,
  loading: false
}

const getAvailableCharactersStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getAvailableCharactersSuccess = (state, action) => {
  return updateObject(state, {
      loading: false,
      characters: action.characters,
      slots: action.slots,
      slotsMax: action.slotsMax
  })
}

const getAvailableCharactersError = (state, action) => {
  return updateObject(state, { loading: false })
}

const createCharacterStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const createCharacterSuccess = (state, action) => {
  return updateObject( state, {
      loading: false
  })
}

const createCharacterError = (state, action) => {
  return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_AVAILABLE_CHARACTERS_START: return getAvailableCharactersStart(state, action)
    case actionTypes.GET_AVAILABLE_CHARACTERS_SUCCESS: return getAvailableCharactersSuccess(state, action)
    case actionTypes.GET_AVAILABLE_CHARACTERS_ERROR: return getAvailableCharactersError(state, action)
    case actionTypes.CREATE_CHARACTER_START: return createCharacterStart(state, action)
    case actionTypes.CREATE_CHARACTER_SUCCESS: return createCharacterSuccess(state, action)
    case actionTypes.CREATE_CHARACTER_ERROR: return createCharacterError(state, action)
    default:
      return state
  }
}

export default reducer
