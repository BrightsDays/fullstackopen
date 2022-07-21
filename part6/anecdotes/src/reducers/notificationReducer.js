import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 1,
  content: null
}

const notificationSlise = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.content = action.payload
    }
  }
})

export const { setNotification } = notificationSlise.actions
export default notificationSlise.reducer