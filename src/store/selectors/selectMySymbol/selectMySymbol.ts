import {RootState} from "store/store";

export const selectMySymbol = (state: RootState) => state.gameReducer.symbol;