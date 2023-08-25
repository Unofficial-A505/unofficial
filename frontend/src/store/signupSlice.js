import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    agreed: false,
    local: '',
    gen: '', 
    email: '', 
    password: '',
  },
  reducers: {
    setAgreed(state, action) {
      state.agreed = action.payload
    },
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

export const { setAgreed, setLocal, setGen, setEmail, setPassword } = user.actions

export default user