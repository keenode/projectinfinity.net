import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

/*
 * GET_WORLD
 */
export const getWorld = worldId => {
  // TEMP: force world id
  worldId = 1
  return dispatch => {
    dispatch(getWorldStart())
    axios.get('/api/worlds/' + worldId)
      .then(res => {
        dispatch(getWorldSuccess(res.data.world.tiles))
      })
      .catch(err => {
        dispatch(getWorldError())
      })
  }
}

export const getWorldStart = () => {
  return {
    type: actionTypes.GET_WORLD_START
  }
}

export const getWorldSuccess = tiles => {
  return {
    type: actionTypes.GET_WORLD_SUCCESS,
    tiles
  }
}

export const getWorldError = () => {
  return {
    type: actionTypes.GET_WORLD_ERROR
  }
}

/*
 * GET_WORLD_CHARACTERS
 */
export const getWorldCharacters = charId => {
  return dispatch => {
    dispatch(getWorldCharactersStart())
    axios.get('/api/characters?excludeCharId=' + charId)
      .then(res => {
        dispatch(getWorldCharactersSuccess(res.data.characters))
      })
      .catch(err => {
        dispatch(getWorldCharactersError())
      })
  }
}

export const getWorldCharactersStart = () => {
  return {
    type: actionTypes.GET_WORLD_CHARACTERS_START
  }
}

export const getWorldCharactersSuccess = characters => {
  return {
    type: actionTypes.GET_WORLD_CHARACTERS_SUCCESS,
    characters
  }
}

export const getWorldCharactersError = () => {
  return {
    type: actionTypes.GET_WORLD_CHARACTERS_ERROR
  }
}

