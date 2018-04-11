import * as actionTypes from '../actions/actionTypes'
import { updateObject, checkBounds } from '../../shared/utility'

const initialState = {
  availableCharacters: [],
  name: null,
  gender: null,
  race: null,
  vam: {
    vitality: 0,
    maxVitality: 0,
    action: 0,
    maxAction: 0,
    mind: 0,
    maxMind: 0
  },
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
      availableCharacters: action.availableCharacters,
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
  return updateObject(state, {
      loading: false,
      vam: action.character.vam,
      name: action.character.name,
      gender: action.character.gender,
      race: action.character.race
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
    case actionTypes.UPDATE_VITALITY:
      const newVitality = checkBounds(state.vam.vitality, state.vam.maxVitality, action.changeAmt)
      return updateObject(state, {
        vam: {
          ...state.vam,
          vitality: newVitality 
        }
      })
    case actionTypes.UPDATE_ACTION:
      const newAction = checkBounds(state.vam.action, state.vam.maxAction, action.changeAmt)
      return updateObject(state, {
        vam: {
          ...state.vam,
          action: newAction 
        }
      })
      case actionTypes.UPDATE_MIND:
        const newMind = checkBounds(state.vam.mind, state.vam.maxMind, action.changeAmt)
        return updateObject(state, {
          vam: {
            ...state.vam,
            mind: newMind 
          }
        })
    default:
      return state
  }
}

export default reducer