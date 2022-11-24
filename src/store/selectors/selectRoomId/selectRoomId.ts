import {RootState} from "store/store";

export const selectRoomId = (state: RootState) => state.appReducer.roomId;