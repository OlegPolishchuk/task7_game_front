import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "api";
import {
  cleanWinner,
  setBoardState, setCompetitor,
  setCurrentUser,
  setIsMuTurn, setRedirectTo, setSymbol
} from "store/reducers/gameReducer/gameSlice";
import {User} from "store/reducers/appReducer/types/types";
import {leaveRoom} from "store/reducers/gameReducer/actions/leaveRoom";

export const joinGame = createAsyncThunk(
  'game/answerSubscribe', ({user, roomId}: {user: User, roomId: string}, {dispatch}) => {

    dispatch(setCurrentUser(user));

    API.joinToGame({user, roomId});

    API.waitMyTurn((newBoardState) => {
      dispatch(setBoardState(newBoardState));
      dispatch(setIsMuTurn(true))
    })
  }
)