import { configureStore } from '@reduxjs/toolkit'
import user from './signupSlice'
import authUser from './loginSlice'

export default configureStore({
  reducer: {
    user: user.reducer,
    authUser: authUser.reducer,
   }
}) 