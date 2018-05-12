import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

/*
 * GET_AVAILABLE_CHARACTERS
 */
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

export const getAvailableCharactersStart = () => {
  return {
    type: actionTypes.GET_AVAILABLE_CHARACTERS_START
  }
}

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

/*
 * SELECT_CHARACTER
 */
export const selectCharacter = charId => {
  return dispatch => {
    dispatch(selectCharacterStart())
    axios.get('/api/characters/' + charId)
      .then(res => {
        dispatch(selectCharacterSuccess(res.data.character))
      })
      .catch(err => {
        dispatch(selectCharacterError())
      })
  }
}

export const selectCharacterStart = () => {
  return {
    type: actionTypes.SELECT_CHARACTER_START
  }
}

export const selectCharacterSuccess = selectedCharacter => {
  console.log('selectedCharacter: ', selectedCharacter)
  return {
    type: actionTypes.SELECT_CHARACTER_SUCCESS,
    character: selectedCharacter
  }
}

export const selectCharacterError = () => {
  return {
    type: actionTypes.SELECT_CHARACTER_ERROR
  }
}

/*
 * CREATE_CHARACTER
 */
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

export const createCharacterStart = () => {
  return {
    type: actionTypes.CREATE_CHARACTER_START
  }
}

export const createCharacterSuccess = createdCharacter => {
  return {
    type: actionTypes.CREATE_CHARACTER_SUCCESS,
    character: createdCharacter
  }
}

export const createCharacterError = error => {
  return {
    type: actionTypes.CREATE_CHARACTER_ERROR,
    error
  }
}

/*
 * DELETE_CHARACTER
 */
export const deleteCharacter = charId => {
  return dispatch => {
    dispatch(deleteCharacterStart())
    axios.delete('/api/characters/' + charId)
      .then(res => {
        dispatch(deleteCharacterSuccess(res.data.character))
      })
      .catch(err => {
        dispatch(deleteCharacterError(err))
      })
  }
}

export const deleteCharacterStart = () => {
  return {
    type: actionTypes.DELETE_CHARACTER_START
  }
}

export const deleteCharacterSuccess = deletedCharacter => {
  return {
    type: actionTypes.DELETE_CHARACTER_SUCCESS,
    deletedCharacter
  }
}

export const deleteCharacterError = error => {
  return {
    type: actionTypes.DELETE_CHARACTER_ERROR,
    error
  }
}

/*
 * UPDATE_VITALITY
 */
export const updateVitality = changeAmt => {
  return {
    type: actionTypes.UPDATE_VITALITY,
    changeAmt
  }
}

/*
 * UPDATE_VITALITY
 */
export const updateAction = changeAmt => {
  return {
    type: actionTypes.UPDATE_ACTION,
    changeAmt
  }
}

/*
 * UPDATE_MIND
 */
export const updateMind = changeAmt => {
  return {
    type: actionTypes.UPDATE_MIND,
    changeAmt
  }
}

/*
 * UPDATE_POSITION
 */
export const updatePosition = (charId, reqX, reqY) => {
  return dispatch => {
    dispatch(updatePositionStart())
    axios.put('/api/characters/' + charId, { position: { x: reqX, y: reqY } })
      .then(res => {
        dispatch(updatePositionSuccess(res.data.character.position))
      })
      .catch(err => {
        dispatch(updatePositionError(err))
      })
  }
}

export const updatePositionStart = () => {
  return {
    type: actionTypes.UPDATE_POSITION_START
  }
}

export const updatePositionSuccess = newPosition => {
  return {
    type: actionTypes.UPDATE_POSITION_SUCCESS,
    newPosition
  }
}

export const updatePositionError = error => {
  return {
    type: actionTypes.UPDATE_POSITION_ERROR,
    error
  }
}
