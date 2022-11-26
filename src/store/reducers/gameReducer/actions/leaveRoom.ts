import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  cleanWinner,
  setBoardState,
  setCompetitor,
  setCurrentUser, setIsCompetitorLeft, setIsGameLoading,
  setIsMuTurn, setRedirectTo, setShowInviteToRestartModal,
  setSymbol
} from "store/reducers/gameReducer/gameSlice";
import {API} from "api";
import {User} from "store/reducers/appReducer/types/types";
import {refreshAppState} from "store/reducers/appReducer/actions/refreshAppState";

export const leaveRoom = createAsyncThunk(
  'game/leaveRoom', (user: User, {dispatch}) => {
    API.leaveGame(user)

    dispatch(refreshAppState());

    dispatch(setCurrentUser({username: '', userId: '', isInGame: false}));
    dispatch(setCompetitor({username: '', userId: '', isInGame: false}));
    dispatch(setIsMuTurn(false));
    dispatch(setBoardState(Array(9).fill('')));
    dispatch(cleanWinner({username: '', userId: '', isInGame: false}));
    dispatch(setSymbol(''));
    dispatch(setIsCompetitorLeft(false));
    dispatch(setShowInviteToRestartModal(false));
    dispatch(setIsGameLoading(false));
  }
)