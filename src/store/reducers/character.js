import * as actionTypes from '../actions/actionTypes'
import { updateObject, checkBounds } from '../../shared/utility'

const initialState = {
  availableCharacters: [],
  id: null,
  name: null,
  gender: null,
  race: null,
  vam: {
    vitality: 0,
    vitalityMax: 0,
    action: 0,
    actionMax: 0,
    mind: 0,
    mindMax: 0
  },
  position: {
    x: 0,
    y: 0
  },
  slots: 0,
  slotsMax: 0,
  loading: false,
  isMoving: false
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

const selectCharacterStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const selectCharacterSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    id: action.character._id,
    name: action.character.name,
    gender: action.character.gender,
    race: action.character.race,
    level: action.character.level,
    exp: action.character.exp,
    expMax: action.character.expMax,
    vam: action.character.vam,
    position: action.character.position
  })
}

const selectCharacterError = (state, action) => {
  return updateObject(state, { loading: false })
}

const createCharacterStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const createCharacterSuccess = (state, action) => {
  return updateObject(state, {
      loading: false,
      id: action.character._id,
      name: action.character.name,
      gender: action.character.gender,
      race: action.character.race,
      level: action.character.level,
      exp: action.character.exp,
      expMax: action.character.expMax,
      vam: action.character.vam,
      position: action.character.position
  })
}

const createCharacterError = (state, action) => {
  return updateObject(state, { loading: false })
}

const deleteCharacterStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const deleteCharacterSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    availableCharacters: [
      ...state.availableCharacters.filter(character => character._id !== action.deletedCharacter._id)
    ]
  })
}

const deleteCharacterError = (state, action) => {
  return updateObject(state, { isMoving: false })
}

const updatePositionStart = (state, action) => {
  return updateObject(state, { isMoving: true })
}

const updatePositionSuccess = (state, action) => {
  return updateObject(state, {
    isMoving: false,
    position: {
      x: action.newPosition.x,
      y: action.newPosition.y
    }
  })
}

const updatePositionError = (state, action) => {
  return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_AVAILABLE_CHARACTERS_START: return getAvailableCharactersStart(state, action)
    case actionTypes.GET_AVAILABLE_CHARACTERS_SUCCESS: return getAvailableCharactersSuccess(state, action)
    case actionTypes.GET_AVAILABLE_CHARACTERS_ERROR: return getAvailableCharactersError(state, action)
    case actionTypes.SELECT_CHARACTER_START: return selectCharacterStart(state, action)
    case actionTypes.SELECT_CHARACTER_SUCCESS: return selectCharacterSuccess(state, action)
    case actionTypes.SELECT_CHARACTER_ERROR: return selectCharacterError(state, action)
    case actionTypes.CREATE_CHARACTER_START: return createCharacterStart(state, action)
    case actionTypes.CREATE_CHARACTER_SUCCESS: return createCharacterSuccess(state, action)
    case actionTypes.CREATE_CHARACTER_ERROR: return createCharacterError(state, action)
    case actionTypes.DELETE_CHARACTER_START: return deleteCharacterStart(state, action)
    case actionTypes.DELETE_CHARACTER_SUCCESS: return deleteCharacterSuccess(state, action)
    case actionTypes.DELETE_CHARACTER_ERROR: return deleteCharacterError(state, action)
    case actionTypes.UPDATE_VITALITY:
      const newVitality = checkBounds(state.vam.vitality, state.vam.vitalityMax, action.changeAmt)
      return updateObject(state, {
        vam: {
          ...state.vam,
          vitality: newVitality 
        }
      })
    case actionTypes.UPDATE_ACTION:
      const newAction = checkBounds(state.vam.action, state.vam.actionMax, action.changeAmt)
      return updateObject(state, {
        vam: {
          ...state.vam,
          action: newAction 
        }
      })
      case actionTypes.UPDATE_MIND:
        const newMind = checkBounds(state.vam.mind, state.vam.mindMax, action.changeAmt)
        return updateObject(state, {
          vam: {
            ...state.vam,
            mind: newMind 
          }
        })
      case actionTypes.UPDATE_POSITION_START: return updatePositionStart(state, action)
      case actionTypes.UPDATE_POSITION_SUCCESS: return updatePositionSuccess(state, action)
      case actionTypes.UPDATE_POSITION_ERROR: return updatePositionError(state, action)
    default:
      return state
  }
}

export default reducer
