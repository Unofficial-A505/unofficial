import { createSlice } from '@reduxjs/toolkit'

const URL = createSlice({
  name: 'URL',
  initialState: {
    API_URL: 'http://127.0.0.1:8000/',
  },
  reducers: {
    setURL(state, action){
      state.API_URL = action.payload
    },
  }
})

export const { setURL } = URL.actions

export default URL