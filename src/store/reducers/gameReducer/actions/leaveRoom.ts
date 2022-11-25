import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  cleanWinner,
  setBoardState,
  setCompetitor,
  setCurrentUser,
  setIsMuTurn, setRedirectTo,
  setSymbol
} from "store/reducers/gameReducer/gameSlice";
import {API} from "api";
import {User} from "store/reducers/appReducer/types/types";
import {refreshAppState} from "store/reducers/appReducer/actions/refreshAppState";

export const leaveRoom = createAsyncThunk(
  'game/leaveRoom', (user: User, {dispatch}) => {
    API.leaveGame(user)

    dispatch(refreshAppState());

    dispatch(setCurrentUser({username: '', userId: ''}));
    dispatch(setCompetitor({username: '', userId: ''}));
    dispatch(setIsMuTurn(false));
    dispatch(setBoardState(Array(9).fill('')));
    dispatch(cleanWinner({username: '', userId: ''}));
    dispatch(setSymbol(''));
  }
)