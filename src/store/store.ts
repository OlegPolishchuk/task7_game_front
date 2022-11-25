import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appReducer} from "store/reducers/appReducer/appSlice";
import {gameReducer} from "store/reducers/gameReducer/gameSlice";


const rootReducer = combineReducers({
  appReducer,
  gameReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;