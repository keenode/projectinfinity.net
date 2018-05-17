import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  name: null,
  map: {
    size: null,
    tiles: []
  },
  otherCharacters: [],
  loading: false,
  loadingCharacters: false
}

/*
 * Get World
 */
const getWorldStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getWorldSuccess = (state, action) => {
  console.log('action: ', action)
  return updateObject(state, {
    name: action.name,
    map: {
      size: action.map.size,
      tiles: action.map.tiles
    },
    loading: false
  })
}

const getWorldError = (state, action) => {
  return updateObject(state, { loading: false })
}

/*
 * Get World Characters
 */
const getWorldCharactersStart = (state, action) => {
  return updateObject(state, { loadingCharacters: true })
}

const getWorldCharactersSuccess = (state, action) => {
  return updateObject(state, {
    loadingCharacters: false,
    otherCharacters: action.otherCharacters
  })
}

const getWorldCharactersError = (state, action) => {
  return updateObject(state, { loadingCharacters: false })
}

/*
 * Reducer Switch
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WORLD_START: return getWorldStart(state, action)
    case actionTypes.GET_WORLD_SUCCESS: return getWorldSuccess(state, action)
    case actionTypes.GET_WORLD_ERROR: return getWorldError(state, action)
    case actionTypes.GET_WORLD_CHARACTERS_START: return getWorldCharactersStart(state, action)
    case actionTypes.GET_WORLD_CHARACTERS_SUCCESS: return getWorldCharactersSuccess(state, action)
    case actionTypes.GET_WORLD_CHARACTERS_ERROR: return getWorldCharactersError(state, action)
    default:
      return state
  }
}

export default reducer
