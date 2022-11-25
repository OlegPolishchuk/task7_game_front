import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "store/reducers/appReducer/types/types";
import {setBoardState, setIsMuTurn} from "store/reducers/gameReducer/gameSlice";
import {API} from "api";

export const makeMove = createAsyncThunk(
  'game/makeMove',
  (
    {user, index, boardState, mySymbol}: {user: User, index: number, boardState: string[], mySymbol: string},
    {dispatch}) => {
    const newBoardState = boardState.map((item, i) => {
      return i === index ? mySymbol : item
    })
    dispatch(setBoardState(newBoardState));
    dispatch(setIsMuTurn(false));

    API.makeMove(newBoardState);

  }
)