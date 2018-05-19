import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  name: null,
  datetime: {
    day: 1,
    month: 1,
    year: 0,
    hour: 0,
    minute: 0
  },
  map: {
    size: null,
    tiles: []
  },
  otherCharacters: [],
  loading: false,
  loadingDatetime: false,
  loadingCharacters: false
}

/*
 * Get World
 */
const getWorldStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getWorldSuccess = (state, action) => {
  return updateObject(state, {
    name: action.name,
    datetime: action.datetime,
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
 * Get World Datetime
 */
const getWorldDatetimeStart = (state, action) => {
  return updateObject(state, { loadingDatetime: true })
}

const getWorldDatetimeSuccess = (state, action) => {
  return updateObject(state, {
    datetime: action.datetime
  })
}

const getWorldDatetimeError = (state, action) => {
  return updateObject(state, { loadingDatetime: false })
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
    case actionTypes.GET_WORLD_DATETIME_START: return getWorldDatetimeStart(state, action)
    case actionTypes.GET_WORLD_DATETIME_SUCCESS: return getWorldDatetimeSuccess(state, action)
    case actionTypes.GET_WORLD_DATETIME_ERROR: return getWorldDatetimeError(state, action)
    case actionTypes.GET_WORLD_CHARACTERS_START: return getWorldCharactersStart(state, action)
    case actionTypes.GET_WORLD_CHARACTERS_SUCCESS: return getWorldCharactersSuccess(state, action)
    case actionTypes.GET_WORLD_CHARACTERS_ERROR: return getWorldCharactersError(state, action)
    default:
      return state
  }
}

export default reducer
