import * as actionTypes from './actions'

const initialState = {
  vitality: 100
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_VITALITY:
      return {
        ...state,
        vitality: state.vitality + action.value
      }
    case actionTypes.SUB_VITALITY:
      return {
        ...state,
        vitality: state.vitality - action.value
      }
    default:
      return state
    }
}

export default reducer
