import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload
    }
  }
})

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUserList(users))
  }
}

export const { setUserList } = userSlice.actions
export default userSlice.reducer