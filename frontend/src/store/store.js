import { configureStore } from '@reduxjs/toolkit'
import user from './signupSlice'
import authUser from './loginSlice'
import URL from './urlSlice'

export default configureStore({
  reducer: {
    user: user.reducer,
    authUser: authUser.reducer,
    URL: URL.reducer,
   }
}) 