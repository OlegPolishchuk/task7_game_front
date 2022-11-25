import {User} from "store/reducers/appReducer/types/types";

export type InitialState = {
  currentUser: User;
  competitor: User;
  isGameLoading: boolean;
  symbol: string;
  isMyTurn: boolean;
  boardState: string[];
  winner: User;
  winnerIndexes: number[];
  redirectTo: string | null;
  isTryAgainAccepted: boolean;
  isInvitedTryAgain: boolean;
  showInviteToRestartModal: boolean;
}

export type SetStartGameDataArgs = {
  competitor: User,
  symbol: string;
  isMyTurn: boolean;
}

export type SetWinner =  {
  winnerSymbol: string;
  winnerIndexes: number[];
}