import {API} from "api";
import {createAppAsyncThunk} from "hooks";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  setAvailableUsers, setError,
  setIsActive,
  setUser,
  updateUsersAdd, updateUsersRemove
} from "store/reducers/appSlice";

export const createConnection = createAsyncThunk(
  'app/activateUser',
  (username: string, {rejectWithValue, dispatch}) => {

    try {
      API.createConnection(username, (error) => {
        dispatch(setError(error.message))
      });

      API.getUser(user => {
        console.log(user)
        dispatch(setUser(user))
        dispatch(setIsActive(true))
      })

      API.usersDataSubscribe(
        (users ) => {
        dispatch(setAvailableUsers(users))
      },
        (user) => {
          dispatch(updateUsersAdd(user))
        },
        user => {
          dispatch(updateUsersRemove(user))
        }
      )

    } catch (e) {
      return rejectWithValue(e as string)
    }

})