import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expiresTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expiresTime * 1000)
  }
}

export const auth = (email, password, isRegister = false) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password
    }
    const url = isRegister ? '/auth/register' : '/auth/login'
    axios.post(url, authData)
      .then(res => {
        console.log(res)
        dispatch(authSuccess(res.data))
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err))
      })
  }
}
