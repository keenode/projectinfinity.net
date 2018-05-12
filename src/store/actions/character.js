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

export const selectCharacterSuccess = selectedCharacter => {
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

export const selectCharacterStart = () => {
  return {
    type: actionTypes.SELECT_CHARACTER_START
  }
}

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

export const deleteCharacterStart = () => {
  return {
    type: actionTypes.DELETE_CHARACTER_START
  }
}

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

export const updateVitality = changeAmt => {
  return {
    type: actionTypes.UPDATE_VITALITY,
    changeAmt
  }
}

export const updateAction = changeAmt => {
  return {
    type: actionTypes.UPDATE_ACTION,
    changeAmt
  }
}

export const updateMind = changeAmt => {
  return {
    type: actionTypes.UPDATE_MIND,
    changeAmt
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

export const updatePositionStart = () => {
  return {
    type: actionTypes.UPDATE_POSITION_START
  }
}

export const updatePosition = reqPosition => {
  //TODO: charId will be current character
  // const charId = null
  return dispatch => {
    dispatch(updatePositionStart())
    dispatch(updatePositionSuccess({ x: 1, y: 1 }))
    // axios.put('/api/characters/' + charId, reqPosition)
    //   .then(res => {
    //     dispatch(updatePositionSuccess(res.data.character.position))
    //   })
    //   .catch(err => {
    //     dispatch(updatePositionError(err))
    //   })
  }
}
