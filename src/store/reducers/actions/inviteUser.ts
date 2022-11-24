import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "store/reducers/types/types";
import {API} from "api";
import {
  setError,
  setInviteAccepted,
  setIsLoading,
  setRoomId
} from "store/reducers/appSlice";

export const inviteUser = createAsyncThunk(
  'app/inviteUser',
  ({user, currentUser}: {user: User, currentUser: User}, {rejectWithValue, dispatch}) => {

    try {
      dispatch(setIsLoading(true));
      dispatch(setError(''))

      API.inviteUser(user);
      API.userResponseSubscribe(
        () => {
          dispatch(setInviteAccepted(true))
          dispatch(setIsLoading(false));

          API.joinRoom(currentUser.userId);
          dispatch(setRoomId(currentUser.userId))
        },
        () => {
          console.log('invite canceled')
          dispatch(setInviteAccepted(false))
          dispatch(setIsLoading(false));
          dispatch(setError('Your party has been rejected'))
        }
      );

    } catch (e) {
      return rejectWithValue(e)
    }

  }
)