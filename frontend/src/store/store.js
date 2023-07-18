import { configureStore } from '@reduxjs/toolkit'
import user from './signupSlice'

export default configureStore({
  reducer: {
    user: user.reducer,
   }
}) 