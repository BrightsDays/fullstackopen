import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(setUser(user))

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(credentials))
    } catch (exception) {
      dispatch(showNotification('Wrong username or password', 'error'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedUser')
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer