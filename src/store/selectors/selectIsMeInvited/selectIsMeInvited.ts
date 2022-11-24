import {RootState} from "store/store";

export const selectIsMeInvited = (state: RootState) => {
  return state.appReducer.isInvited;
}