import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  InitialState,
  SetStartGameDataArgs,
  SetWinner
} from "store/reducers/gameReducer/types";
import {User} from "store/reducers/appReducer/types/types";
import {setStartGameData} from "store/reducers/gameReducer/actions/setStartGameData";
import {leaveRoom} from "store/reducers/gameReducer/actions/leaveRoom";

const initialState: InitialState = {
  competitor: {username: '', userId: '', isInGame: false},
  currentUser: {username: '', userId: '', isInGame: false},
  isGameLoading: false,
  symbol: '',
  isMyTurn: false,
  boardState: Array(9).fill(''),
  winner: {username: '', userId: '', isInGame: false},
  winnerIndexes: [],
  redirectTo: null,
  isTryAgainAccepted: false,
  isInvitedTryAgain: false,
  showInviteToRestartModal: false,
  isCompetitorLeft: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setIsGameLoading: (state, action: PayloadAction<boolean>) => {
      state.isGameLoading = action.payload;
    },
    setCompetitor: (state, action: PayloadAction<User>) => {
      state.competitor = action.payload;
    },
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
    setIsMuTurn: (state, action: PayloadAction<boolean>) => {
      state.isMyTurn = action.payload;
    },
    setBoardState: (state, action: PayloadAction<string[]>) => {
      state.boardState = action.payload;
    },
    setWinner: (state, action: PayloadAction<SetWinner>) => {
      const wonSymbol = action.payload.winnerSymbol;
      console.log('winnerSrmbol in setWinner => ', action.payload)
      console.log('state.symbol === wonSymbol', state.symbol === wonSymbol)
      state.winner = state.symbol === wonSymbol
        ? {...state.currentUser}
        : {...state.competitor}

      state.winnerIndexes = action.payload.winnerIndexes;
    },
    cleanWinner: (state, action: PayloadAction<User>) => {
      state.winner = action.payload;
      state.winnerIndexes = [];
    },
    setRedirectTo: (state, action: PayloadAction<string>) => {
      state.redirectTo = action.payload;
    },
    setIsTryAgainAccepted: (state, action: PayloadAction<boolean>) => {
      state.isTryAgainAccepted = action.payload;
    },
    setIsInvitedTryAgain: (state, action: PayloadAction<boolean>) => {
      state.isInvitedTryAgain = action.payload;
    },
    setShowInviteToRestartModal: (state, action: PayloadAction<boolean>) => {
      state.showInviteToRestartModal = action.payload;
    },
    setIsCompetitorLeft: (state, action: PayloadAction<boolean>) => {
      state.isCompetitorLeft = action.payload;
    }
  },

  extraReducers: builder => {
    builder.addCase(setStartGameData.fulfilled, (state, action: PayloadAction<SetStartGameDataArgs>) => {
      state.competitor = action.payload.competitor;
      state.isMyTurn = action.payload.isMyTurn;
      state.symbol = action.payload.symbol;
    })

  }
})

export const gameReducer = gameSlice.reducer;
export const {
  setCurrentUser,
  setCompetitor,
  setIsGameLoading,
  setIsMuTurn,
  setBoardState,
  setWinner,
  cleanWinner,
  setSymbol,
  setRedirectTo,
  setIsTryAgainAccepted,
  setIsInvitedTryAgain,
  setShowInviteToRestartModal,
  setIsCompetitorLeft,
} = gameSlice.actions;