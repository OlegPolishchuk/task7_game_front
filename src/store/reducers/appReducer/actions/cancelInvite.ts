import {createAsyncThunk} from "@reduxjs/toolkit";
import {setChosenUser, setIsInvited} from "store/reducers/appReducer/appSlice";
import {User} from "store/reducers/appReducer/types/types";
import {API} from "api";

export const cancelInvite = createAsyncThunk(
  'app/cancelInvite', (invitedUser: User,{dispatch}) => {

    API.cancelInvite(invitedUser);
    dispatch(setIsInvited(false));
  }
)