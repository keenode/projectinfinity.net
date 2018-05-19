import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

/*
 * GET_WORLD
 */
export const getWorld = worldId => {
  // TEMP: force world id
  worldId = '5aff9d96cb7f3b7fb0be54d0'
  return dispatch => {
    dispatch(getWorldStart())
    axios.get('/api/worlds/' + worldId)
      .then(res => {
        dispatch(getWorldSuccess(res.data.world))
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

export const getWorldSuccess = world => {
  return {
    type: actionTypes.GET_WORLD_SUCCESS,
    name: world.name,
    map: world.map
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
    axios.get('/api/characters')
      .then(res => {
        const otherCharacters = res.data.characters.filter(character => character._id !== charId)
        dispatch(getWorldCharactersSuccess(otherCharacters))
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

export const getWorldCharactersSuccess = otherCharacters => {
  return {
    type: actionTypes.GET_WORLD_CHARACTERS_SUCCESS,
    otherCharacters
  }
}

export const getWorldCharactersError = () => {
  return {
    type: actionTypes.GET_WORLD_CHARACTERS_ERROR
  }
}

