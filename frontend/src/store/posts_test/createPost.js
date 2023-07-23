import { createSlice } from '@reduxjs/toolkit'

const createPost = createSlice({
  name: 'createPost',
  initialState: {
    title: '',
    body: '',
  },
  reducers: {
    initialize(state){
      state.title = ''
      state.body=''
    },
    changeField(state, action){
      state = { ...state, [action.key]: action.value }
    }
  }
})

export const { initialize, changeField } = createPost.actions

export default createPost