import {RootState} from "store/store";

export const selectIsMyTurn= (state: RootState) => state.gameReducer.isMyTurn