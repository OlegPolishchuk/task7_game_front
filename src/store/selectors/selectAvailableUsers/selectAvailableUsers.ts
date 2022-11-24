import {RootState} from "store/store";

export const selectAvailableUsers = (state: RootState) => state.appReducer.availableUsers;