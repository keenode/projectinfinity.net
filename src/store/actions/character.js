import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

export const getAvailableCharactersSuccess = data => {
  return {
    type: actionTypes.GET_AVAILABLE_CHARACTERS_SUCCESS,
    availableCharacters: data.characters,
    slots: data.slots,
    slotsMax: data.slotsMax
  }
}

export const getAvailableCharactersError = () => {
  return {
    type: actionTypes.GET_AVAILABLE_CHARACTERS_ERROR
  }
}

export const getAvailableCharactersStart = () => {
  return {
      type: actionTypes.GET_AVAILABLE_CHARACTERS_START
  }
}

export const getAvailableCharacters = () => {
  return dispatch => {
    dispatch(getAvailableCharactersStart())
    axios.get('/api/characters')
      .then(res => {
        dispatch(getAvailableCharactersSuccess(res.data))
      })
      .catch(err => {
        dispatch(getAvailableCharactersError())
      })
  }
}

export const createCharacterSuccess = character => {
  return {
    type: actionTypes.CREATE_CHARACTER_SUCCESS,
    character
  }
}

export const createCharacterError = error => {
  return {
    type: actionTypes.CREATE_CHARACTER_ERROR,
    error
  }
}

export const createCharacterStart = () => {
  return {
      type: actionTypes.CREATE_CHARACTER_START
  }
}

export const createCharacter = characterData => {
  return dispatch => {
    dispatch(createCharacterStart())
    axios.post('/api/characters', characterData)
      .then(res => {
        dispatch(createCharacterSuccess(res.data.character))
      })
      .catch(err => {
        dispatch(createCharacterError(err))
      })
  }
}
