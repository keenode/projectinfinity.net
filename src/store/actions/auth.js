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
    token: token
    // userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expDate')
  // localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expiresTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expiresTime * 1000)
  }
}

export const auth = (email, password, isRegister = false) => {
  console.log('inside auth')
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password
    }
    const url = isRegister ? '/api/auth/register' : '/api/auth/login'
    axios.post(url, authData)
      .then(res => {
        console.log(res)
        // TODO: Get expires time from server
        // const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
        const expDate = new Date(new Date().getTime() + 1209600 * 1000) // 14 days?
        localStorage.setItem('token', res.data.tokenId)
        localStorage.setItem('expDate', expDate)
        // localStorage.setItem('userId', res.data.userId)
        dispatch(authSuccess(res.data))
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err))
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expDate = new Date(localStorage.getItem('expDate'))
      // TEMP: force to false until I figure out expires
      if (expDate <= new Date()) {
      // if (false) {
        dispatch(logout())
      } else {
        // const userId = localStorage.getItem('userId')
        axios.defaults.headers['Authorization'] = 'Bearer ' + token
        dispatch(authSuccess(token))
        // dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
