import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    local: '',
    gen: '', 
    email: '', 
    password: '',
  },
  reducers: {
    setLocal(state, action){
      state.local = action.payload
    },
    setGen(state, action){
      state.gen = action.payload
    },
    setEmail(state, action){
      state.email= action.payload
    },
    setPassword(state, action){
      state.password = action.payload
    },
  }
})

export const { setLocal, setGen, setEmail, setPassword } = user.actions

export default user