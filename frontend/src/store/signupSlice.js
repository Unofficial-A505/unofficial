import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    local: '',
    gisu: '', 
    email: '', 
    password: ''
  },
  reducers: {
    setLocal(state, action){
      state.local = action.payload
    },
    setGisu(state, action){
      state.gisu = action.payload
    },
    setEmail(state, action){
      state.email= action.payload
    },
    setPassword(state, action){
      state.password = action.payload
    },
  }
})

export const { setLocal, setGisu, setEmail, setPassword } = user.actions

export default user