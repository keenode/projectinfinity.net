import * as actionTypes from '../actions'

const initialState = {
  vam: {
    vitality: 100,
    maxVitality: 100,
    action: 100,
    maxAction: 100,
    mind: 100,
    maxMind: 100
  }
}

const checkBounds = (currValue, maxValue, changeAmount) => {
  const newValue = currValue + changeAmount
  return newValue > maxValue ? maxValue : newValue < 0 ? 0 : newValue
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_VITALITY:
      const newVitality = checkBounds(state.vam.vitality, state.vam.maxVitality, action.value)
      return {
        ...state,
        vam: {
          ...state.vam,
          vitality: newVitality
        }
      }
    case actionTypes.UPDATE_ACTION:
      const newAction = checkBounds(state.vam.action, state.vam.maxAction, action.value)
      return {
        ...state,
        vam: {
          ...state.vam,
          action: newAction
        }
      }
      case actionTypes.UPDATE_MIND:
        const newMind = checkBounds(state.vam.mind, state.vam.maxMind, action.value)
        return {
          ...state,
          vam: {
            ...state.vam,
            mind: newMind
          }
        }
    default:
      return state
    }
}

export default reducer
