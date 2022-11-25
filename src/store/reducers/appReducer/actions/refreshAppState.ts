import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  setAvailableUsers,
  setChosenUser,
  setError,
  setInviteAccepted, setInvitedUser, setIsInvited, setRoomId
} from "store/reducers/appReducer/appSlice";

export const refreshAppState = createAsyncThunk(
  'app/refreshState', (_, {dispatch}) => {
    dispatch(setChosenUser({ username: '',userId: '' }));
    dispatch(setError(''));
    dispatch(setInviteAccepted(false));
    dispatch(setIsInvited(false));
    dispatch(setInvitedUser({ username: '',userId: '' }));
    dispatch(setRoomId(''));
  }
)