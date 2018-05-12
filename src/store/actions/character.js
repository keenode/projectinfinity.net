import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'
import { checkBounds } from '../../shared/utility'

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
export const updateVitality = (charId, changeAmt, originalVAM) => {
  const newVitality = checkBounds(originalVAM.vitality, originalVAM.vitalityMax, changeAmt)
  return dispatch => {
    if (originalVAM.vitality === newVitality) {
      dispatch(updateVitalitySuccess(newVitality))
    } else {
      const updatedVAM = {
        ...originalVAM,
        vitality: newVitality
      }
      dispatch(updateVitalityStart())
      axios.put('/api/characters/' + charId, { vam: updatedVAM })
        .then(res => {
          dispatch(updateVitalitySuccess(res.data.character.vam.vitality))
        })
        .catch(err => {
          dispatch(updateVitalityError(err))
        })
    }
  }
}

export const updateVitalityStart = () => {
  return {
    type: actionTypes.UPDATE_VITALITY_START
  }
}

export const updateVitalitySuccess = updatedVitality => {
  return {
    type: actionTypes.UPDATE_VITALITY_SUCCESS,
    updatedVitality
  }
}

export const updateVitalityError = error => {
  return {
    type: actionTypes.UPDATE_VITALITY_ERROR,
    error
  }
}

/*
 * UPDATE_ACTION
 */
export const updateAction = (charId, changeAmt, originalVAM) => {
  const newAction = checkBounds(originalVAM.action, originalVAM.actionMax, changeAmt)
  return dispatch => {
    if (originalVAM.action === newAction) {
      dispatch(updateActionSuccess(newAction))
    } else {
      const updatedVAM = {
        ...originalVAM,
        action: newAction
      }
      dispatch(updateActionStart())
      axios.put('/api/characters/' + charId, { vam: updatedVAM })
        .then(res => {
          dispatch(updateActionSuccess(res.data.character.vam.action))
        })
        .catch(err => {
          dispatch(updateActionError(err))
        })
    }
  }
}

export const updateActionStart = () => {
  return {
    type: actionTypes.UPDATE_ACTION_START
  }
}

export const updateActionSuccess = updatedAction => {
  return {
    type: actionTypes.UPDATE_ACTION_SUCCESS,
    updatedAction
  }
}

export const updateActionError = error => {
  return {
    type: actionTypes.UPDATE_ACTION_ERROR,
    error
  }
}

/*
 * UPDATE_MIND
 */
export const updateMind = (charId, changeAmt, originalVAM) => {
  const newMind = checkBounds(originalVAM.mind, originalVAM.mindMax, changeAmt)
  return dispatch => {
    if (originalVAM.action === newMind) {
      dispatch(updateMindSuccess(newMind))
    } else {
      const updatedVAM = {
        ...originalVAM,
        mind: newMind
      }
      dispatch(updateMindStart())
      axios.put('/api/characters/' + charId, { vam: updatedVAM })
        .then(res => {
          dispatch(updateMindSuccess(res.data.character.vam.mind))
        })
        .catch(err => {
          dispatch(updateMindError(err))
        })
    }
  }
}

export const updateMindStart = () => {
  return {
    type: actionTypes.UPDATE_MIND_START
  }
}

export const updateMindSuccess = updatedMind => {
  return {
    type: actionTypes.UPDATE_MIND_SUCCESS,
    updatedMind
  }
}

export const updateMindError = error => {
  return {
    type: actionTypes.UPDATE_MIND_ERROR,
    error
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

export const updatePositionSuccess = updatedPosition => {
  return {
    type: actionTypes.UPDATE_POSITION_SUCCESS,
    updatedPosition
  }
}

export const updatePositionError = error => {
  return {
    type: actionTypes.UPDATE_POSITION_ERROR,
    error
  }
}
