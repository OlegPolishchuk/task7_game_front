import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "api";
import {
  cleanWinner,
  setBoardState,
  setCompetitor,
  setCurrentUser,
  setIsInvitedTryAgain,
  setIsMuTurn,
  setIsTryAgainAccepted,
  setRedirectTo,
  setShowInviteToRestartModal,
  setSymbol
} from "store/reducers/gameReducer/gameSlice";
import {User} from "store/reducers/appReducer/types/types";
import {leaveRoom} from "store/reducers/gameReducer/actions/leaveRoom";
import {setIsLoading} from "store/reducers/appReducer/appSlice";
import {restartGame} from "store/reducers/gameReducer/actions/restartGame";

export const joinGame = createAsyncThunk(
  'game/answerSubscribe', ({user, roomId}: {user: User, roomId: string}, {dispatch}) => {

    dispatch(setCurrentUser(user));

    API.joinToGame(
      {user, roomId},
      () => {
        dispatch(setShowInviteToRestartModal(true))
        dispatch(setIsInvitedTryAgain(true))
      },
      () => {
        dispatch(setIsTryAgainAccepted(true))
        dispatch(restartGame())
      }
    );

    API.waitMyTurn((newBoardState) => {
      dispatch(setBoardState(newBoardState));
      dispatch(setIsMuTurn(true))
    })
  }
)