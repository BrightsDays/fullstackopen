import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  byContent: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, actions) {
      state.byContent = actions.payload
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer