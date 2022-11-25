import {RootState} from "store/store";

export const selectWinner = (state: RootState) => state.gameReducer.winner;