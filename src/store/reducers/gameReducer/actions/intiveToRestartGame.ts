import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "api";
import {setIsGameLoading} from "store/reducers/gameReducer/gameSlice";

export const inviteToRestartGame = createAsyncThunk(
  'game/inviteToRestartGame', (_,{dispatch}) => {

    API.inviteToRestartGame()

    dispatch(setIsGameLoading(true));
  }
)