import {RootState} from "store/store";

export const selectMessages = (state: RootState) => state.appReducer.messages;