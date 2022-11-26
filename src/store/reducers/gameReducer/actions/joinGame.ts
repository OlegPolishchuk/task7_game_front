import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "api";
import {
  setBoardState,
  setCurrentUser, setIsCompetitorLeft,
  setIsInvitedTryAgain,
  setIsMuTurn,
  setIsTryAgainAccepted,
  setShowInviteToRestartModal
} from "store/reducers/gameReducer/gameSlice";
import {User} from "store/reducers/appReducer/types/types";
import {restartGame} from "store/reducers/gameReducer/actions/restartGame";
import {setIsUserInGame, updateAvailableUsers} from "store/reducers/appReducer/appSlice";
import {RootState} from "store/store";

export const joinGame = createAsyncThunk<void, {user: User, roomId: string}, {state: RootState} >(
  'game/answerSubscribe',
  ({user, roomId}: {user: User, roomId: string}, {dispatch, getState}) => {

    dispatch(setCurrentUser(user));
    dispatch(setIsUserInGame(true))

    API.joinToGame(
      {user, roomId},
      () => {
        dispatch(setShowInviteToRestartModal(true))
        dispatch(setIsInvitedTryAgain(true))
      },
      () => {
        dispatch(setIsTryAgainAccepted(true))
        dispatch(restartGame())
      },
      () => {
        dispatch(setIsCompetitorLeft(true))
      },

      (user) => {
        const competitor = getState().gameReducer.competitor;
        if (user.userId === competitor.userId) {
          dispatch(setIsCompetitorLeft(true))
        }
      }
    );

    API.waitMyTurn((newBoardState) => {
      dispatch(setBoardState(newBoardState));
      dispatch(setIsMuTurn(true))
    })
  }
)