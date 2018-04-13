import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

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

export const getWorldStart = () => {
  return {
    type: actionTypes.GET_WORLD_START
  }
}

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
