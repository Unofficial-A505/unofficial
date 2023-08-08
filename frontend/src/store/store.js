import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import user from './signupSlice'
import authUser from './loginSlice'

const reducers = combineReducers({
  user: user.reducer,
  authUser: authUser.reducer,
});

const persistConfig = {
  key: "root",
  storage,  // 로컬 스토리지
  whitelist: ["authUser"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;