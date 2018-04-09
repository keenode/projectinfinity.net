import * as actionTypes from './actionTypes'

export const changePlayMode = mode => {
  return {
    type: actionTypes.PLAY_MODE_CHANGED,
    mode
  }
}
