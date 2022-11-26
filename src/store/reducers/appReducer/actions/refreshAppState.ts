import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  setAvailableUsers,
  setChosenUser,
  setError,
  setInviteAccepted, setInvitedUser, setIsInvited, setRoomId
} from "store/reducers/appReducer/appSlice";

export const refreshAppState = createAsyncThunk(
  'app/refreshState', (_, {dispatch}) => {
    dispatch(setChosenUser({ username: '',userId: '', isInGame: false }));
    dispatch(setError(''));
    dispatch(setInviteAccepted(false));
    dispatch(setIsInvited(false));
    dispatch(setInvitedUser({ username: '',userId: '', isInGame: false }));
    dispatch(setRoomId(''));
  }
)