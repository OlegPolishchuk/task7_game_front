import {RootState} from "store/store";

export const selectBoardState = (state: RootState) => state.gameReducer.boardState;