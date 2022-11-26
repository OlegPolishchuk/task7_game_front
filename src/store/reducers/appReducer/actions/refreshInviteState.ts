import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  setChosenUser,
  setError,
  setInvitedUser,
  setIsLoading
} from "store/reducers/appReducer/appSlice";

export const refreshInviteState = createAsyncThunk(
  'app/refreshInviteState',
  (_, {dispatch}) => {


    dispatch(setChosenUser({username: '', userId: '', isInGame: false}));
    dispatch(setError(''));
    dispatch(setIsLoading(false));
    dispatch(setInvitedUser({username: '', userId: '', isInGame: false}))
  }
)