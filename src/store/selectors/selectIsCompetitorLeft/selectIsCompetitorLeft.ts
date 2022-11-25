import {RootState} from "store/store";

export const selectIsCompetitorLeft = (state: RootState) => {
  return state.gameReducer.isCompetitorLeft;
}