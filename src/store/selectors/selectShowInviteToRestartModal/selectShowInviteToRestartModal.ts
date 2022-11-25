import {RootState} from "store/store";

export const selectShowInviteToRestartModal = (state: RootState) => {
  return state.gameReducer.showInviteToRestartModal
}