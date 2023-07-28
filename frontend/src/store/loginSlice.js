import { createSlice } from '@reduxjs/toolkit'

const authUser = createSlice({
  name: 'authUser',
  initialState: {
    accessToken : '',
  },
  reducers: {
    setAccessToken(state, action){
      state.accessToken= action.payload
    },
  }
})

export const { setAccessToken } = authUser.actions

export default authUser