import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "store/reducers/appReducer/types/types";
import {API} from "api";
import {setRoomId} from "store/reducers/appReducer/appSlice";
import {setCompetitor} from "store/reducers/gameReducer/gameSlice";
import {setStartGameData} from "store/reducers/gameReducer/actions/setStartGameData";

export const acceptInvite = createAsyncThunk(
  'app/acceptInvite',
  (invitedUser: User, {dispatch,rejectWithValue}) => {
    try {
      API.acceptInvite(invitedUser);

      dispatch(setStartGameData({
        competitor: invitedUser,
        symbol: '0',
        isMyTurn: false
      }))
      dispatch(setRoomId(`${invitedUser.username}-${invitedUser.userId}`))

    } catch (e) {
      return rejectWithValue(e)
    }

  }
)