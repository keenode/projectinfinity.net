import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

export const getCharacterSelectionData = data => {
  return {
    type: actionTypes.GET_CHARACTER_SELECTION_DATA,
    characters: data.characters,
    slots: data.slots,
    slotsMax: data.slotsMax
  }
}

export const fetchCharacterSelectionDataError = () => {
  return {
    type: actionTypes.FETCH_CHARACTER_SELECTION_DATA_ERROR
  }
}

export const fetchCharacterSelectionData = () => {
  return dispatch => {
    axios.get('/api/character-selection')
      .then(res => {
        dispatch(getCharacterSelectionData(res.data))
      })
      .catch(err => {
        dispatch(fetchCharacterSelectionDataError())
      })
  }
}
