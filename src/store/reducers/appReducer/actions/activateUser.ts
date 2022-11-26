import {API} from "api";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  setAvailableUsers,
  setError,
  setInvitedUser,
  setIsActive,
  setIsInvited,
  setMessages,
  setUser, updateAvailableUsers,
  updateUsersAdd,
  updateUsersRemove
} from "store/reducers/appReducer/appSlice";
import {User} from "store/reducers/appReducer/types/types";

export const createConnection = createAsyncThunk(
  'app/activateUser',
  (username: string, {rejectWithValue, dispatch}) => {

    try {
      API.createConnection(username, (error) => {
        dispatch(setError(error.message))
      });

      API.getUser(user => {
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
        },

        ({message, user}) => {
          dispatch(setMessages({message, user}))
        },

        (user) => {
          const updatedUser = {...user, isInGame: true}
          dispatch(updateAvailableUsers(updatedUser));
        },

        (user) => {
          const updatedUser = {...user, isInGame: false}
          dispatch(updateAvailableUsers(updatedUser));
        }
      )

      API.userInvitedSubscribe((user: User) => {
        dispatch(setInvitedUser(user));
        dispatch(setIsInvited(true));
      })

      API.handlePickedUpInvite((user) => {
        dispatch(setInvitedUser({username: '', userId: '', isInGame: false}));
        dispatch(setIsInvited(false))
        // dispatch(refreshInviteState(user));
      })

    } catch (e) {
      return rejectWithValue(e as string)
    }

})