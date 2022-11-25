import {RootState} from "store/store";

export const selectIsGameLoading = (state: RootState) => state.gameReducer.isGameLoading