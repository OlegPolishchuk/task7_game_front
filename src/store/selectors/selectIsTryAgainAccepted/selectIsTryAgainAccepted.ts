import {RootState} from "store/store";

export const selectIsTryAgainAccepted = (state: RootState) => state.gameReducer.isTryAgainAccepted;
