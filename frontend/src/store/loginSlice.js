import { createSlice } from '@reduxjs/toolkit'

const authUser = createSlice({
  name: 'authUser',
  initialState: {
    accessToken: '',
    authUserEmail: '',
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setAuthUserEmail(state, action) {
      state.authUserEmail = action.payload;
    }
  }
})

export const { setAccessToken, setAuthUserEmail } = authUser.actions

export default authUser