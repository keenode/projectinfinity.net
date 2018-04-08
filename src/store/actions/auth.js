import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
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
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expiresTime => {
  return dispatch => {
    setTimeout(() => {
      console.log('token timed out!')
      dispatch(logout())
    }, expiresTime * 1000)
  }
}

export const auth = (email, password, isRegistering = false) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password
    }
    const url = isRegistering ? '/api/auth/register' : '/api/auth/login'
    axios.post(url, authData)
      .then(res => {
        console.log(res.data)
        // TODO: Get expires time from server
        // const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
        const expDate = new Date(new Date().getTime() + 1209600 * 1000) // 14 days?
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('expDate', expDate)
        dispatch(authSuccess(res.data.token))
        // dispatch(checkAuthTimeout(res.data.expiresIn))
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
      if (expDate <= new Date()) {
        dispatch(logout())
      } else {
        axios.defaults.headers['Authorization'] = 'Bearer ' + token
        dispatch(authSuccess(token))
        dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
