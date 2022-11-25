import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "api";
import {restartGame} from "store/reducers/gameReducer/actions/restartGame";

export const acceptRestartGame = createAsyncThunk(
  'app/acceptRestartGame', (_, {dispatch}) => {
     API.acceptToRestart();

     dispatch(restartGame())
  }
)