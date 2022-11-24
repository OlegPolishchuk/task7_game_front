import {API} from "api";
import {createAppAsyncThunk} from "hooks";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  setAvailableUsers, setError, setInvitedUser,
  setIsActive, setIsInvited,
  setUser,
  updateUsersAdd, updateUsersRemove
} from "store/reducers/appSlice";
import {User} from "store/reducers/types/types";

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

      API.userInvitedSubscribe((user: User) => {
        console.log('userInvitedSubscribe by', user)
        dispatch(setInvitedUser(user));
        dispatch(setIsInvited(true));
      })

    } catch (e) {
      return rejectWithValue(e as string)
    }

})