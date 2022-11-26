import {createAsyncThunk} from "@reduxjs/toolkit";
import {SetStartGameDataArgs} from "store/reducers/gameReducer/types";

export const setStartGameData = createAsyncThunk(
  'game/setStartGameData',
  ({competitor, symbol, isMyTurn}: SetStartGameDataArgs) => {

    return {competitor, symbol, isMyTurn}
  }
)