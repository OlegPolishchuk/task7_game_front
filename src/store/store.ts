import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appReducer} from "store/reducers/appSlice";


const rootReducer = combineReducers({
  appReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;