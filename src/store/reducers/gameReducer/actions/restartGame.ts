import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  cleanWinner,
  setBoardState,
  setIsGameLoading,
  setIsInvitedTryAgain,
  setIsTryAgainAccepted,
  setShowInviteToRestartModal
} from "store/reducers/gameReducer/gameSlice";

export const restartGame = createAsyncThunk(
  'game/restartGame', async (_, {dispatch}) => {

    dispatch(setIsTryAgainAccepted(true))
    dispatch(setIsInvitedTryAgain(false));
    dispatch(setShowInviteToRestartModal(false))
    dispatch(setIsGameLoading(false))
    dispatch(setBoardState(Array(9).fill('')));
    dispatch(cleanWinner({username: '', userId: '', isInGame: false}));
  }
)