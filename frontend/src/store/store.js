import { configureStore } from '@reduxjs/toolkit'
import user from './signupSlice'
import authUser from './loginSlice'
import createPost from './posts_test/createPost'

export default configureStore({
  reducer: {
    user: user.reducer,
    authUser: authUser.reducer,
    createPost: createPost.reducer,
   }
}) 