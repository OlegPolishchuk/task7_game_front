import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "store/reducers/types/types";
import {API} from "api";
import {setInviteAccepted, setIsLoading} from "store/reducers/appSlice";

export const inviteUser = createAsyncThunk(
  'app/inviteUser',
  (user: User, {rejectWithValue, dispatch}) => {

    try {
      dispatch(setIsLoading(true));

      API.inviteUser(user);
      API.userResponseSubscribe(
        () => {
          dispatch(setInviteAccepted(true))
          dispatch(setIsLoading(false));
        }
      );

    } catch (e) {
      return rejectWithValue(e)
    }

  }
)