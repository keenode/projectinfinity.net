import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  tiles: [],
  loading: false
}

const getWorldStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const getWorldSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    tiles: action.tiles
  })
}

const getWorldError = (state, action) => {
  return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WORLD_START: return getWorldStart(state, action)
    case actionTypes.GET_WORLD_SUCCESS: return getWorldSuccess(state, action)
    case actionTypes.GET_WORLD_ERROR: return getWorldError(state, action)
    default:
      return state
  }
}

export default reducer
