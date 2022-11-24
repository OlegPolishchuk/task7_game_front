import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "store/reducers/types/types";
import {API} from "api";
import {setRoomId} from "store/reducers/appSlice";

export const acceptInvite = createAsyncThunk(
  'app/acceptInvite',
  (invitedUser: User, {dispatch,rejectWithValue}) => {
    try {
      console.log('invitedUser', invitedUser)
      console.log('AcceptInvited', invitedUser)
      API.acceptInvite(
        invitedUser,
        (roomId) => {
          dispatch(setRoomId(roomId))
        }
      );

    } catch (e) {
      return rejectWithValue(e)
    }

  }
)