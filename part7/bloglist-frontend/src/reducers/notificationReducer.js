import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: '',
  type: 'info',
}
let notificationTimer = 0

const notificationSlise = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.content = action.payload.content
      state.type = action.payload.type
    },
  },
})

export const showNotification = (content, type) => {
  return async (dispatch) => {
    dispatch(setNotification({ content, type }))

    if (notificationTimer) clearTimeout(notificationTimer)

    setTimeout(() => {
      dispatch(
        setNotification({
          content: '',
          type: 'info',
        })
      )
    }, 5000)
  }
}

export const { setNotification } = notificationSlise.actions
export default notificationSlise.reducer
