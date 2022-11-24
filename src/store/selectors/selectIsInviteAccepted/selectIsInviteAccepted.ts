import {RootState} from "store/store";

export const selectIsInviteAccepted = (state: RootState) => state.appReducer.inviteAccepted;