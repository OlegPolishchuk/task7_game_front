import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "store/reducers/types/types";
import {API} from "api";
import {setInviteAccepted, setIsLoading, setRoomId} from "store/reducers/appSlice";

export const inviteUser = createAsyncThunk(
  'app/inviteUser',
  ({user, currentUser}: {user: User, currentUser: User}, {rejectWithValue, dispatch}) => {

    try {
      dispatch(setIsLoading(true));

      API.inviteUser(user);
      API.userResponseSubscribe(
        () => {
          dispatch(setInviteAccepted(true))
          dispatch(setIsLoading(false));

          API.joinRoom(currentUser.userId);
          dispatch(setRoomId(currentUser.userId))
        }
      );

    } catch (e) {
      return rejectWithValue(e)
    }

  }
)