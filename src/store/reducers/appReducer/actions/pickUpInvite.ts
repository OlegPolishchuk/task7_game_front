import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "store/reducers/appReducer/types/types";
import {API} from "api";
import {refreshInviteState} from "store/reducers/appReducer/actions/refreshInviteState";

export const pickUpInvite = createAsyncThunk(
  'app/pickUpInvite',
  ({user, competitor}: {user:User, competitor: User}, {dispatch}) => {

    API.pickUpInvite({user, competitor})

    dispatch(refreshInviteState());

  }
)