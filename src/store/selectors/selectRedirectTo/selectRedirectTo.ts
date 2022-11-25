import {RootState} from "store/store";

export const selectRedirectTo = (state: RootState) => state.gameReducer.redirectTo;