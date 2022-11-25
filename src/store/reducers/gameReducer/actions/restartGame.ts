import {createAsyncThunk} from "@reduxjs/toolkit";
import {cleanWinner, setBoardState} from "store/reducers/gameReducer/gameSlice";
import {API} from "api";
import {User} from "store/reducers/appReducer/types/types";

export const restartGame = createAsyncThunk(
  'game/restartGame', async (_, {dispatch}) => {
    dispatch(setBoardState(Array(9).fill('')));
    dispatch(cleanWinner({username: '', userId: ''}));
  }
)