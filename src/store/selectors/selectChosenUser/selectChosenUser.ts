import {RootState} from "store/store";

export const selectChosenUser = (state: RootState) => state.appReducer.chosenUser;