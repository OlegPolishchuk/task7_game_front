import {RootState} from "store/store";

export const selectIsLoading = (state: RootState) => state.appReducer.isLoading;