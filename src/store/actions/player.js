import * as actionTypes from './actionTypes'

export const updateVitality = (changeAmt) => {
  return {
    type: actionTypes.UPDATE_VITALITY,
    changeAmt: changeAmt
  }
}

export const updateAction = (changeAmt) => {
  return {
    type: actionTypes.UPDATE_ACTION,
    changeAmt: changeAmt
  }
}

export const updateMind = (changeAmt) => {
  return {
    type: actionTypes.UPDATE_MIND,
    changeAmt: changeAmt
  }
}
