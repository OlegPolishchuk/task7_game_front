import {RootState} from "store/store";

export const selectError = (state: RootState) => state.appReducer.error;